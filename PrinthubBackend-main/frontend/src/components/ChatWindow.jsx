import { MessageCircleMore, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { getDesignChatHistory, sendDesignChatMessage } from "../services/chatService";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";

function ChatWindow({ open, onClose, design, currentUser }) {
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const endRef = useRef(null);

  const designerName = design?.designer?.firstName
    ? `${design.designer.firstName} ${design.designer.lastName || ""}`.trim()
    : "Designer";
  const designerAvatar =
    design?.designer?.avatar ||
    designerName
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2);

  useEffect(() => {
    if (!open || !design || !currentUser) {
      return;
    }

    const loadHistory = async () => {
      setHistoryLoading(true);
      const result = await getDesignChatHistory({
        designId: design._id || design.id,
        userId: currentUser.id || currentUser.email || "company-user",
        designerId: design.designerId,
        designerName,
        designerAvatar
      });
      setMessages(result);
      setHistoryLoading(false);
    };

    loadHistory();
  }, [open, design, currentUser, designerName, designerAvatar]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-[rgba(56,34,24,0.24)] backdrop-blur-sm">
      <div className="absolute inset-y-0 right-0 flex w-full max-w-2xl flex-col border-l border-white/60 bg-[linear-gradient(180deg,rgba(255,250,245,0.97),rgba(249,241,234,0.95))] shadow-[0_24px_80px_rgba(73,45,33,0.18)] dark:border-stone-700 dark:bg-[linear-gradient(180deg,rgba(35,27,24,0.98),rgba(24,19,18,0.98))]">
        <div className="flex items-center justify-between border-b border-stone-200/80 px-6 py-5 dark:border-stone-800">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-[22px] bg-gradient-to-br from-[#efc7b8] to-[#f7e4d7] text-sm font-semibold text-[#7c2d12] dark:from-stone-700 dark:to-stone-800 dark:text-white">
              {designerAvatar}
            </div>
            <div>
              <p className="text-lg font-semibold text-stone-950 dark:text-white">{designerName}</p>
              <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                Discussing {design?.title}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-stone-200 bg-white/80 text-stone-500 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300"
          >
            <X size={18} />
          </button>
        </div>

        <div className="border-b border-stone-200/80 px-6 py-4 dark:border-stone-800">
          <div className="rounded-[24px] bg-white/85 px-4 py-4 text-sm leading-6 text-stone-600 shadow-[0_8px_24px_rgba(88,61,47,0.06)] dark:bg-stone-900/90 dark:text-stone-300">
            Use this thread to discuss packaging changes, dieline requirements, print finishes, or
            exclusive usage for this label design.
          </div>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.75),transparent_38%),linear-gradient(180deg,rgba(246,239,231,0.92),rgba(241,230,221,0.96))] px-6 py-6 dark:bg-[linear-gradient(180deg,rgba(27,22,20,0.96),rgba(18,14,13,0.98))]">
          {historyLoading ? (
            <div className="space-y-3">
              <div className="h-20 rounded-[24px] bg-white/80 dark:bg-stone-800" />
              <div className="ml-auto h-20 w-3/4 rounded-[24px] bg-white/80 dark:bg-stone-800" />
            </div>
          ) : messages.length ? (
            messages.map((message) => <ChatMessage key={message.id} message={message} />)
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-[#9a3412] shadow-[0_14px_40px_rgba(162,90,61,0.16)] dark:bg-stone-900 dark:text-orange-100">
                <MessageCircleMore size={28} />
              </div>
              <p className="mt-5 text-lg font-semibold text-stone-950 dark:text-white">
                Start discussing this design
              </p>
            </div>
          )}
          <div ref={endRef} />
        </div>

        <div className="border-t border-stone-200/80 px-6 py-5 dark:border-stone-800">
          <ChatInput
            value={draft}
            onChange={setDraft}
            loading={loading}
            onSubmit={async (event) => {
              event.preventDefault();

              if (!draft.trim()) {
                return;
              }

              setLoading(true);
              const optimistic = {
                id: `draft-${Date.now()}`,
                senderType: "me",
                text: draft,
                timestamp: new Date().toISOString()
              };
              setMessages((current) => [...current, optimistic]);
              const currentDraft = draft;
              setDraft("");

              try {
                const persisted = await sendDesignChatMessage({
                  senderId: currentUser?.id || currentUser?.email || "company-user",
                  receiverId: design.designerId,
                  designId: design._id || design.id,
                  userId: currentUser?.id || currentUser?.email || "company-user",
                  designerId: design.designerId,
                  senderType: "me",
                  message: currentDraft
                });

                setMessages((current) =>
                  current.map((message) => (message.id === optimistic.id ? persisted : message))
                );
              } catch (error) {
                toast.error("Unable to send message");
              } finally {
                setLoading(false);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;

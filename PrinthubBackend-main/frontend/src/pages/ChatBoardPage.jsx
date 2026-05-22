import { MessageCircleMore, Search, Send, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";
import DashboardSidebar from "../components/DashboardSidebar";
import PageTransition from "../components/PageTransition";
import { useAppState } from "../hooks/useAppState";
import { useChatBoard } from "../hooks/useChatBoard";

function formatTime(value) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date(value));
}

function ChatBoardPage() {
  const { currentUser } = useAppState();
  const role = currentUser?.role || "designer";
  const { threads, activeThread, activeThreadId, setActiveThreadId, sendMessage } = useChatBoard({
    role,
    userName: currentUser?.name || "Marketplace User"
  });
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState("");

  const filteredThreads = useMemo(() => {
    const search = query.toLowerCase();

    return threads.filter((thread) =>
      [thread.participant.name, thread.listing.title, thread.messages.at(-1)?.text || ""]
        .join(" ")
        .toLowerCase()
        .includes(search)
    );
  }, [threads, query]);

  return (
    <PageTransition>
      <section className="content-shell py-10 md:py-14">
        <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
          <DashboardSidebar role={role} />

          <div className="space-y-8">
            <div>
              <span className="tag-pill">Chat board</span>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 dark:text-white">
                Buyer and designer conversations
              </h1>
              <p className="mt-4 max-w-3xl text-base text-slate-600 dark:text-slate-300">
                Review PrintDesignHub conversations for revisions, packaging questions, and design
                purchase coordination around specific listings.
              </p>
            </div>

            <div className="grid min-h-[720px] gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
              <aside className="surface rounded-[30px] p-5">
                <div className="flex items-center gap-3 rounded-[22px] border border-slate-200 px-4 py-3 dark:border-slate-800">
                  <Search size={18} className="text-slate-400" />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search chats or listings"
                    className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400 dark:text-white"
                  />
                </div>

                <div className="mt-5 space-y-3">
                  {filteredThreads.map((thread) => {
                    const lastMessage = thread.messages.at(-1);
                    const active = thread.id === activeThreadId;

                    return (
                      <button
                        key={thread.id}
                        type="button"
                        onClick={() => setActiveThreadId(thread.id)}
                        className={`w-full rounded-[24px] border p-4 text-left transition ${
                          active
                            ? "border-brand-200 bg-brand-50 dark:border-brand-500/20 dark:bg-brand-500/10"
                            : "border-slate-200 hover:border-brand-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-sm font-semibold text-white dark:bg-white dark:text-slate-950">
                            {thread.participant.avatar}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <p className="truncate font-semibold text-slate-950 dark:text-white">
                                  {thread.participant.name}
                                </p>
                                <p className="mt-1 truncate text-xs uppercase tracking-[0.16em] text-slate-400">
                                  {thread.participant.role}
                                </p>
                              </div>
                              {lastMessage ? (
                                <span className="text-xs text-slate-400">{formatTime(lastMessage.timestamp)}</span>
                              ) : null}
                            </div>
                            <p className="mt-3 truncate text-sm text-slate-500 dark:text-slate-400">
                              {thread.listing.title}
                            </p>
                            <p className="mt-1 truncate text-sm text-slate-600 dark:text-slate-300">
                              {lastMessage?.text}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </aside>

              <div className="surface flex min-h-[720px] flex-col rounded-[30px]">
                {activeThread ? (
                  <>
                    <div className="border-b border-slate-200 px-6 py-5 dark:border-slate-800">
                      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-sm font-semibold text-white dark:bg-white dark:text-slate-950">
                            {activeThread.participant.avatar}
                          </div>
                          <div>
                            <p className="text-lg font-semibold text-slate-950 dark:text-white">
                              {activeThread.participant.name}
                            </p>
                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                              {activeThread.participant.role} · {activeThread.participant.status}
                            </p>
                          </div>
                        </div>

                        <div className="rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
                          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Discussing listing</p>
                          <p className="mt-2 text-sm font-semibold text-slate-950 dark:text-white">
                            {activeThread.listing.title}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 space-y-5 overflow-y-auto px-6 py-6">
                      {activeThread.messages.map((message) => {
                        const mine = message.senderType === "me";

                        return (
                          <div
                            key={message.id}
                            className={`flex ${mine ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-xl rounded-[24px] px-4 py-3 ${
                                mine
                                  ? "bg-brand-500 text-white"
                                  : "border border-slate-200 bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                              }`}
                            >
                              <p className="text-sm leading-6">{message.text}</p>
                              <p
                                className={`mt-2 text-xs ${
                                  mine ? "text-blue-100" : "text-slate-400"
                                }`}
                              >
                                {formatTime(message.timestamp)}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="border-t border-slate-200 px-6 py-5 dark:border-slate-800">
                      <div className="mb-4 flex items-start gap-3 rounded-[22px] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-100">
                        <ShieldCheck size={18} className="mt-0.5 shrink-0" />
                        Keep negotiation, files, and pricing inside PrintDesignHub to preserve the
                        listing context.
                      </div>

                      <form
                        onSubmit={async (event) => {
                          event.preventDefault();
                          await sendMessage(draft);
                          setDraft("");
                        }}
                        className="flex flex-col gap-4 md:flex-row"
                      >
                        <textarea
                          value={draft}
                          onChange={(event) => setDraft(event.target.value)}
                          placeholder="Type a message about revisions, price, or deliverables..."
                          className="input-base min-h-16 flex-1 resize-none"
                        />
                        <button type="submit" className="button-primary min-w-36 self-end md:self-auto">
                          <Send size={16} className="mr-2" />
                          Send
                        </button>
                      </form>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-100">
                      <MessageCircleMore size={28} />
                    </div>
                    <h2 className="mt-6 text-2xl font-semibold text-slate-950 dark:text-white">
                      No conversations yet
                    </h2>
                    <p className="mt-3 max-w-md text-sm text-slate-500 dark:text-slate-400">
                      Start from a design listing to contact a seller or buyer and continue the
                      discussion here.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

export default ChatBoardPage;

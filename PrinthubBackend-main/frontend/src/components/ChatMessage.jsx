function ChatMessage({ message }) {
  const mine = message.senderType === "me";

  return (
    <div className={`flex ${mine ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-[24px] px-4 py-3 ${
          mine
            ? "bg-brand-500 text-white"
            : "border border-slate-200 bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
        }`}
      >
        <p className="text-sm leading-6">{message.text}</p>
        <p className={`mt-2 text-xs ${mine ? "text-blue-100" : "text-slate-400"}`}>
          {new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" }).format(
            new Date(message.timestamp)
          )}
        </p>
      </div>
    </div>
  );
}

export default ChatMessage;

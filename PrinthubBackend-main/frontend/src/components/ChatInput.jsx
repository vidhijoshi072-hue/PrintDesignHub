import { LoaderCircle, Send } from "lucide-react";

function ChatInput({ value, onChange, onSubmit, loading }) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 md:flex-row">
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Type your message..."
        className="input-base min-h-16 flex-1 resize-none"
      />
      <button type="submit" className="button-primary min-w-36 self-end md:self-auto" disabled={loading}>
        {loading ? <LoaderCircle size={16} className="mr-2 animate-spin" /> : <Send size={16} className="mr-2" />}
        {loading ? "Sending..." : "Send"}
      </button>
    </form>
  );
}

export default ChatInput;

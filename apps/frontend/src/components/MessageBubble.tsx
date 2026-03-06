import { cn } from "./ui/utils";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";
  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[80%] px-4 py-3 rounded-2xl text-sm whitespace-pre-wrap leading-relaxed shadow-sm",
          isUser
            ? "bg-primary text-primary-foreground rounded-tr-sm"
            : "bg-card text-card-foreground border border-border rounded-tl-sm"
        )}
      >
        {msg.content}
      </div>
    </div>
  );
}

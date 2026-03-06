import { Loader2, Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type Props = {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onSend: () => void;
  loading: boolean;
};

export function ChatInput({ value, onChange, onSend, loading }: Props) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="border-t bg-card px-5 py-4 flex-shrink-0">
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          placeholder='例：「牛乳をタスクに追加して」'
          disabled={loading}
          className="flex-1 h-10"
        />
        <Button
          onClick={onSend}
          disabled={loading || !value.trim()}
          size="default"
          className="h-10 px-4 gap-2"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <span>送信</span>
              <Send className="w-4 h-4" />
            </>
          )}
        </Button>
      </div>
      <p className="text-xs text-muted-foreground mt-1.5 px-1">Enter で送信</p>
    </div>
  );
}

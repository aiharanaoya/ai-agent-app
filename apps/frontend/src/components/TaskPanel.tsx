import { ListTodo } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { TaskSection } from "./TaskSection";

type Task = {
  id: string;
  title: string;
  done: boolean;
};

type Props = {
  tasks: Task[];
};

export function TaskPanel({ tasks }: Props) {
  const pending = tasks.filter((t) => !t.done);
  const done = tasks.filter((t) => t.done);

  return (
    <ScrollArea className="bg-background" style={{ width: "40%" }}>
      <div className="px-5 py-5 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ListTodo className="w-4 h-4 text-muted-foreground" />
            <h2 className="text-base">タスク一覧</h2>
          </div>
          <Badge variant="secondary">{tasks.length} 件</Badge>
        </div>

        <Separator />

        {tasks.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-3">📋</div>
            <p className="text-sm text-muted-foreground">タスクはまだありません</p>
            <p className="text-xs text-muted-foreground/60 mt-1">
              チャットで「〇〇を追加して」と話しかけよう
            </p>
          </div>
        )}

        <TaskSection label="未完了" badgeVariant="orange" tasks={pending} />
        <TaskSection label="完了済み" badgeVariant="blue" tasks={done} />
      </div>
    </ScrollArea>
  );
}

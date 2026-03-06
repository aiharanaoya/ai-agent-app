import { Badge } from "./ui/badge";
import { TaskItem } from "./TaskItem";

type Task = {
  id: string;
  title: string;
  done: boolean;
};

type Props = {
  label: string;
  badgeVariant: "orange" | "blue";
  tasks: Task[];
};

export function TaskSection({ label, badgeVariant, tasks }: Props) {
  if (tasks.length === 0) return null;
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">{label}</span>
        <Badge variant={badgeVariant}>{tasks.length}</Badge>
      </div>
      <div className="space-y-2">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

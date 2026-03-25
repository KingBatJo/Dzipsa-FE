import { Repeat2 } from 'lucide-react';

type TodoSubtitleProps = {
  dueDateLabel: string;
  repeatLabel?: string | null;
};

const TodoSubtitle = ({ dueDateLabel, repeatLabel }: TodoSubtitleProps) => {
  if (!repeatLabel) return dueDateLabel;

  return (
    <div className="flex flex-wrap items-center gap-1">
      <span>{dueDateLabel}</span>
      <div className="flex items-center gap-1">
        <Repeat2 className="h-[15px] w-[15px]" />
        <span>{repeatLabel}</span>
      </div>
    </div>
  );
};

export default TodoSubtitle;

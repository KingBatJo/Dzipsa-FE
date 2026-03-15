import { PencilLine, Trash2 } from 'lucide-react';
import { formatDueDateLabel, formatStatusDateLabel } from '@/utils/date';
import { getTodoDetailViewState, getTodoStatusLabel } from '@/utils/todos';

import BottomSheet from '@/components/common/BottomSheet';
import { Button } from '@/components/ui/button';
import { MOCK_TODAY } from '@/mocks/mockData';
import type { ReactNode } from 'react';
import type { TodoWithLocal } from '@/types/todo';
import UserAvatar from '@/components/common/UserAvatar';

type TodoDetailSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  todo: TodoWithLocal | null;
  myId: number;
  assigneeName?: string;
  assigneeImage?: string;
};

const DetailRow = ({
  label,
  value,
  alignTop = false,
}: {
  label: string;
  value: ReactNode;
  alignTop?: boolean;
}) => (
  <div
    className={`flex justify-between ${alignTop ? 'items-start' : 'items-center'} gap-3`}
  >
    <p className="text-muted-foreground text-base font-semibold">{label}</p>
    <div className="text-primary text-right text-base font-semibold">
      {value}
    </div>
  </div>
);

const TodoDetailSheet = ({
  open,
  onOpenChange,
  todo,
  myId,
  assigneeName,
  assigneeImage,
}: TodoDetailSheetProps) => {
  const viewState = todo ? getTodoDetailViewState(todo, myId) : null;

  return (
    <BottomSheet
      open={open}
      onOpenChange={onOpenChange}
      className="rounded-t-[24px] pb-[30px] [&>div:first-child]:my-2 [&>div:first-child]:h-[5px] [&>div:first-child]:w-20 [&>div:first-child]:bg-[#CECECE]"
    >
      <div className="px-[15px] pt-5">
        <div className="flex flex-col pt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-black">
              {todo?.title ?? '-'}
            </h2>

            {viewState?.canEdit && (
              <button type="button" className="text-[#A3A3A3]">
                <PencilLine className="h-6 w-6" />
              </button>
            )}
          </div>

          <div className="flex flex-col gap-8 pt-[52px]">
            <DetailRow
              label="마감일"
              value={todo ? formatDueDateLabel(todo.dueAt) : '-'}
            />

            <DetailRow
              label="담당자"
              value={
                <span className="inline-flex items-center gap-1">
                  <UserAvatar
                    size="sm"
                    src={assigneeImage}
                    alt={assigneeName}
                  />
                  <span>{assigneeName ?? '-'}</span>
                </span>
              }
            />

            <DetailRow label="반복" value="반복 없음" />

            <DetailRow
              label="메모"
              value={
                todo?.memo ? (
                  <span className="break-keep">{todo.memo}</span>
                ) : (
                  '-'
                )
              }
              alignTop
            />

            <DetailRow
              label="상태"
              value={
                <div className="flex flex-col items-end gap-1">
                  <span>
                    {todo ? getTodoStatusLabel(todo, MOCK_TODAY) : '-'}
                  </span>

                  {todo && (
                    <span className="text-[#ACACAC]">
                      {formatStatusDateLabel(todo.dueAt)}
                    </span>
                  )}
                </div>
              }
              alignTop
            />
          </div>

          {/* 하단 버튼 */}
          <div className="flex items-center justify-between gap-1 pt-[26px]">
            {viewState?.canDelete && (
              <button
                type="button"
                className="flex h-12 w-12 items-center justify-center rounded-[10px] bg-[#D9D9D9] text-[#737373]"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            )}

            <div className="flex flex-1 items-center gap-1">
              {!viewState?.isCompleted && (
                <>
                  {viewState?.canConfirmComplete && (
                    <Button
                      type="button"
                      variant="outline"
                      className="border-primary h-12 flex-1 rounded-[10px] px-4 text-sm"
                    >
                      확인으로 완료
                    </Button>
                  )}

                  {viewState?.canPhotoComplete && (
                    <Button
                      type="button"
                      className="h-12 flex-1 rounded-[10px] px-4 text-sm"
                    >
                      사진인증해서 완료
                    </Button>
                  )}
                </>
              )}

              {viewState?.isCompleted && (
                <>
                  {viewState?.canRevertToInProgress && (
                    <Button
                      type="button"
                      variant="outline"
                      className="border-primary h-12 flex-1 rounded-[10px] px-4 text-sm"
                    >
                      진행중으로 변경
                    </Button>
                  )}

                  {viewState?.canAddProofImage && (
                    <Button
                      type="button"
                      className="h-12 flex-1 rounded-[10px] px-4 text-sm"
                    >
                      인증 사진 추가하기
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </BottomSheet>
  );
};

export default TodoDetailSheet;

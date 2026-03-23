import {
  getTodoDetailViewState,
  getTodoStatusLabel,
  getTodoStatusSubLabel,
} from '@/utils/todos';

import AppButton from '@/components/common/AppButton';
import BottomSheet from '@/components/common/BottomSheet';
import { MOCK_TODAY } from '@/mocks/mockData';
import { PencilLine } from 'lucide-react';
import type { ReactNode } from 'react';
import type { TodoWithLocal } from '@/types/todo';
import UserAvatar from '@/components/common/UserAvatar';
import { formatDueDateLabel } from '@/utils/date';
import { useNavigate } from 'react-router-dom';

type TodoDetailSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  todo: TodoWithLocal | null;
  myId: number;
  assigneeName?: string;
  assigneeImage?: string;
};

export const DetailRow = ({
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
    <p className="text-base font-medium text-zinc-500">{label}</p>
    <div className="max-w-62.5 text-right text-base font-medium text-black">
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
  const navigate = useNavigate();

  return (
    <BottomSheet
      open={open}
      onOpenChange={onOpenChange}
      className="rounded-t-[24px] [&>div:first-child]:my-2.5 [&>div:first-child]:h-[5px] [&>div:first-child]:w-20 [&>div:first-child]:bg-zinc-400"
    >
      <div className="flex items-center justify-between px-5 pt-8 pb-[15px]">
        <h2 className="text-xl font-semibold text-black">
          {todo?.title ?? '-'}
        </h2>

        {viewState?.canEdit && (
          <button
            type="button"
            onClick={() => {
              navigate(`/todos/${todo?.id}/edit`, { state: { todo } });
            }}
            className="text-zinc-400"
          >
            <PencilLine className="h-6 w-6 transition-colors hover:text-black" />
          </button>
        )}
      </div>

      {/* 스크롤 영역 */}
      <div className="min-h-0 flex-1 gap-8 overflow-y-auto p-5">
        <div className="flex flex-col gap-6">
          <DetailRow
            label="마감일"
            value={todo ? formatDueDateLabel(todo.dueAt) : '-'}
          />

          <DetailRow
            label="담당자"
            value={
              <span className="inline-flex items-center gap-1">
                <UserAvatar size="sm" src={assigneeImage} alt={assigneeName} />
                <span>{assigneeName ?? '-'}</span>
              </span>
            }
          />

          <DetailRow label="반복" value="반복 없음" />

          <DetailRow
            label="메모"
            value={
              todo?.memo ? <span className="break-keep">{todo.memo}</span> : '-'
            }
            alignTop
          />

          <DetailRow
            label="상태"
            value={
              <div className="flex flex-col items-end gap-1">
                <span>{todo ? getTodoStatusLabel(todo, MOCK_TODAY) : '-'}</span>

                {todo && (
                  <span className="text-zinc-300">
                    {getTodoStatusSubLabel(todo, MOCK_TODAY)}
                  </span>
                )}
              </div>
            }
            alignTop
          />

          {/* 인증 사진 */}
          {viewState?.isCompleted && todo?.proofImageUrl && (
            <div className="flex justify-end">
              <div className="h-37.5 w-50 rounded-[20px] bg-zinc-200" />
            </div>
          )}
        </div>
      </div>

      {/* 하단 버튼 */}
      {viewState?.isMine && (
        <div className="flex items-center justify-between gap-1 p-5">
          <div className="flex flex-1 items-center gap-1">
            {!viewState.isCompleted && viewState.canConfirmComplete && (
              <AppButton className="flex-1 bg-black text-white">
                완료하기
              </AppButton>
            )}

            {viewState.isCompleted && viewState.canRevertToInProgress && (
              <AppButton
                className={`flex-1 ${
                  viewState.hasProofImage
                    ? 'bg-black text-white'
                    : 'border border-zinc-400'
                }`}
              >
                진행 중으로 변경
              </AppButton>
            )}

            {viewState.isCompleted &&
              !viewState.hasProofImage &&
              viewState.canAddProofImage && (
                <AppButton className="flex-1 bg-black text-white">
                  인증 사진 추가
                </AppButton>
              )}
          </div>
        </div>
      )}
    </BottomSheet>
  );
};

export default TodoDetailSheet;

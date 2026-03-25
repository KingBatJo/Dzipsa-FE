import {
  getTodoRecurringInfoText,
  getTodoStatusTexts,
} from '@/api/todo/todo.utils';
import {
  useCompleteTodoMutation,
  useResetTodoStatusMutation,
  useTodoDetailQuery,
} from '@/api/todo/todo.query';

import AppButton from '@/components/common/AppButton';
import BottomSheet from '@/components/common/BottomSheet';
import type { ReactNode } from 'react';
import { TODO_STATUS } from '@/constants/todos';
import TodoCompleteSheet from '@/pages/todos/components/TodoCompleteSheet';
import type { TodoInstanceId } from '@/api/todo/todo.types';
import UserAvatar from '@/components/common/UserAvatar';
import editIcon from '@/assets/icon/edit.svg';
import { formatDueDateLabel } from '@/utils/date';
import { getProfileOptionById } from '@/api/room/room.utils';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

type TodoDetailSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  instanceId: number | null;
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
  instanceId,
}: TodoDetailSheetProps) => {
  const navigate = useNavigate();
  const [completeSheetOpen, setCompleteSheetOpen] = useState(false);
  const [completeTargetInstanceId, setCompleteTargetInstanceId] =
    useState<TodoInstanceId | null>(null);

  const { data: todoDetail } = useTodoDetailQuery(instanceId);
  const { mutate: completeTodo, isPending: isCompleting } =
    useCompleteTodoMutation();
  const { mutate: resetTodoStatus, isPending: isResetting } =
    useResetTodoStatusMutation();

  const assigneeProfile = getProfileOptionById(todoDetail?.profileImageUrl);

  const isCompleted = todoDetail?.status === TODO_STATUS.COMPLETED;
  const hasProofImage = Boolean(todoDetail?.imageUrl);
  const statusTexts = getTodoStatusTexts(
    todoDetail?.status,
    todoDetail?.delayDays ?? 0,
    todoDetail?.completedAt
  );
  const recurringInfoText = getTodoRecurringInfoText(
    todoDetail?.recurringType,
    todoDetail?.repeatDays
  );
  const isRecurringUnset = recurringInfoText === '설정 안 함';

  const isOwner = todoDetail?.owner;

  const handleOpenCompleteSheet = () => {
    if (instanceId == null) return;

    setCompleteTargetInstanceId(instanceId);
    onOpenChange(false);
    setCompleteSheetOpen(true);
  };

  const handleConfirmComplete = (proofImageFile?: File) => {
    if (completeTargetInstanceId == null) return;

    completeTodo(
      { instanceId: completeTargetInstanceId, image: proofImageFile ?? null },
      {
        onSuccess: () => {
          const title = todoDetail?.title?.trim();

          toast(
            title
              ? `[${title}]이 완료되었습니다 ! 수고하셨어요 !`
              : '할 일이 완료되었습니다 ! 수고하셨어요 !'
          );

          setCompleteSheetOpen(false);
          setCompleteTargetInstanceId(null);
        },
      }
    );
  };

  const handleResetStatus = () => {
    if (instanceId == null) return;

    resetTodoStatus({ instanceId });
    onOpenChange(false);
  };

  return (
    <>
      <BottomSheet open={open} onOpenChange={onOpenChange}>
        <div className="flex items-center justify-between px-5 pt-8 pb-[15px]">
          <h2 className="text-xl font-semibold text-black">
            {todoDetail?.title ?? '-'}
          </h2>

          {isOwner && (
            <button
              type="button"
              onClick={() => {
                if (!todoDetail) return;
                navigate(`/todos/${todoDetail.instanceId}/edit`, {
                  state: {
                    todoId: todoDetail.todoId,
                    title: todoDetail.title,
                    memo: todoDetail.memo,
                    targetDate: todoDetail.targetDate,
                    assigneeId: todoDetail.assigneeId,
                    isRandom: todoDetail.isRandom,
                    recurringType: todoDetail.recurringType,
                    repeatDays: todoDetail.repeatDays,
                    startDate: todoDetail.startDate,
                    endDate: todoDetail.endDate,
                  },
                });
              }}
              className="shrink-0"
            >
              <img src={editIcon} alt="편집" className="h-6 w-6" />
            </button>
          )}
        </div>

        <div className="min-h-0 flex-1 gap-8 overflow-y-auto p-5">
          <div className="flex flex-col gap-6">
            <DetailRow
              label="마감일"
              value={
                todoDetail ? formatDueDateLabel(todoDetail.targetDate) : '-'
              }
            />

            <DetailRow
              label="담당자"
              value={
                <span className="inline-flex items-center gap-1">
                  <UserAvatar
                    size="sm"
                    src={assigneeProfile.imageUrl}
                    alt={todoDetail?.assigneeNickname}
                  />
                  <span>{todoDetail?.assigneeNickname ?? '-'}</span>
                </span>
              }
            />

            <DetailRow
              label="반복"
              value={
                <span
                  className={isRecurringUnset ? 'text-zinc-400' : undefined}
                >
                  {recurringInfoText}
                </span>
              }
            />

            <DetailRow
              label="메모"
              value={
                todoDetail?.memo ? (
                  todoDetail.memo
                ) : (
                  <span className="text-zinc-400">작성된 메모가 없습니다</span>
                )
              }
              alignTop
            />

            <DetailRow
              label="상태"
              value={
                <div className="flex flex-col items-end gap-1">
                  <span>{statusTexts.label}</span>
                  <span className="text-zinc-400">{statusTexts.detail}</span>
                </div>
              }
              alignTop
            />

            {hasProofImage && (
              <div className="flex justify-end">
                <img
                  src={todoDetail?.imageUrl ?? undefined}
                  alt="인증 사진"
                  className="h-37.5 w-50 rounded-[20px] object-cover"
                />
              </div>
            )}
          </div>
        </div>

        {isOwner && (
          <div className="flex items-center justify-between gap-1 p-5">
            <div className="flex flex-1 items-center gap-1">
              {!isCompleted && (
                <AppButton
                  className="flex-1 bg-black text-white"
                  onClick={handleOpenCompleteSheet}
                  disabled={isCompleting}
                >
                  완료하기
                </AppButton>
              )}

              {isCompleted && (
                <AppButton
                  className="flex-1 border border-zinc-400"
                  onClick={handleResetStatus}
                  disabled={isResetting}
                >
                  진행 중으로 변경
                </AppButton>
              )}

              {isCompleted && !hasProofImage && (
                <AppButton
                  className="flex-1 bg-black text-white"
                  onClick={handleOpenCompleteSheet}
                  disabled={isCompleting}
                >
                  인증 사진 추가
                </AppButton>
              )}
            </div>
          </div>
        )}
      </BottomSheet>

      <TodoCompleteSheet
        open={completeSheetOpen}
        onOpenChange={setCompleteSheetOpen}
        onConfirmComplete={handleConfirmComplete}
        isSubmitting={isCompleting}
      />
    </>
  );
};

export default TodoDetailSheet;

import {
  useCompleteTodoMutation,
  useResetTodoStatusMutation,
  useTodoDetailQuery,
} from '@/api/todo/todo.query';

import AppButton from '@/components/common/AppButton';
import BottomSheet from '@/components/common/BottomSheet';
import { PencilLine } from 'lucide-react';
import type { ReactNode } from 'react';
import TodoCompleteSheet from '@/pages/todos/components/TodoCompleteSheet';
import type { TodoInstanceId } from '@/api/todo/todo.types';
import UserAvatar from '@/components/common/UserAvatar';
import { formatDueDateLabel } from '@/utils/date';
import { getProfileOptionById } from '@/api/room/room.utils';
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

  const isCompleted = todoDetail?.status.includes('완료') ?? false;
  const hasProofImage = Boolean(todoDetail?.imageUrl);

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

          {todoDetail?.owner && (
            <button
              type="button"
              onClick={() => {
                if (!todoDetail) return;
                navigate(`/todos/${todoDetail.instanceId}/edit`, {
                  state: {
                    todo: {
                      id: todoDetail.instanceId,
                      title: todoDetail.title,
                      dueAt: `${todoDetail.targetDate}T00:00:00`,
                      createdAt: `${todoDetail.targetDate}T00:00:00`,
                      assigneeId: todoDetail.assigneeId,
                      memo: todoDetail.memo ?? undefined,
                      completed: isCompleted,
                      proofImageUrl: todoDetail.imageUrl ?? undefined,
                      local: { dueDate: todoDetail.targetDate },
                    },
                  },
                });
              }}
              className="text-zinc-400"
            >
              <PencilLine className="h-6 w-6 transition-colors hover:text-black" />
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
              value={todoDetail?.recurringInfo ?? '반복 없음'}
            />

            <DetailRow
              label="메모"
              value={
                todoDetail?.memo ? (
                  <span className="break-keep">{todoDetail.memo}</span>
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
                  <span>{todoDetail?.status === '진행' ? '진행중' : '-'}</span>
                  <span className="text-zinc-300">
                    {todoDetail?.status === '진행'
                      ? ''
                      : (todoDetail?.statusDetail ?? '')}
                  </span>
                </div>
              }
              alignTop
            />

            {/* 인증 사진 */}
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

        {/* 하단 버튼 */}
        {todoDetail?.owner && (
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

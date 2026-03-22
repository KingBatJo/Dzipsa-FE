import { mockMembers } from '@/mocks/mockData';
import {
  todoCreateSchema,
  type TodoCreateValues,
} from '@/schemas/todoCreateSchema';
import type { RepeatValue, TodoFormValues } from '@/types/todo';
import { createDefaultRepeatValue } from '@/utils/todoForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

type RandomAssignStage = 'idle' | 'loading' | 'result';

type UseTodoFormModelParams = {
  initialValues?: Partial<TodoFormValues>;
  onSubmit: (values: TodoFormValues) => void;
};

export const useTodoFormModel = ({
  initialValues,
  onSubmit,
}: UseTodoFormModelParams) => {
  // 폼 외부 UI 상태(다이얼로그/선택값/랜덤 배정 상태) 관리
  const [isDueDateDialogOpen, setIsDueDateDialogOpen] = useState(false);
  const [dueDate, setDueDate] = useState<Date | null>(
    initialValues?.dueDate ?? new Date()
  );
  const [selectedAssigneeId, setSelectedAssigneeId] = useState<number>(
    initialValues?.assigneeId ?? mockMembers[0]?.id ?? 0
  );
  const [repeatValue, setRepeatValue] = useState<RepeatValue>(
    initialValues?.repeatValue ?? createDefaultRepeatValue()
  );
  const [randomAssignStage, setRandomAssignStage] =
    useState<RandomAssignStage>('idle');
  const [randomCandidateAssigneeId, setRandomCandidateAssigneeId] = useState<
    number | null
  >(null);
  const [randomAssignedAssigneeId, setRandomAssignedAssigneeId] = useState<
    number | null
  >(null);

  const randomAssignTimeoutRef = useRef<number | null>(null);

  // 입력 필드 값 검증/제출 처리 전용 상태
  const { control, handleSubmit, formState } = useForm<TodoCreateValues>({
    resolver: zodResolver(todoCreateSchema),
    mode: 'onChange',
    defaultValues: {
      title: initialValues?.title ?? '',
      memo: initialValues?.memo ?? '',
    },
  });

  const isRandomAssigneeLocked = randomAssignedAssigneeId !== null;
  const randomCandidate = mockMembers.find(
    (member) => member.id === randomCandidateAssigneeId
  );

  // 언마운트 시 타이머 정리(메모리 릭/불필요 setState 방지)
  useEffect(() => {
    return () => {
      if (randomAssignTimeoutRef.current) {
        window.clearTimeout(randomAssignTimeoutRef.current);
      }
    };
  }, []);

  const handleRandomAssign = () => {
    if (isRandomAssigneeLocked) return;

    if (randomAssignTimeoutRef.current) {
      window.clearTimeout(randomAssignTimeoutRef.current);
    }

    setRandomAssignStage('loading');
    setRandomCandidateAssigneeId(null);

    randomAssignTimeoutRef.current = window.setTimeout(() => {
      const randomMember =
        mockMembers[Math.floor(Math.random() * mockMembers.length)];
      setRandomCandidateAssigneeId(randomMember.id);
      setRandomAssignStage('result');
    }, 1200);
  };

  const handleCloseRandomOverlay = () => {
    if (randomAssignTimeoutRef.current) {
      window.clearTimeout(randomAssignTimeoutRef.current);
      randomAssignTimeoutRef.current = null;
    }

    setRandomAssignStage('idle');
    setRandomCandidateAssigneeId(null);
  };

  const handleConfirmRandomAssignee = () => {
    if (!randomCandidateAssigneeId) return;

    setSelectedAssigneeId(randomCandidateAssigneeId);
    setRandomAssignedAssigneeId(randomCandidateAssigneeId);
    setRandomAssignStage('idle');
    setRandomCandidateAssigneeId(null);

    // 랜덤 배정이 확정되면 반복 설정 비활성화
    if (repeatValue.enabled) {
      setRepeatValue((prev) => ({
        ...prev,
        enabled: false,
      }));
    }
  };

  const handleSelectAssignee = (memberId: number) => {
    setSelectedAssigneeId(memberId);
  };

  const handleFormSubmit = (data: TodoCreateValues) => {
    // 화면 상태와 RHF 입력값을 최종 TodoFormValues로 결합해 상위로 전달
    onSubmit({
      title: data.title,
      memo: data.memo ?? '',
      dueDate,
      assigneeId: selectedAssigneeId,
      repeatValue,
    });
  };

  return {
    // TodoForm에서 역할이 바로 보이도록 그룹화해서 반환
    form: {
      control,
      isValid: formState.isValid,
      submitForm: handleSubmit(handleFormSubmit),
    },
    state: {
      dueDate,
      isDueDateDialogOpen,
      selectedAssigneeId,
      repeatValue,
      randomAssignStage,
      randomCandidate,
      randomAssignedAssigneeId,
      isRandomAssigneeLocked,
    },
    actions: {
      setDueDate,
      setIsDueDateDialogOpen,
      setRepeatValue,
      handleRandomAssign,
      handleCloseRandomOverlay,
      handleConfirmRandomAssignee,
      handleSelectAssignee,
    },
  };
};

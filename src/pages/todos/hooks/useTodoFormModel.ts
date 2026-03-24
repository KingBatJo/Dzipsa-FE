import {
  todoCreateSchema,
  type TodoCreateValues,
} from '@/schemas/todoCreateSchema';
import type { RepeatValue, TodoFormValues } from '@/types/todo';
import { createDefaultRepeatValue } from '@/utils/todoForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { toDateString } from '@/utils/date';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

type RandomAssignStage = 'idle' | 'loading' | 'result';

type FormMember = {
  id: number;
  name: string;
};

type UseTodoFormModelParams = {
  initialValues?: Partial<TodoFormValues>;
  onSubmit: (values: TodoFormValues) => void;
  members: FormMember[];
};

export const useTodoFormModel = ({
  initialValues,
  onSubmit,
  members,
}: UseTodoFormModelParams) => {
  // repeatValue를 비교 가능한 형태로 정규화 (Date → string)
  const normalizeRepeatValue = (value: RepeatValue) => ({
    enabled: value.enabled,
    type: value.type,
    days: value.days,
    startDate: toDateString(value.startDate),
    endDate: toDateString(value.endDate),
  });

  const [isDueDateDialogOpen, setIsDueDateDialogOpen] = useState(false);
  const [dueDate, setDueDate] = useState<Date | null>(
    initialValues?.dueDate ?? new Date()
  );
  const [selectedAssigneeId, setSelectedAssigneeId] = useState<number>(
    initialValues?.assigneeId ?? members[0]?.id ?? 0
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
  >(
    initialValues?.isRandom
      ? (initialValues?.assigneeId ?? members[0]?.id ?? null)
      : null
  );

  const randomAssignTimeoutRef = useRef<number | null>(null);

  // 초기 상태 snapshot (이후 변경 여부 비교 기준)
  const initialSnapshotRef = useRef<{
    title: string;
    memo: string;
    dueDate: string | null;
    assigneeId: number;
    isRandom: boolean;
    repeatValue: ReturnType<typeof normalizeRepeatValue>;
  } | null>(null);

  const { control, handleSubmit, formState, watch } = useForm<TodoCreateValues>(
    {
      resolver: zodResolver(todoCreateSchema),
      mode: 'onChange',
      defaultValues: {
        title: initialValues?.title ?? '',
        memo: initialValues?.memo ?? '',
      },
    }
  );

  const isRandomAssigneeLocked = randomAssignedAssigneeId !== null;
  const watchedTitle = watch('title') ?? '';
  const watchedMemo = watch('memo') ?? '';

  const randomCandidate = members.find(
    (member) => member.id === randomCandidateAssigneeId
  );

  // 최초 렌더 시 초기 snapshot 저장
  if (!initialSnapshotRef.current) {
    const initialRepeatValue =
      initialValues?.repeatValue ?? createDefaultRepeatValue();

    initialSnapshotRef.current = {
      title: initialValues?.title ?? '',
      memo: initialValues?.memo ?? '',
      dueDate: toDateString(initialValues?.dueDate ?? new Date()),
      assigneeId: initialValues?.assigneeId ?? members[0]?.id ?? 0,
      isRandom: initialValues?.isRandom ?? false,
      repeatValue: normalizeRepeatValue(initialRepeatValue),
    };
  }

  const initial = initialSnapshotRef.current;

  const normalizeDays = (days: string[]) => [...days].sort().join(',');

  const currentDueDate = toDateString(dueDate);
  const currentStartDate = toDateString(repeatValue.startDate);
  const currentEndDate = toDateString(repeatValue.endDate);

  // 초기 상태와 현재 상태를 비교해 변경 여부 판단
  const hasChanges = !initial
    ? true
    : initial.title !== watchedTitle ||
      initial.memo !== watchedMemo ||
      initial.dueDate !== currentDueDate ||
      initial.assigneeId !== selectedAssigneeId ||
      initial.isRandom !== isRandomAssigneeLocked ||
      initial.repeatValue.enabled !== repeatValue.enabled ||
      (repeatValue.enabled &&
        (initial.repeatValue.type !== repeatValue.type ||
          normalizeDays(initial.repeatValue.days) !==
            normalizeDays(repeatValue.days) ||
          initial.repeatValue.startDate !== currentStartDate ||
          initial.repeatValue.endDate !== currentEndDate));

  // 기본 담당자 설정 보정
  useEffect(() => {
    if (selectedAssigneeId !== 0) return;
    if (!members[0]) return;

    setSelectedAssigneeId(members[0].id);
  }, [members, selectedAssigneeId]);

  // 랜덤 배정 초기 상태 보정
  useEffect(() => {
    if (!initialValues?.isRandom) return;
    if (randomAssignedAssigneeId != null) return;
    if (selectedAssigneeId === 0) return;

    setRandomAssignedAssigneeId(selectedAssigneeId);
  }, [initialValues?.isRandom, randomAssignedAssigneeId, selectedAssigneeId]);

  // 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (randomAssignTimeoutRef.current) {
        window.clearTimeout(randomAssignTimeoutRef.current);
      }
    };
  }, []);

  // 랜덤 배정 시작
  const handleRandomAssign = () => {
    if (isRandomAssigneeLocked) return;

    if (randomAssignTimeoutRef.current) {
      window.clearTimeout(randomAssignTimeoutRef.current);
    }

    setRandomAssignStage('loading');
    setRandomCandidateAssigneeId(null);

    randomAssignTimeoutRef.current = window.setTimeout(() => {
      const randomMember = members[Math.floor(Math.random() * members.length)];
      if (!randomMember) {
        setRandomAssignStage('idle');
        return;
      }

      setRandomCandidateAssigneeId(randomMember.id);
      setRandomAssignStage('result');
    }, 1200);
  };

  // 랜덤 배정 오버레이 닫기
  const handleCloseRandomOverlay = () => {
    if (randomAssignTimeoutRef.current) {
      window.clearTimeout(randomAssignTimeoutRef.current);
      randomAssignTimeoutRef.current = null;
    }

    setRandomAssignStage('idle');
    setRandomCandidateAssigneeId(null);
  };

  // 랜덤 배정 확정
  const handleConfirmRandomAssignee = () => {
    if (!randomCandidateAssigneeId) return;

    setSelectedAssigneeId(randomCandidateAssigneeId);
    setRandomAssignedAssigneeId(randomCandidateAssigneeId);
    setRandomAssignStage('idle');
    setRandomCandidateAssigneeId(null);

    // 랜덤 배정 시 반복 옵션 비활성화
    if (repeatValue.enabled) {
      setRepeatValue((prev) => ({
        ...prev,
        enabled: false,
      }));
    }
  };

  // 담당자 수동 선택
  const handleSelectAssignee = (memberId: number) => {
    setSelectedAssigneeId(memberId);
  };

  // 최종 제출
  const handleFormSubmit = (data: TodoCreateValues) => {
    onSubmit({
      title: data.title,
      memo: data.memo ?? '',
      dueDate,
      assigneeId: selectedAssigneeId,
      isRandom: isRandomAssigneeLocked,
      repeatValue,
    });
  };

  return {
    form: {
      control,
      isValid: formState.isValid,
      hasChanges,
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

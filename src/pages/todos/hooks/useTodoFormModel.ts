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
  >(null);

  const randomAssignTimeoutRef = useRef<number | null>(null);

  const { control, handleSubmit, formState } = useForm<TodoCreateValues>({
    resolver: zodResolver(todoCreateSchema),
    mode: 'onChange',
    defaultValues: {
      title: initialValues?.title ?? '',
      memo: initialValues?.memo ?? '',
    },
  });

  const isRandomAssigneeLocked = randomAssignedAssigneeId !== null;
  const randomCandidate = members.find(
    (member) => member.id === randomCandidateAssigneeId
  );

  useEffect(() => {
    if (selectedAssigneeId !== 0) return;
    if (!members[0]) return;

    setSelectedAssigneeId(members[0].id);
  }, [members, selectedAssigneeId]);

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
      const randomMember = members[Math.floor(Math.random() * members.length)];
      if (!randomMember) {
        setRandomAssignStage('idle');
        return;
      }

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
    onSubmit({
      title: data.title,
      memo: data.memo ?? '',
      dueDate,
      assigneeId: selectedAssigneeId,
      repeatValue,
    });
  };

  return {
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
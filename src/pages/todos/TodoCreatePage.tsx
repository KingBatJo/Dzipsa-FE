import RoundedBadge from '@/components/common/RoundedBadge';
import EditableInputSection from '@/components/form/EditableInputSection';
import FormPageLayout from '@/components/form/FormPageLayout';
import { mockMembers } from '@/mocks/mockData';
import {
  TODO_TITLE_MAX_LENGTH,
  todoCreateSchema,
  type TodoCreateValues,
} from '@/schemas/todoCreateSchema';
import { validateTextMaxLength } from '@/utils/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import AppButton from '@/components/common/AppButton';
import ToggleSwitch from '@/components/common/ToggleSwitch';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const REPEAT_CYCLE_OPTIONS = ['매주', '매월'] as const;
type RepeatCycle = (typeof REPEAT_CYCLE_OPTIONS)[number];

const TodoCreatePage = () => {
  const [inputErrorMessage, setInputErrorMessage] = useState('');
  const [isRepeatEnabled, setIsRepeatEnabled] = useState(false);
  const [repeatCycle, setRepeatCycle] = useState<RepeatCycle>('매주');
  const [isRepeatMenuOpen, setIsRepeatMenuOpen] = useState(false);
  const repeatCycleDropdownRef = useRef<HTMLDivElement>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TodoCreateValues>({
    resolver: zodResolver(todoCreateSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
    },
  });

  const onSubmit = (data: TodoCreateValues) => {
    console.log('할 일 등록: ', data);
  };

  useEffect(() => {
    if (!isRepeatMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        repeatCycleDropdownRef.current &&
        !repeatCycleDropdownRef.current.contains(event.target as Node)
      ) {
        setIsRepeatMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsRepeatMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isRepeatMenuOpen]);

  return (
    <FormPageLayout
      title="할 일 등록"
      onSubmit={handleSubmit(onSubmit)}
      submitDisabled={!isValid}
      top={
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <EditableInputSection
              id="todo-title"
              value={field.value}
              placeholder="할 일을 입력하세요"
              maxLength={TODO_TITLE_MAX_LENGTH}
              onChange={(value) => {
                const maxLengthError = validateTextMaxLength(
                  value,
                  TODO_TITLE_MAX_LENGTH
                );

                if (maxLengthError) {
                  setInputErrorMessage(maxLengthError);
                  return;
                }

                field.onChange(value);

                if (inputErrorMessage) {
                  setInputErrorMessage('');
                }
              }}
              onBlur={() => {
                field.onBlur();
                setInputErrorMessage('');
              }}
              errorMessage={inputErrorMessage || errors.title?.message}
              inputRef={field.ref}
            />
          )}
        />
      }
      bottom={
        <div>
          <p className="text-sm font-semibold text-[#BCBCBC]">상세 설정</p>

          <div className="flex flex-col gap-[30px] pt-6">
            <section className="space-y-4">
              <p className="text-base font-semibold">마감기한</p>

              <AppButton className="text-muted-foreground bg-secondary border-border border text-lg font-semibold">
                {/* 기본값 오늘 */}
                2026.03.15 (토) 까지
              </AppButton>
            </section>

            <section className="space-y-4">
              <p className="text-base font-semibold">담당자</p>

              <div className="flex flex-col gap-[10px]">
                <div className="flex gap-[10px]">
                  {mockMembers.map((member) => (
                    <button
                      key={member.id}
                      type="button"
                      className="border-border hover:bg-secondary rounded-full border"
                    >
                      {/* 기본값 작성자 */}
                      <RoundedBadge>{member.name}</RoundedBadge>
                    </button>
                  ))}
                </div>

                <AppButton className="text-primary-foreground from-primary bg-gradient-to-r to-zinc-500 text-sm font-medium">
                  운명에 맡기기
                </AppButton>
              </div>
            </section>

            <section className="space-y-4 text-base font-semibold">
              <div className="flex items-center justify-between">
                <p>반복</p>

                <ToggleSwitch
                  checked={isRepeatEnabled}
                  onCheckedChange={(checked) => {
                    setIsRepeatEnabled(checked);

                    if (!checked) {
                      setIsRepeatMenuOpen(false);
                    }
                  }}
                  ariaLabel="반복 설정 토글"
                />
              </div>

              {isRepeatEnabled && (
                <div className="flex flex-col gap-[15px]">
                  <div
                    className="relative flex justify-end"
                    ref={repeatCycleDropdownRef}
                  >
                    <button
                      type="button"
                      className="flex items-center gap-1"
                      onClick={() =>
                        setIsRepeatMenuOpen((prevOpen) => !prevOpen)
                      }
                      aria-haspopup="menu"
                      aria-expanded={isRepeatMenuOpen}
                    >
                      <span>{repeatCycle}</span>
                      <ChevronDown
                        className={cn(
                          'h-6 w-6 transition-transform',
                          isRepeatMenuOpen && 'rotate-180'
                        )}
                      />
                    </button>

                    {isRepeatMenuOpen && (
                      <ul
                        role="menu"
                        className="absolute top-[calc(100%+6px)] right-0 z-10 w-[77px] rounded-md border border-[#898887] bg-[#696867] p-1 text-xs font-medium text-white shadow-md"
                      >
                        {REPEAT_CYCLE_OPTIONS.map((option) => (
                          <li key={option}>
                            <button
                              type="button"
                              role="menuitemradio"
                              aria-checked={repeatCycle === option}
                              className="flex w-full items-center gap-1 rounded-md px-2 py-1.5 text-left hover:bg-[#525150]"
                              onClick={() => {
                                setRepeatCycle(option);
                                setIsRepeatMenuOpen(false);
                              }}
                            >
                              <div className="flex gap-1">
                                <span>
                                  {repeatCycle === option ? (
                                    <Check className="h-4 w-4" />
                                  ) : (
                                    <div className="h-4 w-4" />
                                  )}
                                </span>
                                <span className="text-xs font-medium">
                                  {option}
                                </span>
                              </div>
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {repeatCycle === '매주' && <div>월 ~ 금</div>}

                  <div className="flex flex-col gap-[15px]">
                    <div>시작 날짜</div>
                    <div>종료 날짜</div>
                  </div>
                </div>
              )}
            </section>

            <section className="space-y-4">
              <p className="text-base font-semibold">메모</p>

              <div className="flex flex-col gap-1">
                <textarea
                  name="todo-memo"
                  id="todo-memo"
                  placeholder="메모를 입력하세요"
                  className="border-border bg-secondary h-[125px] resize-none rounded-[10px] border px-4 py-2"
                />

                <p className="flex justify-end text-xs font-semibold text-[#BCBCBC]">
                  최대 300글자
                </p>
              </div>
            </section>
          </div>
        </div>
      }
    />
  );
};

export default TodoCreatePage;

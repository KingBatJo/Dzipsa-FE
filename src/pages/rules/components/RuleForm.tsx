import {
  ControlledEditableInputSection,
  ControlledTextareaSection,
} from '@/components/form/ControlledTextSections';
import FormPageLayout from '@/components/form/FormPageLayout';
import WeekdaySelector from '@/components/form/WeekdaySelector';
import RuleSettingCard from '@/pages/rules/components/RuleSettingCard';
import TimeWheelDialog from '@/pages/rules/components/TimeWheelDialog';
import {
  RULE_MEMO_MAX_LENGTH,
  RULE_TITLE_MAX_LENGTH,
} from '@/schemas/ruleCreateSchema';
import { ChevronRight } from 'lucide-react';
import {
  type RuleFormInitialValues,
  type RuleFormMode,
  useRuleFormModel,
} from '@/pages/rules/hooks/useRuleFormModel';
import type { CreateRuleRequest } from '@/api/rule/rule.types';
import { formatKoreanTime } from '@/utils/ruleForm';

type RuleFormProps = {
  mode: RuleFormMode;
  initialValues?: RuleFormInitialValues;
  onSubmit: (values: CreateRuleRequest) => void;
  onDelete?: () => void;
  isSubmitting?: boolean;
};

const RuleForm = ({
  mode,
  initialValues,
  onSubmit,
  onDelete,
  isSubmitting = false,
}: RuleFormProps) => {
  const model = useRuleFormModel({
    initialValues,
    onSubmit,
  });

  return (
    <FormPageLayout
      title={mode === 'create' ? '규칙 등록' : '규칙 편집'}
      onSubmit={model.form.submitForm}
      submitDisabled={!model.form.isValid || isSubmitting}
    >
      <div className="bg-zinc-100 pb-6">
        <div className="bg-white px-[15px] pt-[15px] pb-[30px]">
          <ControlledEditableInputSection
            control={model.form.control}
            name="title"
            id="rule-title"
            placeholder="규칙을 입력하세요"
            maxLength={RULE_TITLE_MAX_LENGTH}
          />
        </div>

        <section className="flex flex-col gap-3 p-[15px]">
          <h2 className="text-sm font-semibold text-zinc-400">추가 설정</h2>

          <RuleSettingCard
            title="알람"
            checked={model.state.settings.notiEnabled}
            onToggle={(checked) =>
              model.actions.handleToggleSetting('notiEnabled', checked)
            }
            ariaLabel="알람 설정"
          />

          <RuleSettingCard
            title="규칙시간 설정하기"
            checked={model.state.settings.timeSettingEnabled}
            onToggle={(checked) =>
              model.actions.handleToggleSetting('timeSettingEnabled', checked)
            }
            ariaLabel="규칙 시간 설정"
          >
            {model.state.settings.timeSettingEnabled && (
              <div className="flex items-end justify-between">
                <div className="flex flex-col gap-[7px]">
                  <p className="text-[11px] font-medium text-[#B7B7B7]">
                    시작 시간
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      model.actions.setActiveTimeField('startTime')
                    }
                    className="border-border bg-secondary flex items-center rounded-[10px] border px-4 py-2"
                  >
                    <span className="text-muted-foreground text-lg font-semibold">
                      {formatKoreanTime(model.state.timeRange.startTime)}
                    </span>
                  </button>
                </div>

                <div className="flex items-center justify-center p-2.5">
                  <ChevronRight className="text-muted-foreground h-6 w-6" />
                </div>

                <div className="flex flex-col gap-[7px]">
                  <p className="text-[11px] font-medium text-[#B7B7B7]">
                    종료 시간
                  </p>

                  <button
                    type="button"
                    onClick={() => model.actions.setActiveTimeField('endTime')}
                    className="border-border bg-secondary flex items-center rounded-[10px] border px-4 py-2"
                  >
                    <span className="text-muted-foreground text-lg font-semibold">
                      {formatKoreanTime(model.state.timeRange.endTime)}
                    </span>
                  </button>
                </div>
              </div>
            )}
          </RuleSettingCard>

          <RuleSettingCard
            title="운영 요일"
            checked={model.state.settings.repeatEnabled}
            onToggle={(checked) =>
              model.actions.handleToggleSetting('repeatEnabled', checked)
            }
            ariaLabel="운영 요일 설정"
          >
            {model.state.settings.repeatEnabled && (
              <WeekdaySelector
                value={model.state.selectedOperatingDays}
                onChange={model.actions.setSelectedOperatingDays}
              />
            )}
          </RuleSettingCard>

          <section className="flex flex-col gap-4 rounded-[20px] bg-white p-4">
            <p className="text-base font-semibold">메모</p>

            <ControlledTextareaSection
              control={model.form.control}
              name="memo"
              id="rule-memo"
              placeholder="메모를 입력하세요"
              maxLength={RULE_MEMO_MAX_LENGTH}
              containerClassName="flex flex-col gap-2"
            />
          </section>

          {mode === 'edit' && (
            <button
              type="button"
              onClick={onDelete}
              className="h-12 w-full rounded-[12px] bg-red-500 text-base font-semibold text-white"
            >
              규칙 삭제
            </button>
          )}
        </section>
      </div>

      <TimeWheelDialog
        open={model.state.activeTimeField !== null}
        value={
          model.state.activeTimeField
            ? model.state.timeRange[model.state.activeTimeField]
            : model.state.timeRange.startTime
        }
        onOpenChange={(open) => {
          if (!open) {
            model.actions.setActiveTimeField(null);
          }
        }}
        onConfirm={model.actions.handleConfirmTime}
      />
    </FormPageLayout>
  );
};

export type {
  RuleFormInitialValues,
  RuleFormMode,
} from '@/pages/rules/hooks/useRuleFormModel';
export default RuleForm;

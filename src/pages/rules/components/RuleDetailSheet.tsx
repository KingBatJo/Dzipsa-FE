import { formatRuleRepeatDays, formatRuleTimeRange } from '@/utils/ruleForm';

import AppButton from '@/components/common/AppButton';
import BottomSheet from '@/components/common/BottomSheet';
import { DetailRow } from '@/pages/todos/components/TodoDetailSheet';
import { PencilLine } from 'lucide-react';
import type { RuleId } from '@/api/rule/rule.types';
import { useNavigate } from 'react-router-dom';
import { useRuleDetailQuery } from '@/api/rule/rule.query';

type RuleDetailSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ruleId: RuleId;
  onNotify?: () => void;
};

const RuleDetailSheet = ({
  open,
  onOpenChange,
  ruleId,
  onNotify,
}: RuleDetailSheetProps) => {
  const navigate = useNavigate();
  const { data: rule, isLoading, isError } = useRuleDetailQuery(ruleId);

  const hasRuleTime = Boolean(rule?.startTime && rule?.endTime);
  const hasRepeatDays = Boolean(rule?.repeatDays?.trim());

  const ruleTimeLabel = hasRuleTime ? (
    formatRuleTimeRange(rule?.startTime, rule?.endTime, {
      separator: ' > ',
    })
  ) : (
    <span className="text-zinc-400">설정 안 함</span>
  );

  const repeatDaysLabel = hasRepeatDays ? (
    formatRuleRepeatDays(rule?.repeatDays, {
      emptyLabel: '설정 안 함',
    })
  ) : (
    <span className="text-zinc-400">설정 안 함</span>
  );

  const memoLabel = isLoading ? (
    <span className="text-zinc-400">불러오는 중...</span>
  ) : rule?.memo && rule.memo.trim().length > 0 ? (
    rule.memo
  ) : (
    <span className="text-zinc-400">작성된 메모가 없습니다</span>
  );

  const reportLabel = isLoading ? (
    <span className="text-zinc-400">불러오는 중...</span>
  ) : (rule?.totalWarningCount ?? 0) > 0 ? (
    <span>누적 {rule?.totalWarningCount}회</span>
  ) : (
    <span className="text-zinc-400">규칙이 잘 지켜지고 있어요!</span>
  );

  return (
    <BottomSheet
      open={open}
      onOpenChange={onOpenChange}
      className="min-h-[442px] rounded-t-[24px] [&>div:first-child]:my-[10px] [&>div:first-child]:h-[5px] [&>div:first-child]:w-20 [&>div:first-child]:rounded-[5px] [&>div:first-child]:bg-zinc-400"
    >
      <div className="flex items-center justify-between px-5 pt-8 pb-[15px]">
        <h2 className="text-xl font-semibold text-black">
          {isLoading ? '불러오는 중...' : (rule?.title ?? '-')}
        </h2>

        <button
          type="button"
          onClick={() => {
            if (!rule) return;
            navigate(`/rules/${rule.id}/edit`, {
              state: {
                rule: {
                  ...rule,
                  memo: rule.memo ?? '',
                  repeatDays: rule.repeatDays ?? '',
                },
              },
            });
          }}
          className="text-[#A3A3A3]"
        >
          <PencilLine className="h-6 w-6 transition-colors hover:text-black" />
        </button>
      </div>

      {/* 스크롤 영역 */}
      <div className="min-h-0 flex-1 overflow-y-auto px-5 pt-5 pb-7.5">
        <div className="flex flex-col gap-6">
          <DetailRow label="규칙 시간" value={ruleTimeLabel} />

          <DetailRow label="운영 요일" value={repeatDaysLabel} />

          <DetailRow label="메모" value={memoLabel} alignTop />

          <DetailRow label="집사 리포트" value={reportLabel} />
        </div>
      </div>

      <div className="shrink-0 p-5">
        <AppButton
          onClick={onNotify}
          disabled={isLoading || isError || (rule?.warningDisabled ?? false)}
          className="bg-black px-4 py-2 text-white disabled:bg-zinc-200 disabled:text-zinc-400"
        >
          {rule?.warningDisabled ? '접수 완료!' : '집사에게 알리기'}
        </AppButton>
      </div>
    </BottomSheet>
  );
};

export default RuleDetailSheet;

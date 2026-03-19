import { formatKoreanTime, parseRepeatDays } from '@/utils/ruleForm';

import AppButton from '@/components/common/AppButton';
import BottomSheet from '@/components/common/BottomSheet';
import { DetailRow } from '@/pages/todos/components/TodoDetailSheet';
import { PencilLine } from 'lucide-react';
import type { Rule } from '@/types/rules';
import { useNavigate } from 'react-router-dom';

type RuleDetailSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rule: Rule | null;
  onNotify?: () => void;
};

const RuleDetailSheet = ({
  open,
  onOpenChange,
  rule,
  onNotify,
}: RuleDetailSheetProps) => {
  const navigate = useNavigate();

  // 규칙 시간
  const formattedStartTime = rule?.startTime
    ? formatKoreanTime(rule.startTime)
    : null;
  const formattedEndTime = rule?.endTime
    ? formatKoreanTime(rule.endTime)
    : null;
  let ruleTimeLabel = '-';
  if (formattedStartTime && formattedEndTime) {
    ruleTimeLabel =
      formattedStartTime === formattedEndTime
        ? formattedStartTime
        : `${formattedStartTime} > ${formattedEndTime}`;
  }

  // 반복 요일
  const parsedRepeatDays = rule?.repeatDays
    ? parseRepeatDays(rule.repeatDays)
    : [];
  const repeatDaysLabel =
    parsedRepeatDays.length === 7
      ? '매일'
      : parsedRepeatDays.length > 0
        ? `매주 ${parsedRepeatDays.join(', ')}`
        : '매일';

  return (
    <BottomSheet
      open={open}
      onOpenChange={onOpenChange}
      className="rounded-t-[24px] [&>div:first-child]:my-[10px] [&>div:first-child]:h-[5px] [&>div:first-child]:w-20 [&>div:first-child]:rounded-[5px] [&>div:first-child]:bg-zinc-400"
    >
      <div className="flex items-center justify-between px-5 pt-8 pb-[15px]">
        <h2 className="text-xl font-semibold text-black">
          {rule?.title ?? '-'}
        </h2>

        <button
          type="button"
          onClick={() => {
            if (!rule) return;
            navigate(`/rules/${rule.id}/edit`, { state: { rule } });
          }}
          className="text-[#A3A3A3]"
        >
          <PencilLine className="h-6 w-6" />
        </button>
      </div>

      {/* 스크롤 영역 */}
      <div className="max-h-[250px] min-h-0 flex-1 overflow-y-auto px-5 pt-5 pb-7.5">
        <div className="flex flex-col gap-6">
          <DetailRow label="규칙 시간" value={ruleTimeLabel} />

          <DetailRow label="반복 요일" value={repeatDaysLabel} />

          <DetailRow label="메모" value={rule?.memo ?? '-'} alignTop />

          <DetailRow label="집사 리포트" value={'n회 누적'} />
        </div>
      </div>

      <div className="shrink-0 p-5">
        <AppButton
          onClick={onNotify}
          disabled={rule?.warningDisabled ?? false}
          className="bg-black px-4 py-2 text-white disabled:bg-zinc-200 disabled:text-zinc-400"
        >
          {rule?.warningDisabled ? '접수 완료!' : '집사에게 알리기'}
        </AppButton>
      </div>
    </BottomSheet>
  );
};

export default RuleDetailSheet;

import { Plus, Repeat2 } from 'lucide-react';
import {
  formatRuleRepeatDays,
  formatRuleTimeRange,
  parseRepeatDays,
} from '@/utils/ruleForm';

import { Button } from '@/components/ui/button';
import EmptyState from '@/components/common/EmptyState';
import { HEADER_HEIGHT } from '@/constants/layout';
import ListItemCard from '@/components/common/ListItemCard';
import ListSection from '@/components/common/ListSection';
import type { Rule } from '@/types/rules';
import RuleDetailSheet from '@/pages/rules/components/RuleDetailSheet';
import RuleNotifyButton from '@/pages/rules/components/RuleNotifyButton';
import RulesReportSection from '@/pages/rules/components/RulesReportSection';
import { mockRulesList } from '@/mocks/mockData';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const RulesPage = () => {
  const navigate = useNavigate();
  const [rules, setRules] = useState(mockRulesList);
  const [selectedRuleId, setSelectedRuleId] = useState<number | null>(null);
  const selectedRule: Rule | null =
    rules.find((rule) => rule.id === selectedRuleId) ?? null;
  const hasRules = rules.length > 0;

  const warningRules = rules.filter((rule) => rule.warningDisabled).slice(0, 3);

  const hasWarningRules = warningRules.length > 0;
  const backgroundGradient = hasRules
    ? hasWarningRules
      ? 'linear-gradient(180deg, #fff1f2 0%, #f4f4f5 37.3%)'
      : 'linear-gradient(180deg, #e9f3fd 0%, #f4f4f5 37.3%)'
    : undefined;

  const handleNotify = (ruleId: number) => {
    setRules((prev) =>
      prev.map((rule) =>
        rule.id === ruleId ? { ...rule, warningDisabled: true } : rule
      )
    );
  };

  return (
    <div
      className="min-h-dvh bg-zinc-100 px-[15px] pb-[15px]"
      style={{
        marginTop: -HEADER_HEIGHT,
        paddingTop: HEADER_HEIGHT,
        backgroundImage: backgroundGradient,
      }}
    >
      <div className="flex flex-col gap-7 pt-[15px]">
        <RulesReportSection rules={rules} warningRules={warningRules} />

        <ListSection
          title="우리집 규칙 리스트"
          right={
            <Button
              variant="link"
              onClick={() => navigate('/rules/new')}
              className="flex h-fit gap-[2px] p-0 text-zinc-400 hover:no-underline"
            >
              <span className="text-sm">규칙 추가하기</span>
              <Plus className="h-4 w-4" />
            </Button>
          }
        >
          {rules.length === 0 ? (
            <EmptyState
              message={
                <p>
                  공동생활의 첫걸음!
                  <br />
                  우리 집만의 규칙을 만들고
                  <br />
                  평화로운 공동생활을 시작해보세요!
                </p>
              }
            >
              <Button
                onClick={() => navigate('/rules/new')}
                className="h-12 w-full rounded-[10px] bg-zinc-800"
              >
                첫 규칙 만들기
              </Button>
            </EmptyState>
          ) : (
            <div className="flex flex-col gap-2">
              {rules.map((rule) => {
                const hasTimeRange = Boolean(rule.startTime && rule.endTime);
                const hasRepeatDays =
                  parseRepeatDays(rule.repeatDays ?? '').length > 0;
                const timeLabel = formatRuleTimeRange(
                  rule.startTime,
                  rule.endTime,
                  {
                    separator: ' - ',
                  }
                );
                const repeatDaysLabel = formatRuleRepeatDays(rule.repeatDays, {
                  joiner: '/',
                  prefix: '',
                });
                const shouldShowSubtitle = hasTimeRange || hasRepeatDays;

                return (
                  <ListItemCard
                    key={rule.id}
                    title={rule.title}
                    subtitle={
                      shouldShowSubtitle ? (
                        <div className="flex items-center gap-1 border-l-2 border-zinc-400 text-xs font-medium text-zinc-400">
                          <div className="flex flex-wrap items-center gap-1 pl-1">
                            {hasTimeRange && <span>{timeLabel}</span>}

                            {hasRepeatDays && (
                              <div className="flex gap-1">
                                <Repeat2 className="h-[15px] w-[15px]" />
                                <span>{repeatDaysLabel}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : undefined
                    }
                    onClick={() => setSelectedRuleId(rule.id)}
                    right={
                      <RuleNotifyButton
                        disabled={rule.warningDisabled}
                        onClick={() => handleNotify(rule.id)}
                      />
                    }
                  />
                );
              })}
            </div>
          )}
        </ListSection>
      </div>

      <RuleDetailSheet
        open={selectedRule !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedRuleId(null);
        }}
        rule={selectedRule}
        onNotify={() => {
          if (!selectedRule) return;
          handleNotify(selectedRule.id);
          setSelectedRuleId(null);
        }}
      />
    </div>
  );
};

export default RulesPage;

import { Button } from '@/components/ui/button';
import EmptyState from '@/components/common/EmptyState';
import { HEADER_HEIGHT } from '@/constants/layout';
import ListItemCard from '@/components/common/ListItemCard';
import ListSection from '@/components/common/ListSection';
import { Plus } from 'lucide-react';
import RuleNotifyButton from '@/pages/rules/components/RuleNotifyButton';
import RulesReportSection from '@/pages/rules/components/RulesReportSection';
import { mockRulesList } from '@/mocks/mockData';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const RulesPage = () => {
  const navigate = useNavigate();
  const [rules, setRules] = useState(mockRulesList);
  const hasRules = rules.length > 0;

  const warningRules = rules
    .filter((rule) => rule.disabled && rule.warnedAt)
    .sort((a, b) => (b.warnedAt ?? 0) - (a.warnedAt ?? 0))
    .slice(0, 3);

  const hasWarningRules = warningRules.length > 0;
  const backgroundGradient = hasRules
    ? hasWarningRules
      ? 'linear-gradient(180deg, #fff1f2 0%, #f4f4f5 37.3%)'
      : 'linear-gradient(180deg, #e9f3fd 0%, #f4f4f5 37.3%)'
    : undefined;

  const handleNotify = (ruleId: number) => {
    setRules((prev) =>
      prev.map((rule) =>
        rule.id === ruleId
          ? { ...rule, disabled: true, warnedAt: Date.now() }
          : rule
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
              {rules.map((rule) => (
                <ListItemCard
                  key={rule.id}
                  title={rule.title}
                  onClick={() => {
                    console.log('클릭');
                  }}
                  right={
                    <RuleNotifyButton
                      disabled={rule.disabled}
                      onClick={() => handleNotify(rule.id)}
                    />
                  }
                />
              ))}
            </div>
          )}
        </ListSection>
      </div>
    </div>
  );
};

export default RulesPage;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';

import EmptyState from '@/components/common/EmptyState';
import ListItemCard from '@/components/common/ListItemCard';
import ListSection from '@/components/common/ListSection';
import { Button } from '@/components/ui/button';
import { mockRulesList } from '@/mocks/mockData';
import RuleNotifyButton from '@/pages/rules/components/RuleNotifyButton';
import RulesReportSection from '@/pages/rules/components/RulesReportSection';

const RulesPage = () => {
  const navigate = useNavigate();
  const [rules, setRules] = useState(mockRulesList);

  const warningRules = rules
    .filter((rule) => rule.disabled && rule.warnedAt)
    .sort((a, b) => (b.warnedAt ?? 0) - (a.warnedAt ?? 0))
    .slice(0, 3);

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
    <div className="flex flex-col gap-7 px-[15px] pt-7.5">
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
          <EmptyState message="등록된 규칙이 없어요. 규칙을 추가해주세요!" />
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
  );
};

export default RulesPage;

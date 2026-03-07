import { MOTTO, mockRulesList } from '@/mocks/mockData';

import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EmptyState from '@/components/common/EmptyState';
import ListItemCard from '@/components/common/ListItemCard';
import ListSection from '@/components/common/ListSection';
import MottoSection from '@/pages/home/components/MottoSection';
import RuleNotifyButton from '@/pages/rules/components/RuleNotifyButton';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

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
    <div className="space-y-4 p-4">
      <MottoSection motto={MOTTO} />

      {warningRules.length > 0 && (
        <ListSection title="최근 경고 요인">
          {warningRules.map((rule) => (
            <ListItemCard
              key={rule.id}
              title={rule.title}
              left={<AlertTriangle className="h-8 w-8 text-yellow-400" />}
            />
          ))}
        </ListSection>
      )}

      <ListSection
        title="우리집 규칙 리스트"
        right={
          <Button
            variant="link"
            onClick={() => navigate('/rules/new')}
            className="hover:bg-accent-foreground/5 active:bg-accent-foreground/10 h-fit px-2 py-1 hover:no-underline"
          >
            규칙 추가하기
          </Button>
        }
      >
        {rules.length === 0 ? (
          <EmptyState message="등록된 규칙이 없어요. 규칙을 추가해주세요!" />
        ) : (
          rules.map((rule) => (
            <ListItemCard
              key={rule.id}
              title={rule.title}
              right={
                <RuleNotifyButton
                  disabled={rule.disabled}
                  onClick={() => handleNotify(rule.id)}
                />
              }
            />
          ))
        )}
      </ListSection>
    </div>
  );
};

export default RulesPage;

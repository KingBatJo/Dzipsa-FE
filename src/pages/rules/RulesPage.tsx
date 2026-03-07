import ListItemCard from '@/components/common/ListItemCard';
import ListSection from '@/components/common/ListSection';
import { MOTTO } from '@/mocks/mockData';
import MottoSection from '@/pages/home/components/MottoSection';
import RoundedBadge from '@/components/common/RoundedBadge';
import { cn } from '@/lib/utils';

type RoundedButtonProps = {
  disabled?: boolean;
};

const RuleNotifyButton = ({ disabled = false }: RoundedButtonProps) => {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => {
        console.log('클릭!');
      }}
      className="rounded-full disabled:cursor-default"
    >
      <RoundedBadge
        className={cn(
          'text-white',
          disabled
            ? 'bg-[#D4D4D4]'
            : 'bg-[#636363] hover:bg-slate-700 active:bg-slate-800'
        )}
      >
        집사에게 알리기
      </RoundedBadge>
    </button>
  );
};

const RulesPage = () => {
  return (
    <div className="space-y-4 p-4">
      <MottoSection motto={MOTTO} />

      <ListSection title="최근 경고 요인">
        <ListItemCard title="월요일은 다 먹는 날" />
        <ListItemCard title="3시 이후 샤워 금지" />
        <ListItemCard title="11시 이후 샤워 금지" />
      </ListSection>

      <ListSection title="우리집 규칙 리스트">
        <ListItemCard
          title="월요일은 다 먹는 날"
          right={<RuleNotifyButton disabled />}
        />
        <ListItemCard title="3시 이후 샤워 금지" right={<RuleNotifyButton />} />
        <ListItemCard
          title="11시 이후 샤워 금지"
          right={<RuleNotifyButton />}
        />
      </ListSection>
    </div>
  );
};

export default RulesPage;

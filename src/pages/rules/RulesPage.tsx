import { Plus, Repeat2 } from 'lucide-react';
import {
  formatRuleRepeatDays,
  formatRuleTimeRange,
  parseRepeatDays,
} from '@/utils/ruleForm';
import {
  useCreateRuleWarningMutation,
  useInfiniteRulesQuery,
  useRecentRuleWarningsQuery,
} from '@/api/rule/rule.query';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import EmptyState from '@/components/common/EmptyState';
import { HEADER_HEIGHT } from '@/constants/layout';
import ListItemCard from '@/components/common/ListItemCard';
import ListSection from '@/components/common/ListSection';
import RuleDetailSheet from '@/pages/rules/components/RuleDetailSheet';
import type { RuleId } from '@/api/rule/rule.types';
import RuleNotifyButton from '@/pages/rules/components/RuleNotifyButton';
import RulesReportSection from '@/pages/rules/components/RulesReportSection';
import { getApiErrorInfo } from '@/api/error';
import { toast } from 'sonner';
import { useInfiniteScrollObserver } from '@/hooks/useInfiniteScrollObserver';
import { useNavigate } from 'react-router-dom';

const RulesPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  const {
    data,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteRulesQuery();
  const rules = data?.pages.flat() ?? [];

  const { data: recentWarnings = [] } = useRecentRuleWarningsQuery();
  const { mutate: createRuleWarning } = useCreateRuleWarningMutation();
  const loadMoreRef = useInfiniteScrollObserver<HTMLDivElement>({
    hasNextPage,
    isFetching: isFetchingNextPage || isPending,
    onLoadMore: fetchNextPage,
    rootMargin: '0px 0px 40px 0px',
    threshold: 0,
  });

  const [selectedRuleId, setSelectedRuleId] = useState<RuleId | null>(null);
  const [notifyingRuleId, setNotifyingRuleId] = useState<RuleId | null>(null);

  const hasRules = rules.length > 0;

  const hasWarningRules = recentWarnings.length > 0;
  const backgroundGradient = hasRules
    ? hasWarningRules
      ? 'linear-gradient(180deg, #fff1f2 0%, #f4f4f5 37.3%)'
      : 'linear-gradient(180deg, #e9f3fd 0%, #f4f4f5 37.3%)'
    : undefined;

  const handleNotify = (ruleId: RuleId) => {
    setNotifyingRuleId(ruleId);

    createRuleWarning(ruleId, {
      onSuccess: () => {
        toast('집사에게 알리기를 보냈어요.');

        if (selectedRuleId === ruleId) {
          setSelectedRuleId(null);
        }
      },
      onError: (error: unknown) => {
        const apiError = getApiErrorInfo(error);

        if (apiError?.code === 440001) {
          toast('이미 24시간 내에 알리기를 보냈어요.');
          return;
        }

        toast(apiError?.message ?? '알리기에 실패했어요.');
      },
      onSettled: () => {
        setNotifyingRuleId(null);
      },
    });
  };

  return (
    <div
      className="bg-zinc-100 px-[15px] pb-[15px]"
      style={{
        marginTop: -HEADER_HEIGHT,
        paddingTop: HEADER_HEIGHT,
        backgroundImage: backgroundGradient,
      }}
    >
      <div className="flex flex-col gap-7 pt-[15px]">
        <RulesReportSection rules={rules} recentWarnings={recentWarnings} />

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
          {isPending ? (
            <div className="py-8 text-center text-sm text-zinc-500">
              규칙 목록을 불러오는 중...
            </div>
          ) : isError ? (
            <div className="py-8 text-center text-sm text-red-500">
              규칙 목록을 불러오지 못했어요.
            </div>
          ) : rules.length === 0 ? (
            <EmptyState>
              <p className="text-center text-sm font-semibold text-zinc-500">
                공동생활의 첫걸음!
                <br />
                우리 집만의 규칙을 만들고
                <br />
                평화로운 공동생활을 시작해보세요!
              </p>
              <Button
                onClick={() => navigate('/rules/new')}
                className="h-12 w-full rounded-[10px] bg-zinc-800"
              >
                첫 규칙 만들기
              </Button>
            </EmptyState>
          ) : (
            <>
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
                        <div className="flex flex-wrap items-center gap-1">
                          {hasTimeRange && <span>{timeLabel}</span>}

                          {hasRepeatDays && (
                            <div className="flex gap-1">
                              <Repeat2 className="h-[15px] w-[15px]" />
                              <span>{repeatDaysLabel}</span>
                            </div>
                          )}
                        </div>
                      ) : undefined
                    }
                    onClick={() => setSelectedRuleId(rule.id)}
                    right={
                      <RuleNotifyButton
                        disabled={
                          rule.warningDisabled || notifyingRuleId === rule.id
                        }
                        onClick={() => handleNotify(rule.id)}
                      />
                    }
                  />
                );
              })}

              {rules.length > 0 && (
                <div
                  ref={loadMoreRef}
                  className="flex h-12 items-center justify-center"
                >
                  {isFetchingNextPage ? (
                    <div className="py-3 text-center text-sm text-zinc-500">
                      디집사가 더 가져오고 있어요...
                    </div>
                  ) : null}
                </div>
              )}
            </>
          )}
        </ListSection>
      </div>

      {selectedRuleId !== null && (
        <RuleDetailSheet
          open={selectedRuleId !== null}
          onOpenChange={(open) => {
            if (!open) setSelectedRuleId(null);
          }}
          ruleId={selectedRuleId}
          onNotify={() => {
            handleNotify(selectedRuleId);
          }}
        />
      )}
    </div>
  );
};

export default RulesPage;

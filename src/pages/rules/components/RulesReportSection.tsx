import type {
  RecentRuleWarningResponse,
  RuleListItemResponse,
} from '@/api/rule/rule.types';

import type { CSSProperties } from 'react';
import ListSection from '@/components/common/ListSection';
import ReportBubble from '@/components/common/ReportBubble';
import dzipsaDefault from '@/assets/image/rule/rule-new.png';
import dzipsaPeaceful from '@/assets/image/rule/rule-no-warning.png';
import dzipsaWarning from '@/assets/image/rule/rule-warning.png';

type RulesReportSectionProps = {
  rules: RuleListItemResponse[];
  recentWarnings: RecentRuleWarningResponse[];
};

type ReportState = 'empty-rules' | 'no-warning' | 'with-warning';
type ShadowVariant = 'neutral' | 'sky' | 'red';

const getReportState = ({
  rules,
  recentWarnings,
}: RulesReportSectionProps): ReportState => {
  if (recentWarnings.length > 0) return 'with-warning';
  if (rules.length > 0) return 'no-warning';
  return 'empty-rules';
};

const WarningText = ({ title, body }: { title: string; body: string }) => {
  return (
    <p className="text-[13px] leading-[1.35] font-semibold text-zinc-600">
      <span className="font-bold text-red-400">'{title}' </span>
      <span>{body}</span>
    </p>
  );
};

const RulesReportSection = ({
  rules,
  recentWarnings,
}: RulesReportSectionProps) => {
  const reportState = getReportState({ rules, recentWarnings });
  const isWarningMode = reportState === 'with-warning';

  const reportAvatarImage =
    reportState === 'with-warning'
      ? dzipsaWarning
      : reportState === 'no-warning'
        ? dzipsaPeaceful
        : dzipsaDefault;

  const shadowKind: ShadowVariant =
    reportState === 'with-warning'
      ? 'red'
      : reportState === 'no-warning'
        ? 'sky'
        : 'neutral';

  const shadowStyle = {
    '--report-shadow': `var(--shadow-surface-${shadowKind})`,
    '--report-shadow-drop': `var(--shadow-surface-${shadowKind}-drop)`,
  } as CSSProperties;

  return (
    <ListSection title="집사 리포트">
      {isWarningMode ? (
        <div className="flex min-w-0 flex-col gap-3">
          {recentWarnings.slice(0, 3).map((warning, index) => (
            <div key={warning.id} className="flex min-w-0 items-start gap-3">
              {index === 0 ? (
                <div className="h-[58px] w-[58px] shrink-0">
                  <img
                    src={reportAvatarImage}
                    alt="디집사 경고"
                    className="h-full w-full object-contain"
                  />
                </div>
              ) : (
                <div className="w-[58px] shrink-0" aria-hidden />
              )}

              <ReportBubble showPointer={index === 0} shadowStyle={shadowStyle}>
                <WarningText
                  title={warning.ruleTitle}
                  body={
                    index === 0
                      ? '규칙이 지켜지지 않아 곤란해요. 구성원을 위해 즉시 규칙을 다시 확인해주세요.'
                      : index === 1
                        ? '규칙 준수가 필요해요. 공동 생활의 약속이니 꼭 지켜주세요!'
                        : '규칙이 지켜지지 않고 있어요. 모두가 편하게 지낼 수 있도록 조금만 더 신경 써주세요!'
                  }
                />
              </ReportBubble>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex min-w-0 items-start gap-3">
          <div className="h-[58px] w-[58px] shrink-0">
            <img
              src={reportAvatarImage}
              alt="디집사 캐릭터"
              className="h-full w-full object-contain"
            />
          </div>

          <ReportBubble showPointer shadowStyle={shadowStyle}>
            {reportState === 'no-warning' ? (
              <p className="text-[13px] leading-[1.35] font-semibold text-zinc-600">
                평화로운 우리 집, 집사가 지켜보고 있어요!
                <br />
                모든 규칙이 잘 지켜지고 있네요.
                <br />
                오늘도 쾌적한 하루 보내세요!
              </p>
            ) : (
              <p className="text-[13px] leading-[1.35] font-semibold text-zinc-600">
                조심스러운 말은 제가 대신 할게요.
                <br />
                지켜지지 않은 규칙, 집사가 전해드려요.
              </p>
            )}
          </ReportBubble>
        </div>
      )}
    </ListSection>
  );
};

export default RulesReportSection;

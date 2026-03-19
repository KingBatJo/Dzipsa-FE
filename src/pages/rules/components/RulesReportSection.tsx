import type { CSSProperties } from 'react';
import ListSection from '@/components/common/ListSection';
import ReportBubble from '@/components/common/ReportBubble';
import type { Rule } from '@/types/rules';
import alertMegaphone from '@/assets/dzipsa/alert-megaphone.svg';
import dzipsaDefault from '@/assets/dzipsa/dzipsa-default.svg';
import dzipsaPeaceful from '@/assets/dzipsa/dzipsa-peaceful.svg';

type RulesReportSectionProps = {
  rules: Rule[];
  warningRules: Rule[];
};

type ReportState = 'empty-rules' | 'no-warning' | 'with-warning';
type ShadowVariant = 'neutral' | 'sky' | 'red';

const getReportState = ({
  rules,
  warningRules,
}: RulesReportSectionProps): ReportState => {
  if (warningRules.length > 0) return 'with-warning';
  if (rules.length > 0) return 'no-warning';
  return 'empty-rules';
};

const WarningText = ({ title, body }: { title: string; body: string }) => {
  return (
    <p className="text-xs font-semibold text-zinc-600">
      <span className="font-bold text-red-400">'{title}'</span>
      <span>{body}</span>
    </p>
  );
};

const RulesReportSection = ({
  rules,
  warningRules,
}: RulesReportSectionProps) => {
  const reportState = getReportState({ rules, warningRules });
  const isWarningMode = reportState === 'with-warning';
  const reportAvatarImage =
    reportState === 'no-warning' ? dzipsaPeaceful : dzipsaDefault;
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
      <div className="flex gap-4">
        <div className="relative h-16.5 w-16.5 shrink-0">
          <img
            src={reportAvatarImage}
            alt="집사 캐릭터"
            className="h-full w-full object-contain"
          />
          {isWarningMode && (
            <span className="absolute -right-2 -bottom-0.5 flex items-center justify-center rounded-full">
              <img
                src={alertMegaphone}
                alt="경고 알림"
                className="h-9 w-9 object-contain"
              />
            </span>
          )}
        </div>

        {isWarningMode ? (
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            {warningRules.map((rule, index) => (
              <ReportBubble
                key={rule.id}
                showPointer={index === 0}
                shadowStyle={shadowStyle}
              >
                <WarningText
                  title={rule.title}
                  body={
                    index === 0
                      ? ' 규칙이 지켜지지 않아 곤란해요. 구성원을 위해 즉시 규칙을 다시 확인해주세요.'
                      : index === 1
                        ? ' 규칙 준수가 필요해요. 공동 생활의 약속이니 꼭 지켜주세요!'
                        : ' 규칙이 지켜지지 않고 있어요. 모두가 편하게 지낼 수 있도록 함께 신경 써주세요!'
                  }
                />
              </ReportBubble>
            ))}
          </div>
        ) : (
          <div className="min-w-0 flex-1 text-xs text-zinc-600">
            <ReportBubble showPointer shadowStyle={shadowStyle}>
              {reportState === 'no-warning' ? (
                <p>
                  평화로운 우리 집, 집사가 지켜보고 있어요!
                  <br />
                  모든 규칙이 잘 지켜지고 있네요.
                  <br />
                  오늘도 쾌적한 하루 보내세요!
                </p>
              ) : (
                <p>
                  조심스러운 말은 제가 대신 할게요.
                  <br />
                  지켜지지 않은 규칙, 집사가 전해드려요.
                </p>
              )}
            </ReportBubble>
          </div>
        )}
      </div>
    </ListSection>
  );
};

export default RulesReportSection;

import { useEffect, useState } from 'react';

import AgeConfirmDialog from './AgeConfirmDialog';
import BottomSheet from '@/components/common/BottomSheet';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type PendingAction = 'age' | 'all' | null;

type TermsAgreementSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isSubmitting?: boolean;
  onAgree: () => void;
};

const TermsAgreementSheet = ({
  open,
  onOpenChange,
  isSubmitting,
  onAgree,
}: TermsAgreementSheetProps) => {
  const navigate = useNavigate();

  const [agreements, setAgreements] = useState({
    age: false,
    service: false,
    privacy: false,
  });

  const [ageConfirmOpen, setAgeConfirmOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);

  const isAllChecked =
    agreements.age && agreements.service && agreements.privacy;
  const isSubmitDisabled = !isAllChecked || isSubmitting;

  // 모든 약관 체크 상태 초기화
  const resetAgreements = () => {
    setAgreements({
      age: false,
      service: false,
      privacy: false,
    });
  };

  // 모두 동의 체크/해제
  const handleAllCheckedChange = (checked: boolean) => {
    if (!checked) {
      resetAgreements();
      return;
    }

    if (!agreements.age) {
      setPendingAction('all');
      setAgeConfirmOpen(true);
      return;
    }

    setAgreements({
      age: checked,
      service: checked,
      privacy: checked,
    });
  };

  // 나이 체크/해제
  const handleAgeCheckedChange = (checked: boolean) => {
    if (!checked) {
      setAgreements((prev) => ({
        ...prev,
        age: false,
      }));
      return;
    }

    setPendingAction('age');
    setAgeConfirmOpen(true);
  };

  // AgeConfirmDialog에서 확인 클릭 시
  const handleAgeConfirm = () => {
    if (pendingAction === 'age') {
      updateAgreement('age', true);
    }

    if (pendingAction === 'all') {
      setAgreements({
        age: true,
        service: true,
        privacy: true,
      });
    }

    setAgeConfirmOpen(false);
    setPendingAction(null);
  };

  // AgeConfirmDialog에서 취소 클릭 시
  const handleAgeConfirmCancel = () => {
    setAgeConfirmOpen(false);
    setPendingAction(null);
  };

  // 특정 약관 항목 체크 상태 업데이트
  const updateAgreement = (
    key: 'age' | 'service' | 'privacy',
    checked: boolean
  ) => {
    setAgreements((prev) => ({
      ...prev,
      [key]: checked,
    }));
  };

  useEffect(() => {
    if (!open) {
      resetAgreements();
      setAgeConfirmOpen(false);
      setPendingAction(null);
    }
  }, [open]);

  return (
    <>
      <BottomSheet open={open} onOpenChange={onOpenChange} dismissible={false}>
        <div className="flex h-full flex-col justify-between gap-3 px-5 pt-6 pb-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg leading-6 font-semibold break-keep">
              최종적으로 서비스 가입을 위해
              <br />
              약관에 동의해 주세요
            </h2>

            <p className="text-xs font-semibold break-keep text-[#BCBCBC]">
              서비스 가입을 완료하지 않고 종료하실 경우, 원활한 가입 지원을 위해
              임시 저장된 SNS 연동 정보는 7일간 보관 후 즉시 자동 파기됩니다.
            </p>
          </div>

          <div className="flex flex-col gap-4.5 text-sm font-medium">
            {/* 모두 동의 */}
            <label className="bg-secondary flex items-center gap-3 rounded-[10px] px-4 py-3">
              <Checkbox
                checked={isAllChecked}
                onCheckedChange={(checked) =>
                  handleAllCheckedChange(checked === true)
                }
                disabled={isSubmitting}
                className="border-neutral-200 bg-white"
              />
              <span>모두 동의하기</span>
            </label>

            {/* 만 14세 이상 */}
            <label className="flex items-center gap-3 px-4">
              <Checkbox
                checked={agreements.age}
                onCheckedChange={(checked) =>
                  handleAgeCheckedChange(checked === true)
                }
                disabled={isSubmitting}
                className="border-neutral-200"
              />
              <span>[필수] 만 14세 이상입니다</span>
            </label>

            {/* 서비스 이용약관 */}
            <div className="flex items-center gap-3 px-4">
              <Checkbox
                checked={agreements.service}
                onCheckedChange={(checked) =>
                  updateAgreement('service', checked === true)
                }
                disabled={isSubmitting}
                className="border-neutral-200"
              />

              <Button
                type="button"
                variant="link"
                onClick={() => navigate('/signup/terms/service')}
                className="group flex h-fit w-full items-center justify-between p-0"
              >
                <span>[필수] 디집사 서비스 이용약관</span>
                <ChevronRight className="text-muted-foreground group-hover:text-primary h-4 w-4" />
              </Button>
            </div>

            {/* 개인정보 처리방침 */}
            <div className="flex items-center gap-3 px-4">
              <Checkbox
                checked={agreements.privacy}
                onCheckedChange={(checked) =>
                  updateAgreement('privacy', checked === true)
                }
                disabled={isSubmitting}
                className="border-neutral-200"
              />

              <Button
                type="button"
                variant="link"
                onClick={() => navigate('/signup/terms/privacy')}
                className="group flex h-fit w-full items-center justify-between p-0"
              >
                <span>[필수] 디집사 개인정보 처리방침</span>
                <ChevronRight className="text-muted-foreground group-hover:text-primary h-4 w-4" />
              </Button>
            </div>
          </div>

          <Button
            disabled={isSubmitDisabled}
            onClick={onAgree}
            className="h-12"
          >
            동의하고 시작하기
          </Button>
        </div>
      </BottomSheet>

      <AgeConfirmDialog
        open={ageConfirmOpen}
        onCancel={handleAgeConfirmCancel}
        onConfirm={handleAgeConfirm}
      />
    </>
  );
};

export default TermsAgreementSheet;

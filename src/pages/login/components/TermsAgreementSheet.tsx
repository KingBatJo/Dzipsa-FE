import { useEffect, useState } from 'react';

import BottomSheet from '@/components/common/BottomSheet';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

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
  const [ageChecked, setAgeChecked] = useState(false);
  const [serviceChecked, setServiceChecked] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);

  const isAllChecked = ageChecked && serviceChecked && privacyChecked;
  const isSubmitDisabled = !isAllChecked || isSubmitting;

  const handleAllCheckedChange = (checked: boolean) => {
    setAgeChecked(checked);
    setServiceChecked(checked);
    setPrivacyChecked(checked);
  };

  useEffect(() => {
    if (!open) {
      setAgeChecked(false);
      setServiceChecked(false);
      setPrivacyChecked(false);
    }
  }, [open]);

  return (
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
              checked={ageChecked}
              onCheckedChange={(checked) => setAgeChecked(checked === true)}
              disabled={isSubmitting}
              className="border-neutral-200"
            />
            <span>[필수] 만 14세 이상입니다</span>
          </label>

          {/* 서비스 이용약관 */}
          <label className="flex items-center gap-3 px-4">
            <Checkbox
              checked={serviceChecked}
              onCheckedChange={(checked) => setServiceChecked(checked === true)}
              disabled={isSubmitting}
              className="border-neutral-200"
            />
            <span>[필수] 디집사 서비스 이용약관</span>
          </label>

          {/* 개인정보 처리방침 */}
          <label className="flex items-center gap-3 px-4">
            <Checkbox
              checked={privacyChecked}
              onCheckedChange={(checked) => setPrivacyChecked(checked === true)}
              disabled={isSubmitting}
              className="border-neutral-200"
            />
            <span>[필수] 디집사 개인정보 처리방침</span>
          </label>
        </div>

        <Button disabled={isSubmitDisabled} onClick={onAgree} className="h-12">
          동의하고 시작하기
        </Button>
      </div>
    </BottomSheet>
  );
};

export default TermsAgreementSheet;

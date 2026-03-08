import { useEffect, useState } from 'react';

import BottomSheet from '@/components/common/BottomSheet';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

type TermsAgreementSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const TermsAgreementSheet = ({
  open,
  onOpenChange,
}: TermsAgreementSheetProps) => {
  const [serviceChecked, setServiceChecked] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);

  const isAllChecked = serviceChecked && privacyChecked;
  const isSubmitDisabled = !isAllChecked;

  const handleAllCheckedChange = (checked: boolean) => {
    setServiceChecked(checked);
    setPrivacyChecked(checked);
  };

  useEffect(() => {
    if (!open) {
      setServiceChecked(false);
      setPrivacyChecked(false);
    }
  }, [open]);

  return (
    <BottomSheet open={open} onOpenChange={onOpenChange} className="h-[330px]">
      <div className="flex h-full flex-col justify-between px-5 pt-4 pb-8">
        <h2 className="text-lg leading-6 font-semibold break-keep">
          최종적으로 서비스 가입을 위해
          <br />
          약관에 동의해 주세요
        </h2>

        <div className="flex flex-col gap-[18px] text-sm font-medium">
          <label className="bg-secondary flex items-center gap-3 rounded-[10px] px-4 py-3">
            <Checkbox
              checked={isAllChecked}
              onCheckedChange={(checked) =>
                handleAllCheckedChange(checked === true)
              }
              className="border-neutral-200"
            />
            <span>모두 동의하기</span>
          </label>

          <label className="flex items-center gap-3 px-4">
            <Checkbox
              checked={serviceChecked}
              onCheckedChange={(checked) => setServiceChecked(checked === true)}
              className="border-neutral-200"
            />
            <span>[필수] 디집사 서비스 이용약관</span>
          </label>

          <label className="flex items-center gap-3 px-4">
            <Checkbox
              checked={privacyChecked}
              onCheckedChange={(checked) => setPrivacyChecked(checked === true)}
              className="border-neutral-200"
            />
            <span>[필수] 디집사 개인정보 처리방침</span>
          </label>
        </div>

        <Button disabled={isSubmitDisabled} className="h-12">
          동의하고 시작하기
        </Button>
      </div>
    </BottomSheet>
  );
};

export default TermsAgreementSheet;

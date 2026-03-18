import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import TermsAgreementSheet from '@/pages/login/components/TermsAgreementSheet';
import { getApiErrorMessage } from '@/api/error';
import { toast } from 'sonner';
import { useAgreeToTermsMutation } from '@/api/auth/auth.query';
import { useState } from 'react';

export type Agreements = {
  age: boolean;
  service: boolean;
  privacy: boolean;
};

const TermsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mutateAsync: agreeToTermsMutate, isPending } =
    useAgreeToTermsMutation();

  const [agreements, setAgreements] = useState<Agreements>({
    age: false,
    service: false,
    privacy: false,
  });

  const isDetailPage = location.pathname !== '/signup/terms';

  const handleAgree = async () => {
    try {
      await agreeToTermsMutate();

      navigate('/signup/complete', { replace: true });
    } catch (error) {
      const message = getApiErrorMessage(error);
      console.error('이용약관 동의 처리 실패: ', message, error);
      toast(message || '이용약관 동의 처리에 실패했어요. 다시 시도해주세요.');
    }
  };

  return (
    <>
      {!isDetailPage && (
        <TermsAgreementSheet
          open={true}
          onOpenChange={(open) => {
            if (!open) {
              navigate(-1);
            }
          }}
          isSubmitting={isPending}
          agreements={agreements}
          onChangeAgreements={setAgreements}
          onAgree={handleAgree}
        />
      )}

      <Outlet />
    </>
  );
};

export default TermsPage;

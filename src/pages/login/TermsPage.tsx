import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import TermsAgreementSheet from '@/pages/login/components/TermsAgreementSheet';
import { agreeToTerms } from '@/api/auth/auth.api';
import { getApiErrorMessage } from '@/api/error';
import { toast } from 'sonner';
import { useAuthStore } from '@/stores/auth.store';
import { useState } from 'react';

export type Agreements = {
  age: boolean;
  service: boolean;
  privacy: boolean;
};

const TermsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const updateUser = useAuthStore((state) => state.updateUser);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreements, setAgreements] = useState<Agreements>({
    age: false,
    service: false,
    privacy: false,
  });

  const isDetailPage = location.pathname !== '/signup/terms';

  const handleAgree = async () => {
    try {
      setIsSubmitting(true);

      await agreeToTerms();

      updateUser({ termsAgreed: true });

      navigate('/signup/complete', { replace: true });
    } catch (error) {
      const message = getApiErrorMessage(error);
      console.error(message);
      toast(message || '이용약관 동의 처리에 실패했어요. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
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
          isSubmitting={isSubmitting}
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

import TermsAgreementSheet from '@/pages/login/components/TermsAgreementSheet';
import { agreeToTerms } from '@/api/auth/auth.api';
import { getApiErrorMessage } from '@/api/error';
import { toast } from 'sonner';
import { useAuthStore } from '@/stores/auth.store';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const TermsPage = () => {
  const navigate = useNavigate();
  const updateUser = useAuthStore((state) => state.updateUser);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    <TermsAgreementSheet
      open={true}
      onOpenChange={(open) => {
        if (!open) {
          navigate(-1);
        }
      }}
      isSubmitting={isSubmitting}
      onAgree={handleAgree}
    />
  );
};

export default TermsPage;

import TermsAgreementSheet from '@/pages/login/components/TermsAgreementSheet';
import { useNavigate } from 'react-router-dom';

const TermsPage = () => {
  const navigate = useNavigate();

  return (
    <TermsAgreementSheet
      open={true}
      onOpenChange={(open) => {
        if (!open) {
          navigate(-1);
        }
      }}
      onAgree={() => navigate('/signup/complete', { replace: true })}
    />
  );
};

export default TermsPage;

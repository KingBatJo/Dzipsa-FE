import { Navigate, useNavigate, useParams } from 'react-router-dom';

import BackHeader from '@/components/layout/BackHeader';
import { TERMS_CONTENT } from '@/pages/login/terms-contents';

export type TermsType = 'service' | 'privacy';

const TermsDetailPage = () => {
  const navigate = useNavigate();

  const { type } = useParams<{ type: TermsType }>();

  if (!type || !(type in TERMS_CONTENT)) {
    return <Navigate to="/signup/terms" replace />;
  }

  const term = TERMS_CONTENT[type as TermsType];

  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <BackHeader
        onBack={() => {
          navigate(-1);
        }}
        title={term.title}
      />

      <main className="flex-1 overflow-y-auto px-[29px] pt-4 pb-[58px]">
        <article className="text-xs font-normal whitespace-pre-wrap">
          {term.content}
        </article>
      </main>
    </div>
  );
};

export default TermsDetailPage;

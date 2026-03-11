import { Check, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { HEADER_HEIGHT_CLASS } from '@/constants/layout';
import { useNavigate } from 'react-router-dom';

type FormPageLayoutProps = {
  title: string;
  top?: React.ReactNode;
  bottom?: React.ReactNode;
  onSubmit: () => void;
  submitDisabled?: boolean;
};

const FormPageLayout = ({
  title,
  top,
  bottom,
  onSubmit,
  submitDisabled = false,
}: FormPageLayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-dvh">
      <header
        className={`flex items-center justify-between px-4 ${HEADER_HEIGHT_CLASS}`}
      >
        <Button
          type="button"
          variant="ghost"
          onClick={() => navigate(-1)}
          aria-label="닫기"
          className="flex h-8 w-8"
        >
          <X className="h-5 w-5" />
        </Button>

        <h1 className="text-lg font-semibold">{title}</h1>

        <Button
          type="button"
          variant="ghost"
          onClick={onSubmit}
          disabled={submitDisabled}
          aria-label="완료"
          className="flex h-8 w-8"
        >
          <Check className="h-5 w-5" />
        </Button>
      </header>

      <section>
        <div className="px-4 pt-[30px]">{top}</div>

        <div className="my-[30px] h-3 bg-neutral-100" />

        <div className="px-4">{bottom}</div>
      </section>
    </div>
  );
};

export default FormPageLayout;

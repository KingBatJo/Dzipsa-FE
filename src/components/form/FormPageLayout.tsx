import { Check, X } from 'lucide-react';
import {
  FORM_HEADER_HEIGHT,
  FORM_HEADER_HEIGHT_CLASS,
  MOBILE_MAX_WIDTH,
} from '@/constants/layout';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

type FormPageLayoutProps = {
  title: string;
  children: React.ReactNode;
  onSubmit: () => void;
  submitDisabled?: boolean;
};

const FormPageLayout = ({
  title,
  children,
  onSubmit,
  submitDisabled = false,
}: FormPageLayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-dvh">
      <header
        className={cn(
          'fixed top-0 flex w-full items-center justify-between bg-white p-[15px] backdrop-blur-xl',
          MOBILE_MAX_WIDTH,
          FORM_HEADER_HEIGHT_CLASS
        )}
      >
        <Button
          type="button"
          variant="ghost"
          onClick={() => navigate(-1)}
          aria-label="닫기"
          className="flex h-[24px] w-[24px] p-0"
        >
          <X className="h-full w-full" />
        </Button>

        <h1 className="text-lg font-semibold">{title}</h1>

        <Button
          type="button"
          variant="ghost"
          onClick={onSubmit}
          disabled={submitDisabled}
          aria-label="완료"
          className="flex h-[24px] w-[24px] p-0"
        >
          <Check className="h-full w-full" />
        </Button>
      </header>

      <section style={{ paddingTop: FORM_HEADER_HEIGHT }}>{children}</section>
    </div>
  );
};

export default FormPageLayout;

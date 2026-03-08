import { Check, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { HEADER_HEIGHT_CLASS } from '@/constants/layout';
import { useNavigate } from 'react-router-dom';

const RuleCreatePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-dvh px-4">
      <header
        className={`flex items-center justify-between ${HEADER_HEIGHT_CLASS}`}
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

        <h1 className="text-lg font-semibold">규칙 추가</h1>

        <Button
          type="button"
          variant="ghost"
          onClick={() => {
            console.log('완료');
          }}
          aria-label="완료"
          className="flex h-8 w-8"
        >
          <Check className="h-5 w-5" />
        </Button>
      </header>

      <div className="pt-4">
        <div className="">규칙 추가 폼</div>
      </div>
    </div>
  );
};

export default RuleCreatePage;

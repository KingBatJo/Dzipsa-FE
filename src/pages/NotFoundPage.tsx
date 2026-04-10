import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">404 Page Not Found</h1>
      <p className="mt-2">요청하신 페이지를 찾을 수 없습니다.</p>

      <Button variant="default" asChild>
        <Link to="/" className="mt-4 inline-flex">
          메인으로 이동
        </Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;

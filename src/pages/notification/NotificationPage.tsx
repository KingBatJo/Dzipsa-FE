import { ChevronLeft } from 'lucide-react';
import notiEmpty from '@/assets/image/noti/noti_empty.png';
import { useNavigate } from 'react-router-dom';
const NotificationPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-dvh bg-zinc-100">
      <header className="flex items-center gap-3 p-[15px]">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="뒤로가기"
          className="flex h-6 w-6 items-center justify-center"
        >
          <ChevronLeft className="h-6 w-6 text-zinc-900" />
        </button>

        <h1 className="text-lg leading-normal font-semibold text-zinc-900">
          디집사 알림
        </h1>
      </header>

      <section className="px-[15px] pt-[204px]">
        <div className="flex flex-col items-center gap-1 text-center">
          <img
            src={notiEmpty}
            alt="알림 없음"
            className="h-[191px] w-[191px] object-contain"
          />

          <div className="flex flex-col items-center gap-1">
            <p className="text-[20px] leading-[1.3] font-semibold text-zinc-900">
              새로운 알림이 없어요 !
            </p>
            <p className="text-sm leading-[1.3] font-semibold text-zinc-400">
              알림이 오면 디집사가 알려드릴게요
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotificationPage;

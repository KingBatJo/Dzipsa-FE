import Header from '@/components/common/Header';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div className="relative min-h-dvh">
      {/* 상단 영역(임시) 그라데이션 레이어 */}
      <div className="absolute inset-x-0 h-[80dvh] bg-linear-to-b from-[#C7C7C7] to-white" />

      <Header />

      <main className="relative min-h-dvh pt-14">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;

import Header from '@/components/common/Header';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div className="relative min-h-dvh">
      {/* 상단 3/4 영역(임시) 그라데이션 레이어 */}
      <div className="absolute inset-x-0 h-3/4 bg-linear-to-b from-[#C7C7C7] to-white" />

      <Header />

      <main className="relative pt-14">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;

import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <>
      <header>헤더</header>

      <main className="p-4">
        <Outlet />
      </main>
    </>
  );
};

export default AppLayout;

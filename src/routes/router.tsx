import { Route, Routes } from 'react-router-dom';

import AppLayout from '@/layouts/AppLayout';
import AuthCallbackPage from '@/pages/AuthCallbackPage';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/login/LoginPage';
import NotFoundPage from '@/pages/NotFoundPage';
import RootLayout from '@/layouts/RootLayout';

const Router = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        {/* 헤더 포함 */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>

        {/* 헤더 미포함 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth/callback/:provider" element={<AuthCallbackPage />} />

        {/* 404 페이지 */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default Router;

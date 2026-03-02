import { Route, Routes } from 'react-router-dom';

import AuthCallbackPage from '@/pages/AuthCallbackPage';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/login/LoginPage';
import RootLayout from '@/layouts/RootLayout';

const Router = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth/callback/:provider" element={<AuthCallbackPage />} />
      </Route>
    </Routes>
  );
};

export default Router;

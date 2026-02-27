import { Route, Routes } from 'react-router-dom';

import AuthCallbackPage from '@/pages/AuthCallbackPage';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/login/LoginPage';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/auth/callback" element={<AuthCallbackPage />} />
    </Routes>
  );
};

export default Router;

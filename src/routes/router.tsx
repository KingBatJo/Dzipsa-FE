import { Navigate, Route, Routes } from 'react-router-dom';

import AppLayout from '@/components/layout/AppLayout';
import AuthCallbackPage from '@/pages/login/AuthCallbackPage';
import CreateHousePage from '@/pages/onboarding/CreateHousePage';
import HomePage from '@/pages/home/HomePage';
import JoinHousePage from '@/pages/onboarding/JoinHousePage';
import LoginPage from '@/pages/login/LoginPage';
import MyPage from '@/pages/mypage/MyPage';
import NotFoundPage from '@/pages/NotFoundPage';
import NotificationPage from '@/pages/notification/NotificationPage';
import OnboardingPage from '@/pages/onboarding/OnboardingPage';
import RootLayout from '@/components/layout/RootLayout';
import RuleCreatePage from '@/pages/rules/RuleCreatePage';
import RulesPage from '@/pages/rules/RulesPage';
import SignupCompletePage from '@/pages/login/SignupCompletePage';
import { TODO_TABS } from '@/constants/todos';
import TodoCreatePage from '@/pages/todos/TodoCreatePage';
import TodosPage from '@/pages/todos/TodosPage';

const Router = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        {/* 첫 진입 */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* 헤더 포함 */}
        <Route element={<AppLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route
            path="/todos"
            element={<Navigate to={`/todos/${TODO_TABS.MY}`} replace />}
          />
          <Route path="/todos/:tab" element={<TodosPage />} />
          <Route path="/rules" element={<RulesPage />} />
        </Route>

        {/* 헤더 미포함 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth/callback/:provider" element={<AuthCallbackPage />} />
        <Route path="/signup/complete" element={<SignupCompletePage />} />

        {/* 온보딩 */}
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/onboarding/create" element={<CreateHousePage />} />
        <Route path="/onboarding/join" element={<JoinHousePage />} />

        <Route path="/notifications" element={<NotificationPage />} />
        <Route path="/mypage" element={<MyPage />} />

        <Route path="/rules/new" element={<RuleCreatePage />} />
        <Route path="/todos/new" element={<TodoCreatePage />} />

        {/* 404 페이지 */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default Router;

import { Navigate, Route, Routes } from 'react-router-dom';

import AppEntryRoute from '@/routes/AppEntryRoute';
import AppLayout from '@/components/layout/AppLayout';
import AuthCallbackPage from '@/pages/login/AuthCallbackPage';
import AuthInitializer from './AuthInitializer';
import CreateHousePage from '@/pages/onboarding/CreateHousePage';
import HomePage from '@/pages/home/HomePage';
import JoinHousePage from '@/pages/onboarding/JoinHousePage';
import LoginPage from '@/pages/login/LoginPage';
import MyPage from '@/pages/mypage/MyPage';
import NotFoundPage from '@/pages/NotFoundPage';
import NotificationPage from '@/pages/notification/NotificationPage';
import OnboardingPage from '@/pages/onboarding/OnboardingPage';
import ProtectedRoute from '@/routes/ProtectedRoute';
import PublicOnlyRoute from '@/routes/PublicOnlyRoute';
import RootLayout from '@/components/layout/RootLayout';
import RootRedirect from '@/routes/RootRedirect';
import RuleCreatePage from '@/pages/rules/RuleCreatePage';
import RulesPage from '@/pages/rules/RulesPage';
import SignupCompletePage from '@/pages/login/SignupCompletePage';
import { TODO_TABS } from '@/constants/todos';
import TermsPage from '@/pages/login/TermsPage';
import TodosPage from '@/pages/todos/TodosPage';

const Router = () => {
  return (
    <Routes>
      <Route element={<AuthInitializer />}>
        <Route element={<RootLayout />}>
          {/* 첫 진입 */}
          <Route path="/" element={<RootRedirect />} />

          <Route element={<PublicOnlyRoute />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>
          <Route path="/auth/callback" element={<AuthCallbackPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/signup/terms" element={<TermsPage />} />
            <Route path="/signup/complete" element={<SignupCompletePage />} />

            {/* 온보딩 */}
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/onboarding/create" element={<CreateHousePage />} />
            <Route path="/onboarding/join" element={<JoinHousePage />} />

            <Route element={<AppEntryRoute />}>
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

              <Route path="/notifications" element={<NotificationPage />} />
              <Route path="/mypage" element={<MyPage />} />

              <Route path="/rules/new" element={<RuleCreatePage />} />
            </Route>
          </Route>

          {/* 404 페이지 */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;

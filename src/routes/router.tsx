import { Navigate, Route, Routes } from 'react-router-dom';

import AppEntryRoute from '@/routes/AppEntryRoute';
import AppLayout from '@/components/layout/AppLayout';
import AuthCallbackPage from '@/pages/login/AuthCallbackPage';
import AuthInitializer from '@/routes/AuthInitializer';
import CreateHousePage from '@/pages/onboarding/CreateHousePage';
import HomePage from '@/pages/home/HomePage';
import JoinHousePage from '@/pages/onboarding/JoinHousePage';
import LoginPage from '@/pages/login/LoginPage';
import MyPage from '@/pages/mypage/MyPage';
import NotFoundPage from '@/pages/NotFoundPage';
import NotificationPage from '@/pages/notification/NotificationPage';
import OnboardingPage from '@/pages/onboarding/OnboardingPage';
import OnboardingRoute from '@/routes/OnboardingRoute';
import ProtectedRoute from '@/routes/ProtectedRoute';
import PublicOnlyRoute from '@/routes/PublicOnlyRoute';
import RoomInvitationPage from '@/pages/mypage/RoomInvitationPage';
import RootLayout from '@/components/layout/RootLayout';
import RootRedirect from '@/routes/RootRedirect';
import RuleCreatePage from '@/pages/rules/RuleCreatePage';
import RulesPage from '@/pages/rules/RulesPage';
import SignupCompletePage from '@/pages/login/SignupCompletePage';
import { TODO_TABS } from '@/constants/todos';
import TermsDetailPage from '@/pages/login/TermsDetailPage';
import TermsPage from '@/pages/login/TermsPage';
import TermsRoute from '@/routes/TermsRoute';
import TodoCreatePage from '@/pages/todos/TodoCreatePage';
import TodoEditPage from '@/pages/todos/TodoEditPage';
import TodoListPage from '@/pages/todos/TodoListPage';
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
            {/* 약관동의 */}
            <Route element={<TermsRoute />}>
              <Route path="/signup/terms" element={<TermsPage />} />
              <Route path="/signup/terms/:type" element={<TermsDetailPage />} />
            </Route>
            <Route path="/signup/complete" element={<SignupCompletePage />} />

            {/* 온보딩 */}
            <Route element={<OnboardingRoute />}>
              <Route path="/onboarding" element={<OnboardingPage />} />
              <Route path="/onboarding/create" element={<CreateHousePage />} />
              <Route path="/onboarding/join" element={<JoinHousePage />} />
            </Route>

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
              <Route
                path="/mypage/invitation"
                element={<RoomInvitationPage />}
              />

              <Route path="/rules/new" element={<RuleCreatePage />} />
              <Route path="/todos/new" element={<TodoCreatePage />} />
              <Route path="/todos/:todoId/edit" element={<TodoEditPage />} />
              <Route
                path="/todos/list/category/:type"
                element={<TodoListPage />}
              />
              <Route
                path="/todos/list/member/:memberId"
                element={<TodoListPage />}
              />
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

import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import AddPlanPage from 'src/pages/add-plan';
import UserLayout from 'src/layouts/user-dashboard';
import DashboardLayout from 'src/layouts/dashboard';
import AddUserPlanPage from 'src/pages/add-user-plan';

import ProtectedRoute from 'src/components/auth/protected-route';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const SignUpPage = lazy(() => import('src/pages/signup'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const PaymentsPage = lazy(() => import('src/pages/payments'));
export const ViewPlansPage = lazy(() => import('src/pages/view-plans'));
export const UserPaymentsPage = lazy(() => import('src/pages/user-payments'));

export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <ProtectedRoute>
          <DashboardLayout>
            <Suspense>
              <Outlet />
            </Suspense>
          </DashboardLayout>
        </ProtectedRoute>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'members', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'view-plans', element: <ViewPlansPage /> },
        { path: 'payments', element: <PaymentsPage /> },
        {
          path: 'addplan',
          element: <AddPlanPage />,
        },
      ],
    },

    {
      path: 'user-index',
      element: (
        <ProtectedRoute>
          <UserLayout>
            <Suspense>
              <Outlet />
            </Suspense>
          </UserLayout>
        </ProtectedRoute>
      ),
      children: [
        {
          path: 'add-plan',
          element: <AddUserPlanPage />,
        },
        {
          path: 'user-payments',
          element: <UserPaymentsPage />,
        },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },

    {
      path: 'signup',
      element: <SignUpPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}

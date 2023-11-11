/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
import { Toaster } from 'react-hot-toast';

import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';
// eslint-disable-next-line import/no-extraneous-dependencies
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthContextProvider from './hooks/use-auth';

// ----------------------------------------------------------------------

const queryClient = new QueryClient();
export default function App() {
  useScrollToTop();

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: '12px' }}
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 5000 },
          style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',
            backgroundColor: '#2F2F2F',
            color: '#F3F9D2',
          },
        }}
      />
      <AuthContextProvider>
        <ThemeProvider>
          <Router />
        </ThemeProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

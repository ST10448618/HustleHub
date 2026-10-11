import { useEffect } from 'react';
import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query';
import { useAuth } from './useAuth.js';

function shouldRetry(failureCount, error) {
  const status = error?.status;
  if (typeof status === 'number' && status >= 400 && status < 500) {
    return false;
  }
  return failureCount < 1;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: shouldRetry,
      staleTime: 5000
    }
  }
});

/**
 * Wipes every cached response when nobody is logged in. Without this,
 * data fetched for one account (an admin's user list, say) would stay
 * in memory after logout and could flash on screen for the next
 * person who logs in on the same browser tab.
 */
function ClearCacheOnLogout() {
  const client = useQueryClient();
  const { authenticated } = useAuth();

  useEffect(() => {
    if (!authenticated) {
      client.clear();
    }
  }, [authenticated, client]);

  return null;
}

/**
 * Must sit INSIDE AuthProvider (it reads the login state).
 */
function QueryProvider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ClearCacheOnLogout />
      {children}
    </QueryClientProvider>
  );
}

export default QueryProvider;
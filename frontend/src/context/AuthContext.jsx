import { createContext, startTransition, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authService from '../services/authService';
import { TOKEN_STORAGE_KEY, SESSION_EXPIRED_EVENT } from '../services/api';

const AuthContext = createContext(undefined);
export { AuthContext };

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(() => Boolean(localStorage.getItem(TOKEN_STORAGE_KEY)));
  const navigate = useNavigate();

  const restoreSession = useCallback(async () => {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (!token) {
      return;
    }

    try {
      const user = await authService.getCurrentUser();
      setCurrentUser(user);
    } catch {
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  useEffect(() => {
    function handleSessionExpired() {
      // Both changes must be applied TOGETHER. React Router applies a
      // navigation inside a transition, so if only navigate() were in
      // one, clearing the user would render first and ProtectedRoute
      // would bounce straight to /login: the Session Expired page
      // would never be shown.
      startTransition(() => {
        setCurrentUser(null);
        navigate('/session-expired', { replace: true });
      });
    }

    window.addEventListener(SESSION_EXPIRED_EVENT, handleSessionExpired);
    return () => window.removeEventListener(SESSION_EXPIRED_EVENT, handleSessionExpired);
  }, [navigate]);

  const login = useCallback(async (email, password) => {
    const { token, user } = await authService.login(email, password);
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
    setCurrentUser(user);
    return user;
  }, []);

  const registerThenLogin = useCallback(
    async ({ name, email, password, role }) => {
      await authService.register({ name, email, password, role });
      return login(email, password);
    },
    [login]
  );

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    setCurrentUser(null);
    navigate('/login', { replace: true });
  }, [navigate]);

  const value = {
    currentUser,
    role: currentUser?.role ?? null,
    authenticated: Boolean(currentUser),
    loading,
    login,
    registerThenLogin,
    logout,
    restoreSession
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
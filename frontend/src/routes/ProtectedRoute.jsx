import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/useAuth.js';

function ProtectedRoute({ allowedRoles }) {
  const { authenticated, role, loading } = useAuth();

  if (loading) {
    return (
      <div className="container" style={{ paddingTop: 'var(--space-10)', textAlign: 'center' }}>
        <p style={{ color: 'var(--color-text-muted)' }}>Loading…</p>
      </div>
    );
  }

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/403" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
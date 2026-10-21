
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Esperamos a que se recupere la sesión.
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 5,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Si no inició sesión, va al login.
  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  // Si su rol no tiene permiso, vuelve al inicio.
  if (allowedRoles && !allowedRoles.includes(user.tipo)) {
    return <Navigate to="/" replace />;
  }

  // Si tiene permiso, se muestra la página solicitada.
  return <Outlet />;
};

export default ProtectedRoute;

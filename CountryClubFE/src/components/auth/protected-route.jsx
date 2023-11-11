import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from 'src/hooks/use-auth';

// eslint-disable-next-line react/prop-types
function ProtectedRoute({ children }) {
  const { isAuthenticated, user } = useAuth();
  console.log(isAuthenticated);
  console.log(user)
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate('/login');
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;

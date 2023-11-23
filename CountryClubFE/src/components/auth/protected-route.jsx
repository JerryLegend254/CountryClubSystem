import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from 'src/hooks/use-auth';

// eslint-disable-next-line react/prop-types
function ProtectedRoute({ children }) {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate('/login');
    if (user) {
      if (user.email !== 'admin@gmail.com') navigate('/userpage');
    }
  }, [isAuthenticated, navigate, user]);

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from 'src/hooks/use-auth';

// eslint-disable-next-line react/prop-types
function ProtectedRoute({ children }) {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!isAuthenticated) navigate('/login');
  //   if (user) {
  //     if (user.email !== 'admin@gmail.com') navigate('/user-index/user-payments');
  //   }
  // }, [isAuthenticated, navigate, user]);

useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (user) {
        if (user.email === 'admin@gmail.com') {
          // Admin can access all routes
          return;
        } 
          // Basic user can access user-index/user-payments and user-index/add-plan
          const allowedRoutes = ['/user-index/user-payments', '/user-index/add-plan'];
          if (!allowedRoutes.includes(window.location.pathname)) {
            navigate('/user-index/user-payments');
          }
        
      }
  }, [isAuthenticated, navigate, user]);


  return isAuthenticated ? children : null;
}

export default ProtectedRoute;

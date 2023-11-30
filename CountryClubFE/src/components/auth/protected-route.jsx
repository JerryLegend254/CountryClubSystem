import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from 'src/hooks/use-auth';

import { auth } from 'src/services/firebase';

// eslint-disable-next-line react/prop-types
function ProtectedRoute({ children }) {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (user) {
       auth.currentUser
         .getIdTokenResult()
         .then((idTokenResult) => {
           // Confirm the user is an Admin.
           if (idTokenResult.claims.admin) {
             // Show admin UI.
              const allowedRoutes = ['/', '/members', '/view-plans', '/addplan', '/payments'];
              if (!allowedRoutes.includes(window.location.pathname)) {
                navigate('/');
              }

           } else {
             // Show regular user UI.
             const allowedRoutes = [
               '/user-index/user-payments',
               '/user-index/add-plan',
               '/user-index/profile',
             ];
             if (!allowedRoutes.includes(window.location.pathname)) {
               navigate('/user-index/user-payments');
             }
           }
         })
         .catch((error) => {
           console.log(error);
         });
    }
  }, [isAuthenticated, navigate, user]);

 

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;

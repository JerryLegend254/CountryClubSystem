import PropTypes from 'prop-types';
import { useState, useEffect, useContext, createContext } from 'react';

import {
  auth,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'src/services/firebase/index';

import { httpEmailSignUp } from './requests';

const AuthContext = createContext();

function formatFirebaseError(error) {
  let formattedError = error.replace('Firebase: Error ', '');
  formattedError = formattedError.replace(/[()]/g, '').trim();
  formattedError = formattedError.charAt(0).toUpperCase() + formattedError.slice(1);

  return formattedError;
}
function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (userCred) => {
      setIsLoading(true)
      if (userCred) {
        setUser(userCred);
      } else {
        setUser(null);
      }
      setIsLoading(false)
    });
  }, [user]);

  async function signup({ email, username, password }) {
    try {
      console.log('Starting su operation');
      setIsLoading(true);
      const res = await httpEmailSignUp({ email, password, username });
      const parsedRes = await res.json();
      setUser(parsedRes?.user);
      if (parsedRes?.error) throw new Error(formatFirebaseError(parsedRes.error));
    } catch (err) {
      throw new Error(err.message);
    } finally {
      setIsLoading(false);
    }
  }
  async function login({ email, password }) {

    try {
      setIsLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential?.user);
    } catch (err) {
      throw new Error(formatFirebaseError(err.message)) ;
    } finally {
      setIsLoading(false);
    }
  }

  async function logout() {
    setIsLoading(true);
    await signOut(auth);
    setIsLoading(false);
  }
 
  return (
    <AuthContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        isLoading,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth was used out of scope');
  return context;
}

AuthContextProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthContextProvider;

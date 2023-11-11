import PropTypes from 'prop-types';
import { useState, useContext, createContext } from 'react';

import { httpSignOut, httpEmailSignIn, httpEmailSignUp } from './requests';

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  async function signup(email, username, password, confPassword) {
    if (password !== confPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      setError('');
      setIsLoading(true);
      const res = await httpEmailSignUp({ email, password, username});
      const parsedRes = await res.json();
      setUser(parsedRes?.user);
      setError(parsedRes?.error);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }
  async function login(email, password) {
    try {
      setError('');
      setIsLoading(true);
      const res = await httpEmailSignIn({ email, password });
      const parsedRes = await res.json();
      setUser(parsedRes?.user);
      setError(parsedRes?.error);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function logout() {
    try {
      await httpSignOut();
      setUser(null);
    } catch (err) {
      setError(err);
    }
  }


  return (
    <AuthContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ user, isAuthenticated: !!user, login, logout, isLoading, error, signup, setError }}
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

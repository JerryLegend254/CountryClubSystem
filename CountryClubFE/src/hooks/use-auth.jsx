import PropTypes from 'prop-types';
import { useState, useContext, createContext } from 'react';

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [user] = useState(null);


  // eslint-disable-next-line react/jsx-no-constructed-context-values
  return <AuthContext.Provider value={{ user, isAuthenticated: !!user }}>{children}</AuthContext.Provider>;
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

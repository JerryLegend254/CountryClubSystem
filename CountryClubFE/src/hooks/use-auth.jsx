import PropTypes from 'prop-types';
import { updateProfile } from 'firebase/auth';
import { useState, useEffect, useContext, createContext } from 'react';

import {
  auth,
  signOut,
  signInWithRedirect,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'src/services/firebase/index';

import { httpGet2FA, httpEmailSignUp } from './requests';

const AuthContext = createContext();
const provider = new GoogleAuthProvider();
export function formatFirebaseError(error) {
  let formattedError = error.replace('Firebase: Error ', '');
  formattedError = formattedError.replace(/[()]/g, '').trim();
  formattedError = formattedError.charAt(0).toUpperCase() + formattedError.slice(1);

  return formattedError;
}
function AuthContextProvider({ children }) {
  const [user, setUser] = useState(auth.currentUser);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, async (userCred) => {
      if (userCred) {
        setUser(userCred);
      } else {
        setUser(null);
      }
    });
  }, [user]);

  // useEffect(() => {
  //   let unsubscribe; // Declare a variable to store the unsubscribe function

  //   if (user) {
  //     // Add the listener and store the unsubscribe function
  //     unsubscribe = onAuthStateChanged(auth, async (userCred) => {
  //       if (userCred) {
  //         setUser(userCred);
  //         console.log("User")
  //       } else {
  //         setUser(null);
  //       }
  //     });
  //   }

  //   // Return the cleanup function to unsubscribe the listener
  //   return () => {
  //     if (unsubscribe) {
  //       unsubscribe();
  //     }
  //   };
  // }, [user]);
  async function signup({ email, username, password }) {
    try {
      setIsLoading(true);
      const res = await httpEmailSignUp({ email, password, username });
      const parsedRes = await res.json();
      if (parsedRes?.error) throw new Error(formatFirebaseError(parsedRes.error));
      setUser(parsedRes?.user);
    } catch (err) {
      throw new Error(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function signinWithGoogle() {
    signInWithRedirect(auth, provider);
  }
  async function login({ email, password }) {
    try {
      setIsLoading(true);
      await httpGet2FA({ toEmail: email });
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential?.user) {
        setUser(userCredential?.user);
      }
    } catch (err) {
      throw new Error(formatFirebaseError(err.message));
    } finally {
      setIsLoading(false);
    }
  }

  async function logout() {
    setIsLoading(true);
    await signOut(auth);
    setUser(null);
    setIsLoading(false);
  }
  async function updateUserProfile({ photoUrl, username }) {
    updateProfile(auth.currentUser, {
      displayName: username,
      photoURL: photoUrl,
    })
      .then(() => {
        // Profile updated!
        // ...
      })
      .catch((error) => {
        // An error occurred
        throw new Error(error)
        // ...
      });
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
        signinWithGoogle,
        updateUserProfile,
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

// // Updated AuthContext.js
// import React, { createContext, useContext, useState } from "react";
// import { Navigate } from "react-router-dom";
// import { auth } from "../firebaseConfig";
// import { signInWithEmailAndPassword, signOut } from "firebase/auth";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const login = async (email, password) => {
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       setIsAuthenticated(true);
//     } catch (error) {
//       console.error("Login failed:", error.message);
//     }
//   };

//   const logout = async () => {
//     try {
//       await signOut(auth);
//       setIsAuthenticated(false);
//     } catch (error) {
//       console.error("Logout failed:", error.message);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

// export const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated } = useAuth();

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

import React, { createContext, useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firebaseConfig"; // Your Firebase configuration
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth"; // Importing Firebase functions

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider component to wrap the app
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  /**
   * Handles user login using Firebase Authentication.
   * @param {string} email - User's email address.
   * @param {string} password - User's password.
   */
  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  /**
   * Handles user signup using Firebase Authentication.
   * @param {string} email - User's email address.
   * @param {string} password - User's password.
   */
  const signup = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Signup failed:", error.message);
    }
  };

  /**
   * Handles user logout using Firebase Authentication.
   */
  const logout = async () => {
    try {
      await signOut(auth);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  // Provide authentication state and methods to children components
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to access authentication context.
 * @returns {object} - Authentication state and methods.
 */
export const useAuth = () => useContext(AuthContext);

/**
 * ProtectedRoute component to guard routes based on authentication state.
 * Redirects unauthenticated users to the login page.
 * @param {object} props - Children components to render if authenticated.
 * @returns {JSX.Element} - Either the children or a Navigate component.
 */
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

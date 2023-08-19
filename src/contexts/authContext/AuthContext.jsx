import React, { createContext, useEffect, useState } from "react";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../../firebase/Firebase.init";

// auth context porvider
export const AuthContextProvider = createContext();
// firebase app
const auth = getAuth(app);
const AuthContext = ({ children }) => {
  // providers
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  // states
  const [user,setUser] = useState(null);
  const [loading,setLoading] = useState(true)
  // google singUp
  const singUpWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  // github singup
  const singUpWithGithub = () => {
    setLoading(true);
    return signInWithPopup(auth, githubProvider);
  };
  //   create user with email and password
  const singupWithEmailAndPass = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //   update user information
  const updateUserInfo = (user) => {
    setLoading(true);
    return updateProfile(auth.currentUser, user);
  };
  // login with email and password
  const loginWithEmailAndPass = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  // observer
  useEffect(()=>{
    setLoading(true);
    const unSubscribe = onAuthStateChanged(auth,currentUser=>{
      setUser(currentUser)
      setLoading(false)
    });
    return ()=>{
      unSubscribe();
    }
  },[])
  // logout
  const logOut = ()=>{
    return signOut(auth);
  }
  const authInfo = {
    singUpWithGoogle,
    singUpWithGithub,
    singupWithEmailAndPass,
    updateUserInfo,
    loginWithEmailAndPass,
    logOut,
    user,
    loading
  };
  return (
    <AuthContextProvider.Provider value={authInfo}>
      {children}
    </AuthContextProvider.Provider>
  );
};

export default AuthContext;

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
  // google singUp
  const singUpWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };
  // github singup
  const singUpWithGithub = () => {
    return signInWithPopup(auth, githubProvider);
  };
  //   create user with email and password
  const singupWithEmailAndPass = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //   update user information
  const updateUserInfo = (user) => {
    return updateProfile(auth.currentUser, user);
  };
  // login with email and password
  const loginWithEmailAndPass = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  // observer
  useEffect(()=>{
    const unSubscribe = onAuthStateChanged(auth,currentUser=>{
      setUser(currentUser)
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
    user
  };
  return (
    <AuthContextProvider.Provider value={authInfo}>
      {children}
    </AuthContextProvider.Provider>
  );
};

export default AuthContext;

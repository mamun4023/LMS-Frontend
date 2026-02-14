/* eslint-disable @typescript-eslint/no-explicit-any */
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

// Custom error messages mapping
const getCustomErrorMessage = (errorCode: string, errorMessage?: string): string => {
  const errorMap: { [key: string]: string } = {
    "auth/invalid-credential": "Invalid email or password. Please try again.",
    "auth/user-not-found": "No account found with this email address.",
    "auth/wrong-password": "Incorrect password. Please try again.",
    "auth/invalid-email": "Invalid email format. Please check and try again.",
    "auth/email-already-in-use": "This email is already registered. Please sign in or use a different email.",
    "auth/weak-password": "Password is too weak. Use at least 6 characters.",
    "auth/operation-not-allowed": "Operation not allowed. Please contact support.",
    "auth/too-many-requests": "Too many failed login attempts. Please try again later.",
    "auth/account-exists-with-different-credential": "An account already exists with this email. Please sign in with a different method.",
    "auth/popup-blocked": "Sign-in popup was blocked. Please enable popups and try again.",
    "auth/popup-closed-by-user": "Sign-in was cancelled. Please try again.",
    "auth/cancelled-popup-request": "Sign-in was cancelled. Please try again.",
    "auth/invalid-api-key": "Configuration error. Please contact support.",
    "auth/network-request-failed": "Network error. Please check your internet connection and try again.",
  };

  return errorMap[errorCode] || errorMessage || "Authentication failed. Please try again.";
};

// providers
const googleProvider=new GoogleAuthProvider();
const githubProvider=new GithubAuthProvider();

// Configure providers with custom parameters
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

githubProvider.setCustomParameters({
  allow_signup: 'true'
});
// Google login
export const signInWithGoogle=async()=>{
    try{
        return await signInWithPopup(auth,googleProvider);
    }
    catch(error:any){
      const customError = getCustomErrorMessage(error.code, error.message);
      throw new Error(customError);
    }
};

// Github Login
export const signInWithGithub=async()=>{
  try{
      return await signInWithPopup(auth,githubProvider);
  }
  catch(error:any){
    const customError = getCustomErrorMessage(error.code, error.message);
    throw new Error(customError);
  }
};

// email password signup
export const registerUser=(email:string,password:string)=>{
    return createUserWithEmailAndPassword(auth,email,password);
};
// email password login
export const loginUser=async (email:string,password:string)=>{
    try{
      return await signInWithEmailAndPassword(auth,email,password);
    }
    catch(error:any){
      const customError = getCustomErrorMessage(error.code, error.message);
      throw new Error(customError);
    }
};

// Logout
export const logOutUser=async()=>{
    return await signOut(auth);
}

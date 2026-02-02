import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

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
 if (error.code === 'auth/popup-closed-by-user') {
      throw new Error('Sign-in popup was closed before completing. Please try again.');
    } else if (error.code === 'auth/popup-blocked') {
      throw new Error('Popup was blocked by your browser. Please enable popups for this site.');
    } else if (error.code === 'auth/cancelled-popup-request') {
      throw new Error('Sign-in was cancelled. Please try again.');
    }
    throw error;
    }
};

// Github Login
export const signInWithGithub=async()=>{
  try{
      return await signInWithPopup(auth,githubProvider);
  }
  catch(error:any){
     if (error.code === 'auth/popup-closed-by-user') {
      throw new Error('Sign-in popup was closed before completing. Please try again.');
    } else if (error.code === 'auth/popup-blocked') {
      throw new Error('Popup was blocked by your browser. Please enable popups for this site.');
    } else if (error.code === 'auth/cancelled-popup-request') {
      throw new Error('Sign-in was cancelled. Please try again.');
    } else if (error.code === 'auth/account-exists-with-different-credential') {
      throw new Error('An account already exists with the same email but different sign-in credentials.');
    }
    throw error;
  }
};

// email password signup
export const registerUser=(email:string,password:string)=>{
    return createUserWithEmailAndPassword(auth,email,password);
};
// email password sigin
export const loginUser=(email:string,password:string)=>{
    return signInWithEmailAndPassword(auth,email,password);
};

// Logout
export const logOutUser=async()=>{
    return await signOut(auth);
}

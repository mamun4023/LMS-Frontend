/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { User } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from "firebase/auth";
import { auth } from "../../firebase/firebase";

// ✅ Serializable User Type (only includes serializable properties)
export interface SerializableUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
}

interface AuthState {
  user: SerializableUser | null;
  loading: boolean;
  error: string | null;
  authChecked: boolean; 
}

// ✅ Helper to convert Firebase User to serializable format
export const toSerializableUser = (user: User): SerializableUser => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName,
  photoURL: user.photoURL,
  emailVerified: user.emailVerified,
});

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
   authChecked: false,
};

// 🎯 Custom error messages mapping
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

// register
export const registerUserThunk = createAsyncThunk(
  "auth/register",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      return toSerializableUser(result.user);
    } catch (error: any) {
      const customError = getCustomErrorMessage(error.code, error.message);
      return rejectWithValue(customError);
    }
  }
);


/* LOGIN */
export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return toSerializableUser(result.user);
    } catch (error: any) {
      const customError = getCustomErrorMessage(error.code, error.message);
      return rejectWithValue(customError);
    }
  }
);
// Providers
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

// Google Login
export const loginWithGoogle = createAsyncThunk(
  "auth/googleLogin",
  async (_, { rejectWithValue }) => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return toSerializableUser(result.user);
    } catch (error: any) {
      const customError = getCustomErrorMessage(error.code, error.message);
      return rejectWithValue(customError);
    }
  }
);

// Github login
export const loginWithGithub = createAsyncThunk(
  "auth/githubLogin",
  async (_, { rejectWithValue }) => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      return toSerializableUser(result.user);
    } catch (error: any) {
      const customError = getCustomErrorMessage(error.code, error.message);
      return rejectWithValue(customError);
    }
  }
);

/* LOGOUT */
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async () => {
    await signOut(auth);
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.authChecked=true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.authChecked=true;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.authChecked=true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.authChecked=true;
      })
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
        })
    .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.authChecked=true;
        })
        .addCase(loginWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        })

        .addCase(loginWithGithub.pending, (state) => {
        state.loading = true;
        state.error = null;
        })
        .addCase(loginWithGithub.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.authChecked=true;
        })
        .addCase(loginWithGithub.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        })
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;

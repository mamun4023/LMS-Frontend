/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { UserProfile } from "../../services/user.service";
import {
  createUserProfile,
  deleteUserProfile,
  getUserProfile,
  updateUserProfile,
} from "../../services/user.service";
import { logoutUser } from "./authSlice";


interface UserState {
  // profile: any;
  // loading: boolean;
  // error: string | null;
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  success: string|null;
}

const initialState: UserState = {
  profile: null,
  loading: false,
  error: null,
  success:null,
};

/* FETCH */
export const fetchProfile = createAsyncThunk<UserProfile | null, string>(
  "user/fetchProfile",
  async (uid: string, { rejectWithValue }) => {
    try {
      return await getUserProfile(uid);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

/* CREATE */
export const createProfile = createAsyncThunk(
  "user/createProfile",
  async ({ uid, data }: any, { rejectWithValue }) => {
    try {
      await createUserProfile(uid, data);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

/* UPDATE */
export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async ({ uid, data }: any, { rejectWithValue }) => {
    try {
      await updateUserProfile(uid, data);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

/* DELETE */
export const deleteProfile = createAsyncThunk(
  "user/deleteProfile",
  async (uid: string, { rejectWithValue }) => {
    try {
      await deleteUserProfile(uid);
      return uid;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearProfile(state){
        state.profile=null;
        state.loading=false;
        state.error=null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateProfile.fulfilled,(state,action)=>{
        state.profile={ ...state.profile, ...action.payload };
      })
      .addCase(deleteProfile.fulfilled,(state)=>{
        state.profile=null;
      })
      .addCase(logoutUser.fulfilled,(state)=>{
        state.profile=null;
      })
  },
});

export default userSlice.reducer;
export const {clearProfile}=userSlice.actions;

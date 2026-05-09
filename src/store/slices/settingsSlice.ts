import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export interface SystemSettings {
  libraryName: string;
  maxBooksPerStudent: number;
  loanDuration: number;
  finePerDay: number;
}

interface SettingsState {
  settings: SystemSettings | null;
  loading: boolean;
}

const initialState: SettingsState = {
  settings: null,
  loading: false,
};

export const fetchSettings = createAsyncThunk(
  "settings/fetch",
  async () => {
    const ref = doc(db, "settings", "system");

    const snap = await getDoc(ref);

    return snap.data() as SystemSettings;
  }
);

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSettings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.settings = action.payload;
      });
  },
});

export default settingsSlice.reducer;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { deleteUserRoleProfile, updateUserRole } from "../../services/user.service";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "librarian" | "student";
}

interface UserListState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserListState = {
  users: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const snapshot = await getDocs(collection(db, "users"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<User, "id">),
  }));
});

export const updateUserRoleThunk = createAsyncThunk<
  { uid: string; role: User["role"] },   // ✅ RETURN TYPE
  { uid: string; role: User["role"] }    // ✅ ARG TYPE
>(
  "users/updateRole",
  async ({ uid, role }) => {
    await updateUserRole(uid, role);
    return { uid, role };
  }
);


export const deleteUserThunk = createAsyncThunk(
  "users/delete",
  async (uid: string) => {
    await deleteUserRoleProfile(uid);
    return uid;
  }
);
const userListSlice = createSlice({
  name: "usersList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(deleteUserThunk.fulfilled, (state, action) => {
  state.users = state.users.filter(u => u.id !== action.payload);
})
      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch users";
      })
      .addCase(updateUserRoleThunk.fulfilled, (state, action) => {
    const { uid, role } = action.payload;

    state.users = state.users.map((user) =>
        user.id === uid ? { ...user, role } : user
  );
})
      
  },
});



export default userListSlice.reducer;
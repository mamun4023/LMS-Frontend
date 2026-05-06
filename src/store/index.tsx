import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./slices/authSlice";
import bookReducer from "./slices/bookSlice";
import favouriteReducer from "./slices/favouriteSlice";
import usersListReducer from "./slices/userListSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    auth:authReducer,
    user:userReducer,
    books: bookReducer,
    usersList: usersListReducer,
    favourites: favouriteReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['auth/setUser'],
        ignoredPaths: ['auth.user'],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
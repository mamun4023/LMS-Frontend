
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  collection, deleteDoc, doc, getDocs, query, setDoc, where,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";

export interface FavouriteBook {
  id: string;      
  userId: string;
  bookId: string;
  title: string;
  author: string;
  isbn: string;
  cover?: string;
}

interface FavouriteState {
  favourites: FavouriteBook[];
  loading: boolean;
}

const initialState: FavouriteState = { favourites: [], loading: false };

export const fetchFavourites = createAsyncThunk(
  "favourites/fetch",
  async (userId: string) => {
    const q = query(collection(db, "favourites"), where("userId", "==", userId));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() })) as FavouriteBook[];
  }
);

export const addFavouriteThunk = createAsyncThunk(
  "favourites/add",
  async ({
    userId,
    book,
  }: {
    userId: string;
    book: {
      bookId: string;
      title: string;
      author: string;
      isbn: string;
      cover?:string;
    };
  }) => {
    const existing = await getDocs(
      query(
        collection(db, "favourites"),
        where("userId", "==", userId),
        where("bookId", "==", book.bookId)
      )
    );
    if (!existing.empty) throw new Error("Already favourite");
    const ref = doc(collection(db, "favourites"));
    await setDoc(ref, { userId, ...book });
    return { id: ref.id,userId,...book } satisfies FavouriteBook;
  }
);
export const removeFavouriteThunk = createAsyncThunk(
  "favourites/remove",
  async (favouriteId: string) => {
    await deleteDoc(doc(db, "favourites", favouriteId));
    return favouriteId;
  }
);

const favouriteSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavourites.pending, (state) => { state.loading = true; })
      .addCase(fetchFavourites.fulfilled, (state, action) => {
        state.loading = false;
        state.favourites = action.payload;
      })
      .addCase(addFavouriteThunk.fulfilled, (state, action) => {
        state.favourites.push(action.payload);
      })
      .addCase(removeFavouriteThunk.fulfilled, (state, action) => {
        state.favourites = state.favourites.filter((f) => f.id !== action.payload);
      });
  },
});

export default favouriteSlice.reducer;
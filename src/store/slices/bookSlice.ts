 
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Book } from "../../services/book.service";
import {
    createBook,
    deleteBook,
    getBooks,
    updateBook,
} from "../../services/book.service";

interface BookState {
  books: Book[];
  loading: boolean;
  error: string | null;
}

const initialState: BookState = {
  books: [],
  loading: false,
  error:null,
};

export const fetchBooks = createAsyncThunk<Book[]>("books/fetch", async () => {
  return await getBooks();
});

export const addBook = createAsyncThunk<Book, Omit<Book, "id">>("books/add", async (data) => {
  const result = await createBook(data);
  return {
    ...data,
    id: result.id,
  };
});

export const editBook = createAsyncThunk(
  "books/edit",
  async ({ id, data }: { id: string; data: Partial<Omit<Book, "id">> }) => {
    await updateBook(id, data);
    return { id, data };
  }
);

export const removeBook = createAsyncThunk("books/delete", async (id: string) => {
  await deleteBook(id);
  return id;
});

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error=null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch books";
      })
    //   ADD
      .addCase(addBook.fulfilled, (state, action) => {
        state.books.push(action.payload);
      })
    //   EDIT
      .addCase(editBook.fulfilled, (state, action) => {
        const { id, data } = action.payload;
        state.books = state.books.map((book) =>
          book.id === id ? { ...book, ...data } : book
        );
      })
    //   DELETE
      .addCase(removeBook.fulfilled, (state, action) => {
        state.books = state.books.filter((b) => b.id !== action.payload);
      });
  },
});

export default bookSlice.reducer;
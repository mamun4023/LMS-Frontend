
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBorrowedBooks } from "../../services/borrow.service";

import { addDoc, collection, doc, getDoc, getDocs, increment, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import type { Book } from "../../services/book.service";
import {
  createBook,
  deleteBook,
  getBooks,
  updateBook,
} from "../../services/book.service";
import type { BorrowedBook } from "../../services/borrow.service";
interface BookState {
  books: Book[];
  loading: boolean;
  error: string | null;
  borrowedBooks:BorrowedBook[];
}

const initialState: BookState = {
  books: [],
  loading: false,
  error:null,
   borrowedBooks:[]
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

// borrowBook
export const borrowBookThunk = createAsyncThunk(
  "books/borrow",
  async ({ userId, book }: { userId: string; book: Book }) => {

    const existing = await getDocs(
  query(
    collection(db, "borrowedBooks"),
    where("userId", "==", userId),
    where("bookId", "==", book.id),
    where("returned", "==", false)
  )
);
if (!existing.empty) throw new Error("Already borrowed");
    // 1️⃣ Add to borrowedBooks

    if(book.copies <=0){
  throw new Error("No Copies Available");
}
    const settingsRef = doc(db, "settings", "system");

const settingsSnap = await getDoc(settingsRef);

const settings = settingsSnap.data();

const loanDays = settings?.loanDuration || 14;

await addDoc(collection(db, "borrowedBooks"), {
  userId,
  bookId: book.id,
  title: book.title,
  author: book.author,
  borrowedAt: new Date().toISOString(),
  dueDate: new Date(
    Date.now() + loanDays * 24 * 60 * 60 * 1000
  ).toISOString(),
  returned: false,
});



    // 2️⃣ 🔥 DECREASE COPIES
    const bookRef = doc(db, "books", book.id);

    await updateDoc(bookRef, {
      copies: increment(-1),
    });

    return { userId, bookId: book.id};
  }
);

export const returnBookThunk = createAsyncThunk(
  "books/return",
  async ({ borrowId, bookId }: { borrowId: string; bookId: string }) => {

    // 1️⃣ mark as returned
    const borrowRef = doc(db, "borrowedBooks", borrowId);

    const borrowSnap = await getDoc(borrowRef);

const borrowData = borrowSnap.data();

const settingsRef = doc(db, "settings", "system");

const settingsSnap = await getDoc(settingsRef);

const finePerDay =
  settingsSnap.data()?.finePerDay || 1;

let fine = 0;

if (borrowData?.dueDate) {
  const now = new Date();

  const due = new Date(borrowData.dueDate);

  if (now > due) {
    const diffMs =
      now.getTime() - due.getTime();

    const overdueDays = Math.ceil(
      diffMs / (1000 * 60 * 60 * 24)
    );

    fine = overdueDays * finePerDay;
  }
}
    await updateDoc(borrowRef, {
      returned: true,
      returnedAt: new Date().toISOString(),

      fineAmount: fine,
      finePaid:false,
    });

    // 2️⃣ increase copies
    const bookRef = doc(db, "books", bookId);
    await updateDoc(bookRef, {
      copies: increment(1),
    });

    return { borrowId,fine };
  }
);

export const fetchBorrowedBooks = createAsyncThunk<
  BorrowedBook[],
  string
>(
  "books/fetchBorrowed",
  async (userId: string) => {
    return await getBorrowedBooks(userId);
  }
);

// renewBook
export const renewBookThunk = createAsyncThunk(
  "books/renew",
  async ({
    borrowId,
    currentDueDate,
  }: {
    borrowId: string;
    currentDueDate: string;
  }) => {

    // extend from CURRENT due date
    const current = new Date(currentDueDate);

    const newDueDate = new Date(
      current.getTime() + 14 * 24 * 60 * 60 * 1000
    ).toISOString();

    const borrowRef = doc(db, "borrowedBooks", borrowId);

    await updateDoc(borrowRef, {
      dueDate: newDueDate,
    });

    return { borrowId, newDueDate };
  }
);
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
     
      .addCase(returnBookThunk.fulfilled, (state, action) => {
  const { borrowId,fine } = action.payload;

  state.borrowedBooks = state.borrowedBooks.map((b) =>
  b.id === borrowId
    ? {
        ...b,
        returned: true,
        returnedAt: new Date().toISOString(),
        fineAmount: fine,
        finePaid: false,
      }
    : b
);
})

      .addCase(fetchBorrowedBooks.fulfilled, (state, action) => {
  state.borrowedBooks = action.payload;
})

// renew Book
.addCase(renewBookThunk.fulfilled, (state, action) => {
  const { borrowId, newDueDate } = action.payload;
  state.borrowedBooks = state.borrowedBooks.map((b) =>
    b.id === borrowId ? { ...b, dueDate: newDueDate } : b
  );
})

.addCase(borrowBookThunk.rejected, (state, action) => {
  state.loading = false;
  state.error = action.error.message || "Borrow failed";
})

.addCase(returnBookThunk.rejected, (state, action) => {
  state.error = action.error.message || "Return failed";
})

.addCase(renewBookThunk.rejected, (state, action) => {
  state.error = action.error.message || "Renew failed";
})
    //   DELETE
      .addCase(removeBook.fulfilled, (state, action) => {
        state.books = state.books.filter((b) => b.id !== action.payload);
      });
  },
});

export default bookSlice.reducer;
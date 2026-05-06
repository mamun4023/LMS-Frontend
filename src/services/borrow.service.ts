/* eslint-disable @typescript-eslint/no-explicit-any */
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const borrowBook = async ({
  userId,
  book,
}: {
  userId: string;
  book: any;
}) => {
  // 🔹 1. Create borrowed record
  await addDoc(collection(db, "borrowedBooks"), {
    userId,
    bookId: book.id,
    title: book.title,
    author: book.author,
    dueDate: new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    ).toISOString(), // 7 days
    returned: false,
  });

  // 🔹 2. Reduce copies
  const bookRef = doc(db, "books", book.id);
  await updateDoc(bookRef, {
    copies: book.copies - 1,
  });
};

//fetch borrowed books
export const getBorrowedBooks = async (userId: string) => {
  const q = query(
    collection(db, "borrowedBooks"),
    where("userId", "==", userId)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
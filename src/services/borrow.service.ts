 
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";
export interface BorrowedBook {
  id: string;
  userId: string;
  bookId: string;
  title: string;
  author: string;

  borrowedAt: string;
  dueDate: string;

  returned: boolean;
  returnedAt?: string;

  fineAmount?: number;
  finePaid?: boolean;   
}
// export const borrowBook = async ({
//   userId,
//   book,
// }: {
//   userId: string;
//   book: Book;
// }) => {
//   // 🔹 1. Create borrowed record
// await addDoc(collection(db, "borrowedBooks"), {
//   userId,
//   bookId: book.id,
//   title: book.title,
//   author: book.author,
//   borrowedAt: new Date().toISOString(),
//   dueDate: new Date(
//     Date.now() + 7 * 24 * 60 * 60 * 1000
//   ).toISOString(),
//   returned: false,
// });

//   // 🔹 2. Reduce copies
//   const bookRef = doc(db, "books", book.id);
//   await updateDoc(bookRef, {
//     copies: increment(-1),
//   });
// };

//fetch borrowed books
export const getBorrowedBooks = async (userId: string):Promise<BorrowedBook[]> => {
  const q = query(
    collection(db, "borrowedBooks"),
    where("userId", "==", userId)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as BorrowedBook[];
};
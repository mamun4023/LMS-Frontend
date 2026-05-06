
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  copies: number;
  cover?:string;
}

export type CreateBookInput = Omit<Book,"id">;

const booksRef = collection(db, "books");

export const createBook = async (data: CreateBookInput) => {
  return await addDoc(booksRef, data);
};

export const getBooks = async (): Promise<Book[]> => {
  const snapshot = await getDocs(booksRef);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as CreateBookInput),
  }));
};

export const updateBook = async (id: string, data: Partial<Omit<Book, "id">>) => {
  const ref = doc(db, "books", id);
  return await updateDoc(ref, data);
};

export const deleteBook = async (id: string) => {
  const ref = doc(db, "books", id);
  return await deleteDoc(ref);
};
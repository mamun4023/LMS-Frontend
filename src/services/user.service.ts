import { collection, deleteDoc, doc, FieldValue, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { ADMIN_EMAILS, LIBRARIAN_EMAILS } from "../constants/roles";
import { db } from "../firebase/firebase";
export interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  role: "admin" | "student" | "librarian";
  avatar?: string;
  createdAt?: FieldValue;
}

// Create userprofile in firestore
export const createUserProfile=async(
    uid:string,
    data:{
    name:string;
    email:string;
    role:"admin" | "student" | "librarian";
    phone?:string;
    createdAt?: FieldValue;
}
)=>{
    await setDoc(doc(db,"users",uid),data);
};

// get userprofile from firestore
export const getUserProfile=async(uid:string): Promise<UserProfile | null> => {
    const snap = await getDoc(doc(db, "users", uid));
    return snap.exists() ? (snap.data() as UserProfile) : null;
}

export const resolveRoleForEmail=(
  email:string
): "admin" | "librarian" | "student" => {
  if (!email) return "student";

  if (ADMIN_EMAILS.includes(email)) return "admin";
  if (LIBRARIAN_EMAILS.includes(email)) return "librarian";
  return "student";
};

// update user profile fields
export const updateUserProfile=async(
    uid:string,
    data:Partial<{
    name: string;
    email: string;
    phone: string;
    role: "admin" | "student" | "librarian";
    }>
)=>{
    await updateDoc(doc(db,"users",uid),data);
};

// delete user profile( Admin use case)

export const deleteUserProfile=async(uid:string)=>{
    await deleteDoc(doc(db,"users",uid));
}

// new 
export const getUsers = async (): Promise<(UserProfile & { id: string })[]> => {
  const snapshot = await getDocs(collection(db, "users"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as UserProfile),
  }));
};

export const updateUserRole=async (uid:string,role:string)=>{
    const ref=doc(db,"users",uid);
    return await updateDoc(ref,{role});
}

export const deleteUserRoleProfile = async (uid: string) => {
  await deleteDoc(doc(db, "users", uid));
};
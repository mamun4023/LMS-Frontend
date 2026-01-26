import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

// Create userprofile in firestore
export const createUserProfile=async(
    uid:string,
    data:{
        name:string;
        email:string;
        role:"admin" | "student" | "librarian";
        phone?:string;
    }
)=>{
    await setDoc(doc(db,"users",uid),data);
};

// get userprofile from firestore
export const getUserProfile=async(uid:string)=>{
    const snap=await getDoc(doc(db,"users",uid));
    return snap.exists()? snap.data():null;
}

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
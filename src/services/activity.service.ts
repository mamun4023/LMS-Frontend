import { addDoc, collection, getDocs, limit, orderBy, query, serverTimestamp, type Timestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";

export type ActivityType = "success" | "info" | "warning" | "error";

export interface Activity {
  id?: string;
  action: string;
  message: string;
  type: ActivityType;
  user: string;
  createdAt?: Timestamp;
}

export const addActivity = async (
  action: string,
  message: string,
  type: ActivityType,
  user: string
) => {
  await addDoc(collection(db, "activities"), {
    action,
    message,
    type,
    user,
    createdAt: serverTimestamp(),
  });
};

export const fetchRecentActivities = async (count = 10): Promise<Activity[]> => {
  const q = query(
    collection(db, "activities"),
    orderBy("createdAt", "desc"),
    limit(count)
  );
  const snap = await getDocs(q);
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Activity));
};
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "./config";
import { Note } from "@/types"

export const createNote = async (uid: string, content: string): Promise<void> => {
  await addDoc(collection(db, 'notes'), {
    uid,
    content,
    createdAt: new Date().toISOString(),
  })
}

export const getUserNotes = async (uid: string): Promise<Note[]> => {
  const q = query(collection(db, 'notes'), where('uid', '==', uid));
  const querySnapshot = await getDocs(q);
  const notes: Note[] = [];

  querySnapshot.forEach((doc) => {
    notes.push({
      id: doc.id,
      ...doc.data()
    } as Note)
  })

  return notes;
}

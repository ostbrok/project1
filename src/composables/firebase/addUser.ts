// mouse.js
import { db } from '@/firebase';
import type { IUser } from '@/models/user.model';
import { addDoc, collection, getDoc } from 'firebase/firestore';

export async function useAddUser(userData: IUser) {
  try {
    const docRef = await addDoc(collection(db, "users"), userData)
    return { ...(await getDoc(docRef)).data(), docId: docRef.id };
  } catch (error) {
    console.error('Error adding user:', error);
  }
}
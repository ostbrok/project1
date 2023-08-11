// mouse.js
import { db } from '@/firebase';
import type { IUser } from '@/models/user.model';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export async function useUpdateUser(userData: IUser) {
    try {
        const docRef = await doc(db, 'users', userData.docId);
        await updateDoc(docRef, { ...userData })
        return { ...(await getDoc(docRef)).data(), docId: docRef.id } as IUser
    } catch (error) {
        console.error('Error updating user:', error);
    }
}
// mouse.js
import { db } from '@/firebase';
import { deleteDoc, doc } from 'firebase/firestore';

export async function useDeleteUser(userDocId: string) {
    try {
        const docRef = await doc(db, 'users', userDocId);
        await deleteDoc(docRef)
    } catch (error) {
        console.error('Error deleting user:', error);
    }
}
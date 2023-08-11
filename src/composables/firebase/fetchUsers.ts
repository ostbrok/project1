// mouse.js
import { db } from '@/firebase';
import type { IUser } from '@/models/user.model';
import { collection, getDocs } from 'firebase/firestore';

export async function useFetchUsers() {
    try {
        const snapshot = await getDocs(collection(db, 'users'))
        return snapshot.docs.map((doc) => ({ ...doc.data(), docId: doc.id })) as IUser[];
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}
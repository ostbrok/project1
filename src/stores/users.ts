import type { IUser } from '@/models/user.model'
import { defineStore } from 'pinia'
import { db } from '@/firebase';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';

export const useUsersStore = defineStore('users', {
    state: () => ({
        id: "usersStore",
        users: [] as IUser[]
    }),
    actions: {
        async fetchUsers() {
            try {
                const snapshot = await getDocs(collection(db, 'users'))
                this.users = snapshot.docs.map((doc) => ({ ...doc.data(), docId: doc.id })) as IUser[];
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        },
        async addUser(user: IUser) {
            try {
                const docRef = await addDoc(collection(db, "users"), user)
                this.users.push({ ...user, docId: docRef.id });
            } catch (error) {
                console.error('Error adding user:', error);
            }
        },
        async updateUser(data: IUser) {
            try {
                const index = this.users.findIndex(user => user.id === data.id);
                if (index !== -1) {
                    const documentRef = await doc(db, 'users', this.users[index].docId);
                    this.users[index] = data
                    await updateDoc(documentRef, { ...data })
                }
            } catch (error) {
                console.error('Error updating user:', error);
            }
            const index = this.users.findIndex(user => user.id === data.id);
            this.users[index] = data
        },
        async removeUser(id: number) {
            try {
                const index = this.users.findIndex(user => user.id === id);
                if (index !== -1) {
                    const documentRef = await doc(db, 'users', this.users[index].docId);
                    this.users.splice(index, 1)
                    await deleteDoc(documentRef)
                }
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        },
    },
    getters: {
        user: (state) => {
            return (id: number) => state.users.find((user) => user.id === id)
        },
        nextId: (state) => {
            return state.users.length + 1
        },
    }
})
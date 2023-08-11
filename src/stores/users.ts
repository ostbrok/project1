import type { IUser } from '@/models/user.model'
import { defineStore } from 'pinia'
import { useAddUser } from '@/composables/firebase/addUser';
import { useFetchUsers } from '@/composables/firebase/fetchUsers';
import { useUpdateUser } from '@/composables/firebase/updateUser';
import { useDeleteUser } from '@/composables/firebase/deleteUser';

export const useUsersStore = defineStore('users', {
    state: () => ({
        id: "usersStore",
        users: [] as IUser[]
    }),
    actions: {
        async fetchUsers() {
            this.users = await useFetchUsers() as IUser[]
        },
        async addUser(userData: IUser) {
            this.users.push(await useAddUser(userData) as IUser)
        },
        async updateUser(userData: IUser) {
            userData = await useUpdateUser(userData) as IUser
            const index = this.users.findIndex(user => user.docId === userData.docId);
            this.users[index] = userData
        },
        async deleteUser(userDocId: string) {
            await useDeleteUser(userDocId)
            const index = this.users.findIndex(user => user.docId === userDocId);
            this.users.splice(index, 1)
        },
    },
    getters: {
        user: (state) => {
            return (userDocId: string) => state.users.find((user) => user.docId === userDocId)
        },
        nextId: (state) => {
            return state.users.length + 1
        },
    }
})
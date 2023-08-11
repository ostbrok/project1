<script setup lang="ts">
import { computed, inject, onMounted, type Ref } from 'vue';
import { useUsersStore } from '../stores/users'
import { type IUser } from '../models/user.model';
import EditUserForm from './EditUserForm.vue';
import BaseModal from './BaseModal.vue';

const showUserLastname = <Ref>inject('showUserLastname');
const showEditUserModal = <Ref>inject('showEditUserModal');

const usersStore = useUsersStore()
const users = computed(() => {
    return <IUser[]>usersStore.users;
});

let editUserDocId = ''
const editUser = (userDocId: string) => {
    editUserDocId = userDocId
    showEditUserModal.value = true
}
const deleteUser = (editUserDocId: string) => {
    usersStore.deleteUser(editUserDocId)
}

onMounted(() => {
    usersStore.fetchUsers()
});
</script>

<template>
    <div>
        <div v-if="users.length === 0" class="bg-red-200 m-auto mt-5 p-5-lg w-60 text-center">Пользователи не
            найдены</div>
        <div v-else class="relative overflow-x-auto">
            <table class="w-full text-sm text-left">
                <thead class="text-white text-xs uppercase bg-blue-500 text-center">
                    <tr>
                        <th class="px-6 py-3">
                            ID
                        </th>
                        <th class="px-6 py-3">
                            Имя
                        </th>
                        <th v-show="showUserLastname" class="px-6 py-3">
                            Фамилия
                        </th>
                        <th class="px-6 py-3">
                            Телефон
                        </th>
                        <th class="px-6 py-3">
                            Аватар
                        </th>
                        <th class="px-6 py-3">
                            Роль
                        </th>
                        <th class="px-6 py-3">
                            Действия
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="border-b" v-for="user in users">
                        <td class="px-6 py-4 text-center">
                            {{ user.id }}
                        </td>
                        <td class="px-6 py-4 capitalize">
                            {{ user.firstname }}
                        </td>
                        <td v-show="showUserLastname" class="px-6 py-4 capitalize">
                            {{ user.lastname }}
                        </td>
                        <td class="px-6 py-4 text-center">
                            {{ user.phoneNumber ? user.phoneNumber : "Не указан" }}
                        </td>
                        <td class="px-6 py-4 text-center w-4 h-4">
                            <img :src="user.image" alt="Image">
                        </td>
                        <td class="px-6 py-4 text-center">
                            {{ user.role }}
                        </td>
                        <td class="px-6 py-4 text-center">
                            <button @click="editUser(user.docId)" class="m-2"><svg xmlns="http://www.w3.org/2000/svg"
                                    fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                    class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                            </button>
                            <button class="m-2" @click="deleteUser(user.docId)"><svg xmlns="http://www.w3.org/2000/svg"
                                    fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                    class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <BaseModal v-if="showEditUserModal" modalType="editUserModal">
            <EditUserForm :editUserDocId=editUserDocId />
        </BaseModal>
    </div>
</template>
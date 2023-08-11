<script setup lang="ts">
import { useUsersStore } from '../stores/users'
import { UserRoleEnum, type IUser } from '../models/user.model';
import { ref as fbref, uploadBytes, getDownloadURL } from "firebase/storage"
import { storage } from '@/firebase'
import { inject, ref, type Ref } from 'vue';


const showAddUserModal = <Ref>inject('showAddUserModal');
const isLoading = ref(false);

const usersStore = useUsersStore()

const imageInput = ref<HTMLInputElement | null>(null);
const imageFile = ref<File | null>(null);
const imageUrl = ref('https://placehold.co/300');
const handleImageInput = () => {
    if (imageInput.value?.files && imageInput.value.files.length > 0) {
        imageFile.value = imageInput.value.files[0];
    }
}

const user = ref<IUser>({
    docId: '',
    id: 0,
    firstname: '',
    lastname: '',
    phoneNumber: '',
    image: imageUrl.value,
    role: UserRoleEnum.NOT_SELECTED
});
const addUser = async () => {
    isLoading.value = true
    if (imageFile.value) {
        const storageRef = fbref(storage, `userImages/${(Math.random() + 1).toString(36).substring(2)}.png`);
        await uploadBytes(storageRef, new Blob([imageFile.value], { type: 'image/png' }));
        imageUrl.value = await getDownloadURL(storageRef);
    }
    const newUserData: IUser = { ...user.value, id: usersStore.nextId, image: imageUrl.value };
    usersStore.addUser(newUserData)
    showAddUserModal.value = false
    isLoading.value = false
}
</script>

<template>
    <form @submit.prevent="addUser" class="flex flex-wrap gap-2" id="addUserForm">
        <input type="text" v-model="user.firstname" class="w-full border py-1 px-2 capitalize" placeholder="Имя" required
            minlength="2" />
        <input type="text" v-model="user.lastname" class="w-full border py-1 px-2 capitalize" placeholder="Фамилия" required
            minlength="2" />
        <input type="file" ref="imageInput" @change="handleImageInput" class="w-full border py-1 px-2"
            placeholder="Изображение" />
        <select v-model="user.role" class="w-full border py-1 px-2" required>
            <option v-for="role in UserRoleEnum" :value="role" :disabled="role == UserRoleEnum.NOT_SELECTED">{{ role }}
            </option>
        </select>
        <input type="number" v-show="user.role == UserRoleEnum.BOSS" :required="user.role == UserRoleEnum.BOSS"
            v-model="user.phoneNumber"
            class="w-full border py-1 px-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            placeholder="Номер телефона" />
    </form>
    <button type="submit" form="addUserForm" :disabled="isLoading"
        class=" block mt-4 bg-green-500 text-white font-bold py-2 px-4 m-auto disabled:bg-slate-500 ">
        Добавить
    </button>
</template>

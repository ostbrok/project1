<script setup lang="ts">
import { useUsersStore } from '../stores/users'
import { UserRoleEnum, type IUser } from '../models/user.model';
import { ref } from 'vue';
import { useUploadUserImage } from '@/composables/firebase/uploadUserImage';

const isLoading = ref(false);

const emit = defineEmits(['closeModal'])

const usersStore = useUsersStore()

const imageInput = ref<HTMLInputElement | null>(null);
const imageFile = ref<File | null>(null);

const user = ref<IUser>({
    docId: '',
    id: 0,
    firstname: '',
    lastname: '',
    phoneNumber: '',
    image: 'https://placehold.co/300',
    role: UserRoleEnum.BOSS
});

const handleImageInput = () => {
    if (imageInput.value?.files && imageInput.value.files.length > 0) {
        imageFile.value = imageInput.value.files[0];
    }
}

const addUser = async () => {
    isLoading.value = true
    if (imageFile.value) {
        user.value.image = await useUploadUserImage(imageFile.value) as string
    }
    const newUserData: IUser = { ...user.value, id: usersStore.nextId };
    await usersStore.addUser(newUserData)
    isLoading.value = false
    emit('closeModal')
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
            <option v-for="role in UserRoleEnum" :value="role" :disabled="role == UserRoleEnum.BOSS">{{ role }}
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

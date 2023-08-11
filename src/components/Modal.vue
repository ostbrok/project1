<script setup lang="ts">
import { markRaw, ref } from 'vue';
import AddUserForm from '@/components/AddUserForm.vue';
import EditUserForm from '@/components/EditUserForm.vue';

const modalContentComponent = ref()
const modalTitle = ref('Modal');
const showModal = ref(false);

const openModal = (modelType: 'AddUserModal' | 'EditUserModal') => {
    showModal.value = true;
    switch (modelType) {
        case 'AddUserModal':
            modalContentComponent.value = markRaw(AddUserForm)
            modalTitle.value = "Добавление нового пользователя"
            break;
        case 'EditUserModal':
            modalContentComponent.value = markRaw(EditUserForm)
            modalTitle.value = "Изменение данных пользователя"
            break;
    }
};
const closeModal = () => {
    showModal.value = false;
};

defineExpose({ openModal })
</script>

<template>
    <div v-if="showModal"
        class="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-10">
        <div class="bg-white shadow-lg w-96 overflow-hidden">
            <div class="flex justify-between items-center bg-blue-500 text-white p-2">
                <h2 class=" text-lg font-bold">{{ modalTitle }}</h2>
                <button @click="closeModal" class="bloc font-bold">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div class="p-5">
                <component :is="modalContentComponent" @closeModal="closeModal" />
            </div>
        </div>
    </div>
</template>

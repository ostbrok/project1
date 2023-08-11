<script setup lang="ts">
import { computed, inject, toRef, type Ref } from 'vue';

const props = defineProps<{
    modalType: string
}>()
const modalType = toRef(props.modalType);


const showAddUserModal = <Ref>inject('showAddUserModal');
const showEditUserModal = <Ref>inject('showEditUserModal');

const title = computed(() => {
    switch (modalType.value) {
        case 'addUserModal':
            return 'Добавление нового пользователя'
        case 'editUserModal':
            return 'Изменение данных пользователя'
        default:
            return 'Modal'
    }
})

const closeModal = () => {
    switch (modalType.value) {
        case 'addUserModal':
            showAddUserModal.value = false
            break
        case 'editUserModal':
            showEditUserModal.value = false
            break
    }
}
</script>

<template>
    <div class="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-10">
        <div class="bg-white shadow-lg w-96 overflow-hidden">
            <div class="flex justify-between items-center bg-blue-500 text-white p-2">
                <h2 class=" text-lg font-bold">{{ title }}</h2>
                <button @click="closeModal" class="bloc font-bold">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div class="p-5">
                <slot />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { inject, ref, type Ref } from 'vue';
import Modal from '@/components/Modal.vue';

const showUserLastname = <Ref>inject('showUserLastname');
defineEmits(['toggleShowUserLastname', 'showModal']);

const modalRef = ref();
const showAddUserModal = () => {
    modalRef.value.openModal('AddUserModal');
};
</script>

<template>
    <header class="flex p-3 h-16 gap-4">
        <button class="bg-blue-500 px-3 py-2 text-white" @click="showAddUserModal">Добавить
            пользователя</button>
        <div class="flex items-center">
            <input id="show-lastname-checkbox" type="checkbox" @change="$emit('toggleShowUserLastname')"
                :checked="showUserLastname" class="w-4 h-4">
            <label for="show-lastname-checkbox" class="ml-1 hover:cursor-pointer">Показывать фамилии</label>
        </div>
    </header>

    <Modal ref="modalRef" />
</template>
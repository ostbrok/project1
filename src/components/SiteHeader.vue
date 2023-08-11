<script setup lang="ts">
import { inject, type Ref } from 'vue';

const showUserLastname = <Ref>inject('showUserLastname');
const showAddUserModal = <Ref>inject('showAddUserModal');
</script>

<template>
    <header class="flex p-3 h-16 gap-4">
        <button class="bg-blue-500 px-3 py-2 text-white" @click="showAddUserModal = true">Добавить
            пользователя</button>
        <div class="flex items-center">
            <input id="show-lastname-checkbox" type="checkbox" v-model="showUserLastname" value="true" class="w-4 h-4">
            <label for="show-lastname-checkbox" class="ml-1 hover:cursor-pointer">Показывать фамилии</label>
        </div>
    </header>
</template>
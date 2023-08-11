<script setup lang="ts">
import { provide, ref } from 'vue';
import SiteHeader from '@/components/SiteHeader.vue';
import UsersList from '@/components/UsersList.vue';

const showUserLastname = ref(true);
provide('showUserLastname', showUserLastname)

const toggleShowUserLastname = () => {
  showUserLastname.value = !showUserLastname.value
}
</script>

<template>
  <div class="container">
    <SiteHeader @toggleShowUserLastname="toggleShowUserLastname" />
    <UsersList />
  </div>
</template>

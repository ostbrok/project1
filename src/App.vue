<script setup lang="ts">
import { provide, ref } from 'vue';
import SiteHeader from '@/components/SiteHeader.vue';
import UsersList from '@/components/UsersList.vue';
import BaseModal from '@/components/BaseModal.vue';
import AddUserForm from '@/components/AddUserForm.vue';

const showUserLastname = ref(true);
const showAddUserModal = ref(false);
const showEditUserModal = ref(false);

provide('showUserLastname', showUserLastname)
provide('showAddUserModal', showAddUserModal)
provide('showEditUserModal', showEditUserModal)
</script>

<template>
  <div class="container">
    <SiteHeader />
    <UsersList />
  </div>

  <BaseModal v-if="showAddUserModal" modalType="addUserModal">
    <AddUserForm />
  </BaseModal>
</template>

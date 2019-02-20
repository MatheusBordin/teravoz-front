<template>
  <div class="user">
    <UserList />
    <UserCreate />
  </div>
</template>

<script>
import UserList from '@/components/UserList.vue';
import UserCreate from '@/components/UserCreate.vue';

export default {
  name: 'user',
  components: { UserList, UserCreate }
}
</script>


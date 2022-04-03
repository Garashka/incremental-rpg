<template>
  <div>{{ userStore.playerName }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useUserStore } from 'src/stores/user';

export default defineComponent({
  setup() {
    const userStore = useUserStore();

    return {
      userStore,
    };
  },
});
</script>

<style scoped></style>

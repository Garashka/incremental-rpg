<template>
  <div class="row q-gutter-md">
    <q-btn color="primary" @click="clearSave()">Clear Save</q-btn>
    <q-btn color="primary" @click="goToPrevious()">Go to Previous Scene</q-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useSceneStore } from 'src/stores/scene';
import { useUserStore } from 'src/stores/user';

export default defineComponent({
  setup() {
    const router = useRouter();
    const sceneStore = useSceneStore();

    function clearSave() {
      localStorage.clear();
      useUserStore().$reset();
      sceneStore.$reset();

      router.push('/');
    }
    function goToPrevious() {
      sceneStore.goToPrevious();
    }
    return {
      clearSave,
      goToPrevious,
    };
  },
});
</script>

<style scoped></style>

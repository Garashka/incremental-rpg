<template>
  <NavigateButton
    v-for="neighbour in sceneStore.neighbours"
    :key="neighbour.pid"
    :scene-id="neighbour.pid"
  >
    {{ neighbour.name }}
  </NavigateButton>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useSceneStore } from 'src/stores/scene';

export default defineComponent({
  setup() {
    const sceneStore = useSceneStore();

    return {
      sceneStore,
    };
  },
});
</script>

<style scoped></style>

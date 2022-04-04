<template>
  <q-card class="col-md-6 q-page-child">
    <q-card-section>
      <div class="text-h6">{{ sceneStore.title }}</div>
    </q-card-section>
    <q-card-section>
      <span style="white-space: pre-wrap">
        {{ sceneStore.text }}
      </span>
    </q-card-section>
    <q-card-actions>
      <NavigateButton
        v-for="neighbour in sceneStore.neighbours"
        :key="neighbour.pid"
        :scene-id="neighbour.pid"
      >
        {{ neighbour.name }}
      </NavigateButton>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useSceneStore } from 'src/stores/scene';
import NavigateButton from 'src/components/NavigateButton.vue';

export default defineComponent({
  components: { NavigateButton },
  setup() {
    const sceneStore = useSceneStore();

    return {
      sceneStore,
    };
  },
});
</script>

<style scoped></style>

<template>
  <q-btn @click="onClick">
    <slot></slot>
  </q-btn>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useSceneStore } from 'src/stores/scene';

export default defineComponent({
  props: {
    sceneId: {
      type: String,
      required: true,
    },
    name: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const sceneStore = useSceneStore();
    function onClick() {
      if (props.name) {
        sceneStore.setSceneByName(props.sceneId);
      } else {
        sceneStore.setSceneById(props.sceneId);
      }
    }
    return {
      onClick,
    };
  },
});
</script>

<style scoped></style>

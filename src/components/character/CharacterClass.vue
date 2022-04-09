<template>
  <q-card>
    <q-card-section>
      {{ characterClass.name }}
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { CharacterClass } from 'src/models/character/player/character-classes';

export default defineComponent({
  props: {
    characterClass: {
      type: Object as PropType<CharacterClass>,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>

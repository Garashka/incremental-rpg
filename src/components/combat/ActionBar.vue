<template>
  <div class="fit row wrap justify-start items-start content-start q-gutter-md">
    <div v-for="(skill, key) in skills" :key="key" class="">
      <q-btn class="btn btn-primary">{{ skill.name }}</q-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useUserStore } from 'src/stores/user';
import { Character } from 'src/models/character/character';

export default defineComponent({
  props: {
    character: {
      type: Character,
      required: true,
    },
  },
  setup(props) {
    console.log(props.character.skills);
    return {
      skills: props.character.skills,
    };
  },
});
</script>

<style scoped></style>

<template>
  <div class="fit row wrap justify-start items-start content-start q-gutter-md">
    <div v-for="(skill, key) in skills" :key="key" class="">
      <q-btn class="btn btn-primary" @click="useSkill(skill)">{{ skill.name }}</q-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useBattleStore } from 'stores/battle';
import { Character } from 'models/character/player/player-character';
import { Skill } from 'models/skill-system/skill';

export default defineComponent({
  props: {
    character: {
      type: Character,
      required: true,
    },
  },
  setup(props) {
    const battleStore = useBattleStore();
    function useSkill(skill: Skill): void {
      const target = battleStore.enemies[0];
      props.character.useSkill(skill, target);
    }

    return {
      skills: props.character.skills,
      useSkill,
    };
  },
});
</script>

<style scoped></style>

<template>
  <div class="row">
    <q-card v-if="playerCharacter">
      <q-card-section> Name: {{ playerCharacter.name }} </q-card-section>
      <q-card-section>
        HP: {{ playerCharacter.health }}/{{ playerCharacter.maxHealth }}
      </q-card-section>
    </q-card>
    <q-card v-for="(enemy, key) in enemies" :key="key">
      <q-card-section>
        {{ enemy.name }}
      </q-card-section>
      <q-card-section> HP: {{ enemy.health }}/{{ enemy.maxHealth }} </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useUserStore } from 'src/stores/user';
import { useBattleStore } from 'src/stores/battle';

export default defineComponent({
  setup() {
    const userStore = useUserStore();
    const battleStore = useBattleStore();

    return {
      playerCharacter: userStore.playerCharacter,
      enemies: battleStore.enemies,
    };
  },
});
</script>

<style scoped></style>

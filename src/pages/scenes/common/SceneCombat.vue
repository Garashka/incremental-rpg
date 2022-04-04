<template>
  <q-card class="col-md-6 q-page-child">
    <q-card-section>
      <div class="text-h6">{{ sceneStore.title }}</div>
    </q-card-section>
    <q-card-section>
      <div id="combat-content" class="fit row justify-center q-gutter-md">
        <MessageLog :messages="battleLog" />
        <ActionBar v-if="userStore.playerCharacter" :character="userStore.playerCharacter" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useSceneStore } from 'src/stores/scene';
import { useUserStore } from 'src/stores/user';
import { useBattleStore } from 'src/stores/battle';
import MessageLog from 'src/components/MessageLog.vue';
import ActionBar from 'src/components/combat/ActionBar.vue';
import { useBattleLog } from 'src/composable/BattleLog';

export default defineComponent({
  components: { MessageLog, ActionBar },
  setup() {
    const sceneStore = useSceneStore();
    const userStore = useUserStore();
    const battleStore = useBattleStore();
    const { battleLog } = useBattleLog();

    battleStore.startBattle();

    return {
      battleLog,
      sceneStore,
      userStore,
    };
  },
});
</script>

<style scoped></style>

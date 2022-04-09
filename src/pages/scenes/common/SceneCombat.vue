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
    <q-card-section v-if="showDebug">
      <CombatDebugInfo />
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useSceneStore } from 'src/stores/scene';
import { useUserStore } from 'src/stores/user';
import MessageLog from 'src/components/MessageLog.vue';
import ActionBar from 'src/components/combat/ActionBar.vue';
import CombatDebugInfo from 'src/components/debug/CombatDebugInfo.vue';
import { useBattleLog } from 'src/composable/BattleLog';
import { useBattleController } from 'src/composable/BattleController';

export default defineComponent({
  components: { MessageLog, ActionBar, CombatDebugInfo },
  setup() {
    const sceneStore = useSceneStore();
    const userStore = useUserStore();
    const battleController = useBattleController();
    const { battleLog } = useBattleLog();

    battleController.startBattle();

    return {
      battleLog,
      sceneStore,
      userStore,
      showDebug: userStore.isDebugMode,
    };
  },
});
</script>

<style scoped></style>

import { defineStore } from 'pinia';
import { createEnemiesByEncounter, EnemyCharacter } from 'src/models/enemy';
import MessageLog from 'src/models/message-log';
import { getRandomSceneEncounter } from 'src/models/scenes/encounter';
import { useSceneStore } from 'src/stores/scene';
import { useBattleLog } from 'src/composable/BattleLog';

export interface BattleState {
  isInBattle: boolean;
  isPlayerTurn: boolean;
  enemies: EnemyCharacter[];
  battleLog: MessageLog;
}

export const useBattleStore = defineStore({
  id: 'battle',

  state: (): BattleState => ({
    isInBattle: false,
    isPlayerTurn: true,
    enemies: [],
    battleLog: new MessageLog(),
  }),
  persist: {},
  getters: {},
  actions: {
    startBattle() {
      const currentScene = useSceneStore().sceneData;
      if (!currentScene) {
        return;
      }

      const { addToBattleLog } = useBattleLog();

      this.isInBattle = true;
      const encounterData = getRandomSceneEncounter(currentScene);
      this.enemies = createEnemiesByEncounter(encounterData);

      addToBattleLog(`You find a ${this.enemies[0].name}`);
      addToBattleLog(`The ${this.enemies[0].fullName} glares at you warily.`);
    },
  },
});

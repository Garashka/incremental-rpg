import { defineStore } from 'pinia';
import { EnemyCharacter } from 'models/character/enemy-character';

export interface BattleState {
  isInBattle: boolean;
  isPlayerTurn: boolean;
  enemies: EnemyCharacter[];
}

export const useBattleStore = defineStore({
  id: 'battle',

  state: (): BattleState =>
    ({
      isInBattle: false,
      isPlayerTurn: true,
      enemies: [],
    } as BattleState),
  persist: {},
  getters: {
    getEnemies(state): EnemyCharacter[] {
      return state.enemies as EnemyCharacter[];
    },
  },
  actions: {},
});

import { defineStore } from 'pinia';

export interface BattleState {
  isInBattle: boolean;
  isPlayerTurn: boolean;
}

export const useUserStore = defineStore({
  id: 'battle',

  state: (): BattleState => ({
    isInBattle: false,
    isPlayerTurn: true,
  }),
  persist: {},
  getters: {},
  actions: {
    startBattle() {
      this.isInBattle = true;
    },
  },
});

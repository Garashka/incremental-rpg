import { defineStore } from 'pinia';
import { Character, ICharacterDataModel } from 'models/character/player/player-character';

export interface UserState {
  playerCharacter?: Character;
  gold: number;
  isDebugMode: boolean;
}

export const useUserStore = defineStore({
  id: 'user',

  state: (): UserState =>
    ({
      gold: 0,
      playerCharacter: undefined,
      isDebugMode: true,
    } as UserState),
  persist: {
    serializer: {
      serialize: JSON.stringify,
      deserialize: (state) => {
        return JSON.parse(state, (key, value) => {
          if (key === 'playerCharacter') {
            return new Character(value as ICharacterDataModel);
          }
          return value;
        });
      },
    },
  },
  getters: {
    isNewUser(state) {
      return state.playerCharacter === undefined;
    },
    playerName(state) {
      return state.playerCharacter?.name || '';
    },
    getCharacter(state): Character {
      if (!state.playerCharacter) {
        throw new Error('No player character found');
      }
      return state.playerCharacter as Character;
    },
  },
  actions: {
    setPlayerCharacter(character: Character) {
      if (this.playerCharacter) {
        console.error('User already has a player character');
        return;
      }

      this.playerCharacter = character;
    },
  },
});

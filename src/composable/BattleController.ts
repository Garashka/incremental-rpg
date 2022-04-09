import { useBattleLog } from './BattleLog';
import { useBattleStore } from 'stores/battle';
import { useSceneStore } from 'stores/scene';
import { useUserStore } from 'stores/user';
import { createEnemiesByEncounter } from 'models/character/enemy-character';
import { CharacterBase } from 'models/character/character-base';
import { getRandomSceneEncounter } from 'models/scenes/encounter';
import { Character } from 'models/character/player/player-character';

export function useBattleController() {
  const { addToBattleLog, clearBattleLog } = useBattleLog();
  const battleStore = useBattleStore();
  const userStore = useUserStore();
  let turnOrder = [] as CharacterBase[];
  let turnIndex = 0;

  const canStartBattle = () => {
    const currentScene = useSceneStore().sceneData;
    if (!currentScene) {
      return false;
    }
    return !battleStore.isInBattle;
  };

  const startBattle = () => {
    const currentScene = useSceneStore().sceneData;
    if (!currentScene || !userStore.playerCharacter) {
      // if (!canStartBattle() || !currentScene) {
      return;
    }

    battleStore.isInBattle = true;

    const encounterData = getRandomSceneEncounter(currentScene);
    battleStore.enemies = createEnemiesByEncounter(encounterData);

    addToBattleLog(`You find a ${battleStore.enemies[0].name}`);
    addToBattleLog(`The ${battleStore.enemies[0].fullName} glares at you warily.`);
    if (!userStore.playerCharacter) {
      return;
    }

    turnOrder = [userStore.getCharacter, ...battleStore.getEnemies];
  };

  const resumeBattle = () => {
    return;
  };

  const endBattle = () => {
    battleStore.isInBattle = false;
    battleStore.enemies = [];
    clearBattleLog();
  };

  const nextTurn = () => {
    turnIndex += 1;
  };

  const getCurrentTurn = () => {
    return turnOrder[turnIndex];
  };

  const doEnemyTurn = () => {
    const currentCharacter = getCurrentTurn();
    return;
  };

  const killCharacter = (character: CharacterBase) => {
    const index = turnOrder.indexOf(character);
    if (index > -1) {
      turnOrder.splice(index, 1);
    }
    if (character.isPlayerCharacter) {
      // todo: handle player death
    }
  };

  return {
    startBattle,
    resumeBattle,
    endBattle,
    nextTurn,
    killCharacter,
  };
}

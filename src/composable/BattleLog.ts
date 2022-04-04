import { reactive } from 'vue';
import MessageLog from 'src/models/message-log';

const state = reactive({
  log: new MessageLog(),
});

export function useBattleLog() {
  const clearBattleLog = () => {
    state.log.clear();
  };

  const addToBattleLog = (message: string) => {
    state.log.addItem(message);
  };

  return {
    battleLog: state.log,
    clearBattleLog,
    addToBattleLog,
  };
}

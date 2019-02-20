import each from 'lodash/each';

export default {
  computed: {
    pc() {
      return this.$store.getters.pc;
    },
    isPartyAlive() {
      let result = false;
      each(this.$store.state.actor.party, (value, key) => {
        if (value.currentHealth > 0) {
          result = true;
          return false;
        } return true;
      });
      return result;
    },
    isPCAlive() {
      return this.pc.currentHealth > 0;
    },
    isHealthMissing() {
      let result = false;
      each(this.$store.state.actor.party, (value) => {
        if (value.currentHealth < value.maxHealth) {
          result = true;
          return false;
        } return true;
      });
      return result;
    },
    isEnemyAlive() {
      if (this.enemy) {
        if (this.enemy.currentHealth > 0) {
          return true;
        } return false;
      } return false;
    },
    inBattle() {
      return this.$store.getters.inBattle;
    },
    inEvent() {
      return this.$store.getters.inEvent;
    },
    canNavigate() {
      return (this.inBattle && this.inEvent);
    },
    getCurrentEvent() {
      return this.$store.state.events.currentEvent;
    },
  },
};

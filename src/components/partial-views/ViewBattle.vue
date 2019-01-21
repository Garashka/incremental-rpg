TODO: Replace caster, target in combat actions with support for multiple targets

<template>
    <div class="combat" id="combat-content">
        <div class="combatLog" id="combatLog">
          <p class="combatText"
          v-for="(msg, index) in messages"
          :key="index"
          >{{ msg }}</p>
        </div>
        <div class="combatMenu" id="combatMenu" v-if="isEnemyAlive && isPartyAlive">
          <ButtonTacticAction v-if="isTacticsUnlocked"
            :battle="battle"
            :casterIndex="0"
            @update="update"
            @nextTurn="nextTurn"
            @addToLog="addToLog"
          />
          <ButtonCombatAction v-for="(action, index) in combatActions"
            :key="index"
            :action="action"
            :caster="pc"
            :target="enemy"
            @update="update"
            @nextTurn="nextTurn"
            @addToLog="addToLog"
          ></ButtonCombatAction>
        </div>
        <component :is="renderedComponent" @endBattle="endBattle" v-else></component>
        <div class="combatMenu">
          Debug Info
          Actor: {{ this.pc.currentHealth }}/{{ this.pc.maxHealth }}
          <br/>
          Enemy: {{ this.enemy.currentHealth }}/{{ this.enemy.maxHealth }}
        </div>
    </div>
</template>

<script>
import ButtonCombatAction from './ButtonCombatAction.vue';
import ButtonTacticAction from './ButtonTacticAction.vue';
import VictoryButton from './VictoryButton.vue';
import DefeatButton from './DefeatButton.vue';
import statusMixins from '../../mixins/status.js';
import { mapState } from 'vuex';
import { takeBattleTurn } from '../../game/content/enemies';

export default {
  components: {
    ButtonCombatAction,
    VictoryButton,
    DefeatButton,
    ButtonTacticAction,
  },
  mixins: [statusMixins],
  data() {
    return {
      enemy: this.$store.state.currentBattle.enemy,
      actor: this.$store.state.actor,
      combatActions: [],
    };
  },
  created() {
    this.messages.push(`You have encountered a ${this.enemy.name}.`);
    // TODO: Calculate ambush etc.
    this.messages.push(`The ${this.enemy.name} watches you warily.`);
    for (const s of this.pc.availableSkills) {
      this.combatActions.push(s);
    }
  },
  updated() {
    // Called after the message log is re-rendered
    this.scrollToBottom();
  },
  computed: {
    ...mapState({
      messages: state => state.currentBattle.combatLog,
    }),
    pc() {
      return this.$store.getters.pc;
    },
    battle() {
      return this.$store.state.currentBattle;
    },
    renderedComponent() {
      if (this.enemy.currentHealth <= 0) {
        this.rewardPlayer();
        return 'VictoryButton';
      } else if (this.isPartyAlive === false) {
        this.punishPlayer();
        return 'DefeatButton';
      }
    },
    isTacticsUnlocked() {
      return this.$store.state.actor.unlocks.tactics;
    }
  },
  methods: {
    update() {
      this.$store.commit('actor/update', this.actor);
    },

    nextTurn() {
      // TODO: Decide how turn orders will work. 1:1 or more turns with more speed? Chance of extra turn with big speed difference?
      this.enemyTurn({ source: this.enemy, target: this.pc });
    },
    enemyTurn(data) {
      takeBattleTurn(data);
      this.update();
    },
    endBattle() {
      this.$store.commit('endBattle');
    },
    rewardPlayer() {
      const goldGained = 100; // calculateGold(enemy);
      const expGained = 100; // expGained(enemy);
      this.addToLog(`You have gained ${goldGained} gold!`);
      this.addToLog(`You have gained ${expGained} experience!`);
      this.$store.commit('actor/modifyGold', { delta: goldGained });
      this.$store.commit('actor/modifyExperience', { index: 0, delta: expGained });
    },
    punishPlayer() {
      this.addToLog('You have been defeated.');
    },

    addToLog(msg) {
      this.$store.commit('addToCombatLog', msg);
    },
    scrollToBottom() {
      const container = this.$el.querySelector('#combatLog');
      container.scrollTop = container.scrollHeight;
    },
  },
};
</script>

<style>
div.combatLog {
  border: 1px solid black;
  border-right: 2px solid black;
  padding: 1px;
  border-radius: 2px;
  width: 60%;
  height: 300px;
  background: #eff0f1;
  margin: auto;
  margin-top: 20px;
  overflow-y: scroll;
  overflow-x: auto;
}
p.combatText {
  text-align: center;
  margin-bottom: 6px;
  margin-top: 6px;
}

div.combatMenu {
  border: 1px solid black;
  width: 70%;
  min-height: 60px;
  background: #eff0f1;
  margin: auto;
  margin-top: 50px;
}

div.combatButton {
  margin-top: 5px;
  background: white;
  border: none;
  display: inline-block;
  text-decoration: none;
  position: relative;
  text-align: center;
  border: 1px solid black;
  margin: 5px;
  padding: 5px 10px;
  cursor: pointer;
}

</style>

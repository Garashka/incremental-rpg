<template>
    <div v-if="isTacticsUnlocked === false">
        You must unlock this first
    </div>
    <div id="tactics-table" v-else-if="isExistingTactics">
        <table >
            <th>#</th>
            <th>Target</th>
            <th>Condition</th>
            <th>Action</th>
            <th>Options</th>
            <Tactic
            v-for="(tactic, index) in getTactics"
            :key="index"
            :tactic="tactic"
            :selectedCharacter="0"/>
        </table>
        <div class="button" @click="addTactic">
            Add New
        </div>
    </div>
    <div v-else>
        <p>No tactics made yet</p>
        <div class="button" @click="addTactic">
            Add New
        </div>
    </div>
</template>

<script>
import Tactic from './ViewCharacterTacticTemplate.vue';

export default {
  components: {
    Tactic,
  },
  computed: {
    isTacticsUnlocked() {
      return this.$store.state.actor.unlocks.tactics;
    },
    getTactics() {
      return this.$store.state.actor.party[0].tactics;
    },
    isExistingTactics() {
      console.log(this.getTactics);
      return this.getTactics.length > 0;
    },
  },
  methods: {
    addTactic() {
      this.$store.commit('actor/addTactic', { index: 0 });
    },
  },
};
</script>

<style>

</style>

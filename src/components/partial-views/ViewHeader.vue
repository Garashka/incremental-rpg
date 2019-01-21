<template>
    <b-row class="header-content">
        <b-col col sm="2"></b-col>
        <b-col col sm="2">HP: {{ currentHP }}/{{ maxHP}}</b-col>
        <b-col col sm="2">AP: {{ currentAP }}/{{ maxAP }}</b-col>
        <b-col col sm="2">Gold: {{ gold }}</b-col>
        <b-col col sm="2">Exp: {{ experience }}/{{ expToLevel }}</b-col>
    </b-row>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    pc() {
      return this.$store.getters.pc;
    },
    currentHP() {
      return this.pc.currentHealth;
    },
    maxHP() {
      return this.pc.maxHealth;
    },
    currentAP() {
      return this.pc.currentActionPoints;
    },
    maxAP() {
      return this.pc.maxActionPoints;
    },
    gold() {
      return this.$store.state.actor.gold;
    },
    experience() {
      return this.pc.experience;
    },
    expToLevel() {
      return 'TODO';
    },
  },
};
</script>


<style>
#header {
  min-height: 50px;
  background-color: #212529;
  border: 1px black;
  height: 32px; /* height + top/bottom paddding + top/bottom border must add up to footer height */
  padding: 8px;
  color: #868e96;
}
</style>

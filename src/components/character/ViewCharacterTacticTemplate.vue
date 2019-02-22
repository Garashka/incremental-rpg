<template>
    <tr>
        <td>
            {{ index + 1 }}
        </td>
        <td>
          <select v-model="tactic.targetType"
            @input="updateTarget">
            <option v-for="(val, key, index) in tacticTargets"
            :key="index"
            :value="key">
            {{val.text}}
            </option>
          </select>
        </td>
        <td>
          <select v-model="tactic.condition"
          @input="updateCondition">
            <option v-for="(val, key, index) in tacticConditions"
            :key="index"
            :value="key">
            {{val.text}}
            </option>
          </select>
        </td>
        <td>
          <select v-model="tactic.action"
          @input="updateAction">
            <option v-for="(val, index) in availableSkills"
            :key="index"
            :value="val">
            {{skills[val].name}}
            </option>
          </select>
        </td>
    </tr>
</template>

<script>
import each from 'lodash/each';
// https://vuex.vuejs.org/guide/forms.html
// https://vuejs.org/v2/guide/forms.html
import skills from '../../data/content/skills/index';
import { tacticTargets, tacticConditions } from '../../data/content/tactics';

export default {
  props: ['tactic', 'selectedCharacter'],
  components: {
  },
  computed: {
    index() {
      return this.$vnode.key;
    },
    actionName() {
      return skills[this.tactic.action].name;
    },
    tacticTargets() {
      return tacticTargets;
    },
    tacticConditions() {
      return tacticConditions;
    },
    skills() {
      return skills;
    },
    availableSkills() {
      return this.$store.state.actor.party[this.selectedCharacter].availableSkills;
    },
  },
  methods: {
    updateTarget(event) {
      this.$store.commit('actor/setTacticTarget', {
        characterIndex: 0,
        tacticIndex: this.index,
        value: event.target.value,
      });
    },
    updateCondition(event) {
      this.$store.commit('actor/setTacticCondition', {
        characterIndex: 0,
        tacticIndex: this.index,
        value: event.target.value,
      });
    },
    updateAction(event) {
      this.$store.commit('actor/setTacticAction', {
        characterIndex: 0,
        tacticIndex: this.index,
        value: event.target.value,
      });
    },
    setTargetType(val, key) {
      this.$store.commit('actor/setTacticTarget', {
        characterIndex: 0,
        tacticIndex: this.index,
        value: val.key,
      });
    },
    setCondition(val) {
      this.$store.commit('actor/setTacticCondition', {
        characterIndex: 0,
        tacticIndex: this.index,
        value: val,
      });
    },
    log(val) {
    },
  },
};
</script>

<style>
</style>

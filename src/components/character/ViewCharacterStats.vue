<template>
    <div>
        <b>{{character.name}}</b><br />
        Class: {{className}}<br />
        <br />
        Level: {{character.level}}<br />
        Experience: {{character.experience}}<br />
        Renown: {{actor.renown}}<br />
        Prestige: {{actor.prestige}}<br />
<br />
        Health: {{character.currentHealth}}/{{character.maxHealth}}<br />
        Skill Points: {{character.currentActionPoints}}/{{character.maxActionPoints}}<br />
<br />
        Strength: {{character.strength}}<br />
        Intelligence: {{character.intelligence}}<br />
        Dexterity: {{character.dexterity}}<br />
        Perception: {{character.perception}}<br />
        Athletics: {{character.athletics}}<br />
        Physical Defence: {{character.physicalDefence}}<br />
        Magical Defence: {{character.magicalDefence}}<br />

    </div>
</template>

<script>
import klass from '../../data/content/classes';

export default {
  data() {
    return {
      character: this.$store.getters.pc,
      actor: this.$store.state.actor,
    };
  },
  computed: {
    className() {
      return klass[this.character.klass].name;
    },
  },
  methods: {
  },
  created() {
  },
};
</script>

<style>
</style>

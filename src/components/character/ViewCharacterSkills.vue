<template>
    <div>
        <p v-for="(skill, index) in character.availableSkills"
            :key="index"
        >
        <b>{{skillName(skill)}}</b><br />
        {{skillDescription(skill)}}<br />
        Action Point Cost: {{skillAPCost(skill)}}<br />
        Skill Power: {{skillPower(skill)}}
        </p>
    </div>
</template>

<script>
import skills from '../../data/content/skills';

export default {
  data() {
    return {
      character: this.$store.getters.pc,
    };
  },
  methods: {
    skillName(key) {
      return skills[key].name;
    },
    skillDescription(key) {
      return skills[key].description;
    },
    skillAPCost(key) {
      return skills[key].actionPointCost;
    },
    skillPower(key) {
      return skills[key].skillPower;
    },
  },
};
</script>

<style>

</style>

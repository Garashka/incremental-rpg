<template>
    <div>
        <p>
            You start walking down the winding road, towards the town you can see off in the distance.
        </p>
        <p>
            <i>Navigate using the left sidebar (top on mobile)</i>
        </p>
    </div>
</template>

<script>
// import TownCentre from './TownCentre.vue'
export default {
  data() {
    return {
      id: 'IntroRoad',
    };
  },
  computed: {
    name() {
      return this.$store.state.locations[this.id].name;
    },
  },
  components: {
    // TownCentre
  },
  created() {
  },
};
</script>

<style>

</style>

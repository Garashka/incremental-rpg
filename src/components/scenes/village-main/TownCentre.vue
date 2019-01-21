<template>
    <div>
        <p>
            You find yourself in the centre of a small town. You can see a tavern and several small shops are open.
        </p>
    </div>
</template>

<script>
export default {
  data() {
    return {
      id: 'TownCentre',
    };
  },
  computed: {
    name() {
      return this.$store.state.locations[this.id].name;
    },
    neighbouringLocations() {
      return this.$store.state.locations[this.id].neighbouringLocations;
    },
  },
  created() {
  },
};
</script>

<style>

</style>

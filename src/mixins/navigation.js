
export default {
  methods: {
  // For general navigation
    setLocation(key) {
      const location = this.$store.state.locations[key];
      console.log(location);
      console.log(key);
      this.$store.commit('setRenderedTemplate', location.template);
      this.$store.commit('setCurrentLocation', key);
    },
    // For loading option pages
    setTemplate(key) {
      this.$store.commit('setRenderedTemplate', key);
    },
    returnToLast() {
      const location = this.$store.state.locations[this.$store.state.currentLocation];
      this.$store.commit('setRenderedTemplate', location.template);
      this.inOptions = false;
    },
  },
};

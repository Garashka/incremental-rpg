
export default {
  methods: {
  // For general navigation
    setLocation(key) {
      const location = this.$store.state.locations[key];
      this.$store.commit('setRenderedTemplate', location.template);
      this.$store.commit('setCurrentLocation', key);
    },
    // For loading option pages
    setTemplate(key) {
      this.$store.commit('setRenderedTemplate', key);
    },
    returnToLast() {
      this.$store.commit('setRenderedTemplate', this.$store.state.previousLocation);
      this.$store.commit('setCurrentLocation', this.$store.state.previousLocation);
    },
    exitOptions() {
      const location = this.$store.state.locations[this.$store.state.currentLocation];
      this.$store.commit('setRenderedTemplate', location.template);
      this.inOptions = false;
    },
  },
};

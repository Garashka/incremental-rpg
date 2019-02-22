<template>
    <div id="sidebar" class="noSelect">
        <div
          v-if="inBattle === false && inOptions === false && charCreated === true">
          <div class="sidebar-clickable"
            v-for='(location, key) in neighbouringLocations'
            :key='key'
            @click="setLocation(location)">
            {{ locationName(location) }}
          </div>
        </div>
        <div class="sidebar-clickable"
          v-if="inOptions === true"
          @click="exitOptions"
          >
          Return to {{ locationName(this.$store.state.currentLocation) }}
        </div>
        <div class="horizontal-divider"
          v-if="inBattle === false || inOptions === true"
        ></div>
        <!-- {{ optionsMenu }} -->
        <div class="sidebar-clickable"
          @click="setTemplate('ViewCharacter');
              inOptions=true;">
          View Character
        </div>
    </div>
</template>

<script>
import navMixins from '../../mixins/navigation';
import statusMixins from  '../../mixins/status';
import ViewCharacter from '../character/ViewCharacter.vue';

export default {
  props: [],
  components: {
    ViewCharacter,
  },
  mixins: [statusMixins, navMixins],
  data() {
    return {
      inOptions: false,
    };
  },
  computed: {
    neighbouringLocations() {
      const current = this.$store.state.currentLocation;
      if (current == undefined) {
        return [];
      }
      return this.$store.getters['locations/neighbouringLocations'](current);
    },
    charCreated() {
      return this.$store.state.actor.initialised;
    },
  },
  methods: {
    locationName(location) {
      return this.$store.state.locations[location].name;
    },
  },
};
</script>

<style>
#sidebar {
  background-color: #212529;
  border: 5px black;
  color: #868e96;
  height: 100%;
}
.sidebar-clickable:hover {
  color: black;
  text-decoration: underline;
  cursor: pointer;
}

div.horizontal-divider {
  padding-bottom: 3px;
  border-bottom: 3px solid #868e96;
  margin-bottom: 3px;
  margin-left: 6px;
  margin-right: 6px;
}
</style>

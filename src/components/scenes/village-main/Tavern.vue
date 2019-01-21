/*
Adds carouse feature
Randomly cost gold and/or life to encounter events
E.g. get minor buffs (fortified ale -> strength increase)
Encounter recruiters to unlock soldier
Part of bard unlock
*/

<template>
    <div v-if="renderedComponent === 'default'">
        <p>Many tables and a few patrons.</p>
        <div class="button noSelect" @click="encounter">Order a drink</div>
    </div>
    <EventTemplate :eventID="getCurrentEvent" v-else-if="renderedComponent === 'event'" @endEvent=endEvent />
</template>


<script>
import EventTemplate from "../../template-views/EventTemplate.vue";
import statusMixins from "../../../mixins/status";
import events from "../../../game/content/events";

export default {
  components: {
    EventTemplate
  },
  mixins: [statusMixins],
  data() {
    return {
      id: "Tavern"
    };
  },
  computed: {
    renderedComponent() {
      if (this.inEvent) {
        return "event";
      }
      return "default";
    },
    locationData() {
      return this.$store.state.locations[this.id];
    }
  },
  methods: {
    encounter() {
      let rnd = Math.random() * 100;
      if (rnd <= this.locationData.specialEventChance) {
        this.findEvent();
      } else {
        this.$store.commit("startEvent", this.locationData.defaultEvent);
      }
    },
    findEvent() {
      const availableEvents = this.locationData.events.filter(event =>
        events[event].isAvailable()
      );
      if (availableEvents.length === 0) {
        this.$store.commit("startEvent", this.locationData.defaultEvent);
      }
    },
    endEvent() {
      this.$store.commit("endEvent");
    }
  },
  created() {}
};
</script>

<style>
</style>

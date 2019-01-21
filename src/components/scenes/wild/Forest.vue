<template>
    <div v-if="inBattle === false && inEvent === false && isPCAlive === true">
      <p>Deep in the forest, wild beasts roam.</p>
      <div class="button noSelect" @click="encounter">Look for a fight</div>
    </div>
    <div v-else-if="isPCAlive === false && inBattle === false">
      <p>You are too injured to explore.</p>
      <div class="button noSelect" @click="setLocation('VillageHealer')">Visit Healer</div>
    </div>
    <component :is="renderedComponent" :eventID="getCurrentEvent" @endEvent="endEvent" v-else/>
</template>

<script>
import ViewBattle from "../../partial-views/ViewBattle.vue";
import EventTemplate from "../../template-views/EventTemplate.vue";
import enemies from "../../../game/content/enemies";
import statusMixins from "../../../mixins/status";
import navMixins from '../../../mixins/navigation'

export default {
  components: {
    ViewBattle,
    EventTemplate
  },
  mixins: [statusMixins, navMixins],
  data() {
    return {
      id: "Forest"
    };
  },
  computed: {
    name() {
      return this.$store.state.locations[this.id].name;
    },
    neighbouringLocations() {
      return this.$store.state.locations[this.id].neighbouringLocations;
    },
    eventChance() {
      return this.$store.state.locations[this.id].eventChance;
    },
    renderedComponent() {
      if (this.inBattle === true) {
        return "ViewBattle";
      } else if (this.inEvent === true) {
        return "EventTemplate";
      }
    }
  },
  methods: {
    encounter() {
      if (this.$store.getters.isPartyDefeated === false) {
        let rnd = 0;
        if (this.$store.state.actor.unlocks.events === true) {
          rnd = Math.random() * 100;
        } else {
          rnd = 100;
        }
        if (rnd <= this.eventChance) {
          this.findEvent();
        } else {
          this.findBattle();
        }
      }
    },
    findBattle() {
      const enemy = this.$store.getters["locations/getEnemyEncounter"](this.id);
      this.$store.commit("startBattle", enemy);
    },
    findEvent() {
      const events = this.$store.state.locations[this.id].events;
      const rnd = Math.floor(Math.random() * events.length);
      this.$store.commit("startEvent", events[rnd]);
    },
    endEvent() {
      this.$store.commit("endEvent");
    },
  },
  created() {}
};
</script>

<style>
</style>

<template>
        <div id='body'>
            <h1>{{pageTitle}}</h1>
            <component :is='renderedTemplate'></component>
        </div>
</template>

<script>
import { mapState } from "vuex";
import CharacterCreation from "../scenes/character-creation/CreateCharacter.vue";
import TownCentre from "../scenes/village-main/TownCentre.vue";
import IntroRoad from "../scenes/village-main/IntroRoad.vue";
import ViewCharacter from "../character/ViewCharacter.vue";
import Shop from "../template-views/ShopTemplate.vue";
import Forest from "../scenes/wild/Forest.vue";
import Tavern from "../scenes/village-main/Tavern.vue";
import Healer from "../scenes/village-main/Healer.vue";
import Monastery from "../scenes/village-main/Monastery.vue";
import events from '../../data/content/events';
import statusMixins from '../../mixins/status';

export default {
  components: {
    CharacterCreation,
    TownCentre,
    IntroRoad,
    ViewCharacter,
    Forest,
    Shop,
    Tavern,
    Healer,
    Monastery
  },
  mixins: [statusMixins],
  computed: {
    renderedTemplate() {
      return this.$store.state.renderedTemplate;
    },
    currentLocation() {
      return this.$store.state.currentLocation;
    },
    pageTitle() {
      
      if (this.inEvent) {
        return this.eventName;
      } return this.locationName;
    },
    eventName() {
        return events[this.$store.state.events.currentEvent].title;
    },
    locationName() {
      return this.$store.state.locations[this.currentLocation].name;
    }
  },
  methods: {}
};
</script>

<style>
#body {
  min-height: 500px;
  margin: 10px;
}

.button {
  position: relative;
  text-align: center;
  border: 1px solid black;
  min-width: 100px;
  margin: 5px;
  padding: 5px 10px;
  cursor: pointer;
  display: inline-block;
}

.tooExpensive {
  text-decoration: line-through;
}

.button.tooExpensive {
  cursor: default;
}

.noSelect {
  /* Prevent selecting button text */
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Chrome, Opera */
}

h1 {
  text-align: left;
  font-size: 1.5em;
}
</style>



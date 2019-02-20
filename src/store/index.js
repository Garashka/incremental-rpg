import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';

import actor from './modules/actor';
import locations from './modules/locations';

import enemies from '../data/content/enemies';

Vue.use(Vuex);

const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage,
  reducer: state => ({
    version: state.version,
    actor: state.actor,
    currentBattle: state.currentBattle,
    currentLocation: state.currentLocation,
    renderedTemplate: state.renderedTemplate,
  }),
});

function currentBattle() {
  return {
    enemy: {},
    combatLog: [],
    inBattle: false,
  };
}

function initialState() {
  return {
    version: '0.0.1',
    neighbouringLocations: [],
    currentBattle: currentBattle(),
    renderedTemplate: 'CharacterCreation',
    previousLocation: '',
    currentLocation: 'IntroRoad',
  };
}


export default new Vuex.Store({
  state: {
    version: '0.0.1',
    neighbouringLocations: [],
    currentBattle: {
      enemy: {},
      party: {},
      currentTurn: null,
      combatLog: [],
      inBattle: false,
    },
    events: {
      inEvent: false,
      currentEvent: '',
    },
    renderedTemplate: 'CharacterCreation',
    previousLocation: 'IntroRoad',
    currentLocation: 'IntroRoad',
  },
  getters: {
    pc(state) {
      return state.actor.party[0];
    },
    party(state) {
      return state.actor.party;
    },
    inBattle(state) {
      return state.currentBattle.inBattle;
    },
    inEvent(state) {
      return state.events.inEvent;
    },
    isPartyDefeated(state, getters) {
      if (getters.pc.currentHealth <= 0) {
        if (state.actor.unlocks.party === true) {
          // TODO:
        }
        return true;
      }
      return false;
    },
    currentLocationData(state) {
      return state.locations[state.currentLocation];
    },
  },
  actions: {
    reset(context) {
      context.commit('actor/reset');
      context.commit('reset');
    },
  },
  mutations: {
    onLocationChange(state, neighbours) {
      state.neighbouringLocations = neighbours;
    },

    startBattle(state, key) {
      state.currentBattle.enemy = { ...enemies[key] };
      state.currentBattle.party = state.actor.party;
      state.currentBattle.currentTurn = state.actor.party[0];
      state.currentBattle.inBattle = true;
    },
    setTurn(state, turn) {
      state.currentBattle.currentTurn = turn;
    },
    endBattle(state) {
      state.currentBattle = currentBattle();
    },

    addToCombatLog(state, msg) {
      state.currentBattle.combatLog.push(msg);
    },

    startEvent(state, key) {
      state.events.currentEvent = key;
      state.events.inEvent = true;
    },
    endEvent(state) {
      state.events.currentEvent = '';
      state.events.inEvent = false;
    },

    reset(state) {
      const s = initialState();
      Object.keys(s).forEach((key) => {
        state[key] = s[key];
      });
    },

    setRenderedTemplate(state, template) {
      state.renderedTemplate = template;
    },
    setCurrentLocation(state, location) {
      state.previousLocation = state.currentLocation;
      state.currentLocation = location;
    },
  },
  modules: {
    actor, locations,
  },
  plugins: [vuexLocalStorage.plugin],
});

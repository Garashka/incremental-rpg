// import each from 'lodash/each';

const state = {
  IntroRoad: {
    name: 'Old Road',
    template: 'IntroRoad',
    neighbouringLocations: ['TownCentre'],
  },
  TownCentre: {
    name: 'Town Centre',
    template: 'TownCentre',
    neighbouringLocations: ['IntroRoad', 'WeaponShop', 'ArmourShop', 'Tavern', 'VillageHealer', 'Monastery', 'Forest'],
  },
  Tavern: {
    name: 'Tavern',
    template: 'Tavern',
    neighbouringLocations: ['TownCentre'],
    events: ['event_class_unlockSoldier'],
    defaultEvent: 'event_tavern_orderDrink',
    specialEventChance: 100,
  },
  VillageHealer: {
    name: 'Village Healer',
    template: 'Healer',
    neighbouringLocations: ['TownCentre'],
  },
  Monastery: {
    name: 'Monastery',
    template: 'Monastery',
    neighbouringLocations: ['TownCentre'],
  },
  WeaponShop: {
    name: 'Weapon Shop',
    template: 'Shop',
    neighbouringLocations: ['TownCentre'],
    inventory: ['wpn_pitchfork', 'wpn_short_sword', 'wpn_simple_staff'],
  },
  ArmourShop: {
    name: 'Armour Shop',
    template: 'Shop',
    neighbouringLocations: ['TownCentre'],
    inventory: ['arm_simple_robe', 'arm_leather_armour', 'arm_iron_chainmail'],
  },
  Forest: {
    name: 'Forest',
    template: 'Forest',
    neighbouringLocations: ['TownCentre'],
    enemies: ['lvl1_wild_dog', 'lvl1_boar'],
    events: ['event_wanderingJourneymanSharpenWeapon'],
    eventChance: 10,
  },
};

const getters = {
  getEnemyEncounter: state => location =>
    state[location].enemies[Math.floor(Math.random() * state[location].enemies.length)],
  neighbouringLocations: state => location =>
    state[location].neighbouringLocations,
};

const actions = {

};

const mutations = {
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

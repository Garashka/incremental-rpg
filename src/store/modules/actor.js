import each from 'lodash/each';
import { tacticTemplate } from '../../data/content/tactics';
import characterModel from '../../data/models/character';
import characterClasses from '../../data/content/classes';
import { Item } from '../../data/models/item';
import { allItems } from '../../data/content/items/index'

// TODO: Make PC array position 0 in party and add a flag for pc == true
// Should make it easier to update character data

function initialState() {
  return {
    initialised: false,
    title: '',
    party: [{
      ...characterModel(),
      pc: true,
      // name: '',
      // gender: '',
      // klass: '',
      // pc: true,
    }],
    gold: 100,
    renown: 0,
    prestige: 0,
    inventory: [],

    unlocks: {
      party: false,
      tactics: true,
      achievements: false,
      events: true,
    },
  };
}

const state = initialState();

const getters = {
};

const actions = {};

const mutations = {
  initCharacter(state) {
    // each(characterModel.characterModel, (value, key) => {
    //   state.party[0][key] = value;
    // });
    Object.assign(state.party[0], characterModel());
  },


  modifyHealth(state, props) {
    state.party[props.index].currentHealth += props.delta;
  },
  setHealth(state, props) {
    state.party[props.index].currentHealth = props.value;
  },
  resetHealth(state) {
    state.party[0].currentHealth = state.party[0].maxHealth;
  },

  modifyAP(state, props) {
    state.party[props.index].currentActionPoints += props.delta;
  },
  setAP(state, props) {
    state.party[props.index].currentActionPoints = props.value;
  },
  resetAP(state) {
    state.party[0].currentActionPoints = state.party[0].maxActionPoints;
  },

  modifyExperience(state, props) {
    state.party[props.index].experience += props.delta;
    // TODO: Apply to all party members? Just have everything at same level as PC?
  },

  modifyGold(state, props) {
    state.gold += props.delta;
  },
  setGold(state, props) {
    state.gold = props.value;
  },

  modifyRenown(state, props) {
    state.renown += props.delta;
  },

  addToInventory(state, itemKey, equip = false) {
    // if (equip === true) {
    //   // TODO
    // }
    // state.inventory.push(item);
    let data = allItems.find(i => i.id == itemKey);
    let item = new Item(data);
    inventory.push(item);
  },

  addTactic(state, props) {
    state.party[props.index].tactics.push(tacticTemplate());
  },
  setTacticTarget(state, props) {
    state.party[props.characterIndex].tactics[props.tacticIndex].targetType = props.value;
  },
  setTacticCondition(state, props) {
    state.party[props.characterIndex].tactics[props.tacticIndex].condition = props.value;
  },
  setTacticAction(state, props) {
    state.party[props.characterIndex].tactics[props.tacticIndex].action = props.value;
  },

  updateName(state, props) {
    state.party[props.index].name = props.name;
  },


  setGender(state, props) {
    state.party[props.index].gender = props.gender;
  },

  setClass(state, props) {
    state.party[props.index].klass = props.klass;
    const classData = characterClasses[props.klass];
    each(classData.startingBonus, (value, key) => {
      state.party[props.index][key] += value;
    });
    state.party[props.index].statGrowth = classData.statGrowth;

    each(classData.inventory, (val) => {
      let equipped;
      if (classData.defaultEquippedWeapons.includes(val)) {
        equipped = true;
      } else equipped = false;
      state.addToInventory(val, equipped);

      // const item = Item(findByID(val));
      // state.inventory.push(item);
      // if (classData.defaultEquippedWeapons.includes(val)) {
      //   item.equipped = true;
      //   state.party[props.index].equippedWeapons.push(item);
      // }
    });

    state.party[props.index].availableSkills =
      state.party[props.index].availableSkills.concat(classData.availableSkills);
    // TODO: Only add skills that are unlocked
    state.party[props.index].allSkills =
      state.party[props.index].allSkills.concat(classData.allSkills);
    state.initialised = true;
    state.party[props.index].currentHealth = state.party[props.index].maxHealth;
    state.party[props.index].currentActionPoints = state.party[props.index].maxActionPoints;
  },

  update(state, props) {
    // TODO: Update for party members too
    state[props.index] = props.update;
  },
  addItemEnhancement(state, props) {
    // console.log(state.party[props.characterIndex][props.itemSlot][props.itemIndex].addEffect);
    let item = state.party[props.characterIndex][props.itemSlot][props.itemIndex];
    item = addEnhancement(item, props.effect);
    console.log(item);
    // state.party[props.characterIndex][props.itemSlot][props.itemIndex].addEffect(props.effect);
  },
  replaceWeapon(state, props) {
    state.party[props.characterIndex].equippedWeapons[props.weaponIndex] = props.newWeapon;
  },


  reset(state) {
    const s = initialState();
    // Object.keys(s).forEach((key) => {
    //   // if (key === 'tactics') {
    //   console.log(key);
    //   // }
    //   state[key] = s[key];
    // });
    Object.assign(state, s);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

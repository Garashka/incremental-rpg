import each from 'lodash/each';
import { itemEffects } from './effects';
// TODO: instantiate items as new class objects when they are added to inventory, instead of at
// runtime and then cloning - doesn't work as objects lose functions when pushed to LocalStorage
// TODO: Store items as objects only, have a library of functions here to manipulate them
// Use mixins to manipulate them on page in order to simplify.
// Remove classes (pointless - functions lost on storage,
// unless can work out how to add them back when rehydrating)

class Item {
  constructor(dict, equipped = false) {
    this.name = dict.name;
    this.description = dict.description;
    this.cost = dict.cost;
    this.stats = dict.stats;
    this.slot = dict.slot;
    this.equipped = equipped;
    if (dict.enhancements) {
      this.enhancements = dict.enhancements;
    } else {
      this.enhancements = {};
    }
    if (dict.essential) {
      this.essential = dict.essential;
    } else this.essential = false;

    // Stats refers to item's inherent modifiers
    // Effects refers to extra stats added after acquiring
  }
  output() {
    return `${this.name}<br/>${this.description}<br/>`;
  }
}


class Weapon extends Item {
  output() {
    return `<b>${this.name}</b><br/>${this.description}<br/>Damage: ${this.basePhysicalDamage}`;
  }
}

class Armour extends Item {
  // constructor(dict) {
  //   super(dict);
  // }
  output() {
    return `<b>${this.name}</b><br/>${this.description}<br/>Damage: ${this.basePhysicalDamage}`;
  }
}

class Companion extends Item {
  constructor(dict) {
    super(dict);
    this.basePhysicalDamage = dict.basePhysicalDamage;
    this.behaviour = dict.behaviour;
    this.busy = false;
  }
}


const weapons = {
  wpn_pitchfork: {
    name: 'Pitchfork',
    description: "Pitchfork Emporium's Finest",
    slot: 'mainhand',
    stats: {
      basePhysicalDamage: 4,
    },
    cost: 50,
  },
  wpn_short_sword: {
    name: 'Short Sword',
    description: 'A simple but functional weapon',
    slot: 'mainhand',
    essential: true,
    stats: {
      basePhysicalDamage: 10,
    },
    cost: 200,
  },
  wpn_simple_staff: {
    name: 'Simple Staff',
    description: 'A simple but functional weapon',
    slot: 'mainhand',
    stats: {
      basePhysicalDamage: 2,
      baseMagicDamage: 3,
    },
    cost: 200,
  },
};

const armour = {
  arm_simple_robe: {
    name: 'Simple Robe',
    description: '',
    slot: 'body',
    stats: {
      basePhysicalDefence: 1,
      baseMagicDefence: 2,
    },
    cost: 50,
  },
  arm_leather_armour: {
    name: 'Leather Armour',
    description: '',
    slot: 'body',
    stats: {
      basePhysicalDefence: 2,
      baseMagicDefence: 1,
    },
    cost: 50,
  },
  arm_iron_chainmail: {
    name: 'Iron Chainmail',
    description: '',
    slot: 'body',
    stats: {
      basePhysicalDefence: 4,
      baseMagicDefence: 1,
    },
    cost: 300,
  },
};

const companions = {
  pet_wayfarer_dog: {
    name: 'Faithful Hound',
    description: 'The loyalest of dogs',
    slot: 'pet',
    baseBamage: 10,
    cost: null, // Cannot be purchased
    behaviour: {
      attacks: true,
    },
  },
};

function findFromKey(key) {
  return ({ ...weapons, ...armour, ...companions }[key]);
}


export function newItem(dict) {
  let itemData = dict;
  if (typeof dict === 'string') {
    itemData = findFromKey(dict);
  }
  switch (itemData.type) {
    case ('weapon'): {
      return new Weapon(itemData);
    }
    case ('armour'): {
      return new Armour(itemData);
    }
    case ('companion'): {
      return new Companion(itemData);
    }
    default: {
      console.log(`Unknown item type: ${itemData.type}`);
      return null;
    }
  }
}

export function totalWeaponDamage(weapon) {
  let added = 0;
  let multiplier = 1.0;
  each(weapon.enhancements, (val) => {
    each(val.effects, (effect) => {
      if (effect.stat === 'basePhysicalDamage') {
        if (effect.operation === 'additive') {
          added += effect.magnitude;
        } else if (effect.operation === 'multiplicative') {
          multiplier += effect.magnitude;
        }
      }
    });
  });
  return (weapon.stats.basePhysicalDamage + added) * multiplier;
}

export function addEnhancement(item, effectKey) {
  const result = item;
  result.enhancements[effectKey] = itemEffects[effectKey];
  return result;
}

each(weapons, (val, key) => {
  weapons[key].type = 'weapon';
});
each(armour, (val, key) => {
  armour[key].type = 'armour';
});
each(companions, (val, key) => {
  companions[key].type = 'companion';
});


export default {
  ...weapons, ...armour, ...companions,
};

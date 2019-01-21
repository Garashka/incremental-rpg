/*
  TODO: Status Effects
  Stunned
  Frozen - take extra damage from other types
  Implement as class since doesn't need to be rehydrated?
*/

import store from '../../store';
// Importing store here feels dirty

// //   this.waitingText = [
// //     `The ${dict.name} paces impatiently.`,
// //     `The ${dict.name} glares at you warily.`,
// //     `The ${dict.name} watches you patiently.`,
// //   ];
// // Return true if status found else return false
// function removeStatus(status) {
//   if (this.statusEffects.hasOwnProperty(status)) {
//     delete this.statusEffects[status];
//     return true;
//   }
//   return false;
// }

// function checkCanAttack() {
//   // TODO: Check not stunned, frozen etc.
// }

// // Accuracy is the chance to hit
// // So if dice is > than accuracy, it's a miss
// function calculateHit(playerCharacter) {
//   let accuracy = this.accuracy - playerCharacter.evasion;
//   if (this.statusEffects.hasOwnProperty('accuracy')) {
//     accuracy += this.statusEffects.accuracy.magnitude;
//   }
//   const dice = Math.random() * 100;
//   if (accuracy > dice) {
//     return true;
//   } return false;
// }

function canAttack(data) {
  if (data.source.statusEffects.stunned || data.source.statusEffects.frozen) {
    return false;
  } return true;
}

function iterateEffects(data) {
  const { source } = data;
  Object.entries(source.statusEffects).forEach(([key, value]) => {
    console.log(key, value);
    value.duration -= 1;
    if (value.duration <= 0) {
      delete (source.statusEffects[key]);
    }
  });
}

export function takeBattleTurn(data) {
  const { source, target } = data;
  // TODO: Accuracy, wind-up attacks, defensive abilities
  if (source.currentHealth > 0) {
    if (source.statusEffects.is_casting) {
      if (source.statusEffects.is_casting.duration > 0) {
        store.commit('addToCombatLog', `The ${source.name} is preparing a powerful attack.`);
        // TODO: Implement this attack
      }
    } else if (canAttack(data)) {
      const damageDealt = Math.floor(Math.random() *
        (((source.maxDmg - source.minDmg) + 1) + source.minDmg));
      target.currentHealth -= damageDealt;
      store.commit('addToCombatLog', `The ${source.name} hits ${target.name} for ${damageDealt}`);
    } else {
      store.commit('addToCombatLog', `The ${source.name} staggers around.`);
    }
    iterateEffects(data);
  }
}


// TODO: Change behaviour to be a weighting instead of %, to make definitions easier
// TODO: Add dummy enemy
export default {
  lvl1_boar: {
    name: 'boar',
    description: '',
    level: 1,
    adjectives: ['bristly', 'furry', 'angry', 'wild'],
    maxHealth: 100,
    currentHealth: 100,
    minDmg: 8,
    maxDmg: 30,
    accuracy: 80,
    evasion: 10,
    defence: 0,
    statusEffects: { is_casting: { duration: 1 } },
    behaviour: {
      attack: 100,
    },
  },
  lvl1_wild_dog: {
    name: 'wild dog',
    description: '',
    level: 1,
    adjectives: ['angry', 'feral', 'mangy'],
    maxHealth: 60,
    currentHealth: 60,
    minDmg: 12,
    maxDmg: 40,
    accuracy: 90,
    evasion: 30,
    defence: 0,
    statusEffects: { is_casting: { duration: 1 } },
    behaviour: {
      attack: 100,
    },
  },
  lvl1_trainer: {
    name: 'Aiden',
    description: '',
    level: 1,
    adjectives: [],
    maxHealth: 120,
    minDmg: 15,
    maxDmg: 40,
    accuracy: 90,
    evasion: 20,
    defence: 5,
    statusEffects: {},
    behaviour: {
      attack: 100,
    },
  },
};

// export { takeBattleTurn };

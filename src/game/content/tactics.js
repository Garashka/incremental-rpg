import skills from './skills';

const tacticTargets = {
  enemy: {
    text: 'Enemy',
    evaluate: battle => battle.enemy,
  },
  self: {
    text: 'Self',
    evaluate: battle => battle.currentTurn,
  },
  party: {
    text: 'Party',
    evaluate: battle => battle.party,
  },
};

const tacticConditions = {
  any: {
    text: 'Any',
    evaluate: target => true,
  },
  is_casting: {
    // Target an enemy that has the "is_casting" status effect
    text: 'Casting',
    evaluate: (target) => {
      if (target.statusEffects.is_casting) {
        return true;
      } return false;
    },
  },
  is_stunned: {
    text: 'Stunned',
    evaluate: (target) => {
      if (target.statusEffects.stunned) {
        return true;
      } return false;
    },
  },
  is_frozen: {
    text: 'Frozen',
    evaluate: (target) => {
      if (target.statusEffects.frozen) {
        return true;
      } return false;
    },
  },
  hp_less_100pc: {
    text: 'HP < 100%',
    evaluate: (target) => {
      if (target.currentHealth < (target.maxHealth * 1.0)) {
        return true;
      } return false;
    },
  },
  hp_less_50pc: {
    text: 'HP < 50%',
    evaluate: (target) => {
      if (target.currentHealth < (target.maxHealth * 0.5)) {
        return true;
      } return false;
    },
  },
  ap_less_100pc: {
    text: 'AP < 100%',
    evaluate: (target) => {
      if (target.currentActionPoints < (target.maxActionPoints * 1.0)) {
        return true;
      } return false;
    },
  },
  ap_less_50pc: {
    text: 'AP < 50%',
    evaluate: (target) => {
      if (target.currentActionPoints < (target.maxActionPoints * 0.5)) {
        return true;
      } return false;
    },
  },
};

class Tactic {
  constructor(dict) {
    this.condition = dict.condition;
    this.action = dict.action;
    this.targetType = dict.targetType;
  }
  target(battle) {
    return tacticTargets[this.targetType].target(battle);
  }
  evaluate(battle) {
    return tacticConditions[this.condition].evaluate(this.target(battle));
  }
}
const tacticTemplate = () => new Tactic({
  condition: 'any',
  targetType: 'enemy',
  action: 'basic_attack',
});
export { tacticTargets, tacticConditions, tacticTemplate, Tactic };

// import skills from './skills';

// const tacticTargets = {
//   self: {
//     text: 'Self',
//     target: battle => battle.playerCharacter,
//   },
//   // TODO: Support for multiple enemies
//   enemy: {
//     text: 'Enemy',
//     target: battle => battle.enemy,
//   },
// };

// const tacticConditions = {
//   // Target an enemy that has the "is_casting" status effect
//   is_casting: {
//     text: 'Casting',
//     evaluate: (target) => {
//       if (target.statusEffects.is_casting) {
//         return true;
//       } return false;
//     },
//   },
//   hp_less_50pc: {
//     text: 'HP < 50%',
//     evaluate: (target) => {
//       if (target.currentHealth < (target.maxHealth * 0.5)) {
//         return true;
//       } return false;
//     },
//   },
//   any: {
//     text: 'Any',
//     evaluate: target => true,
//   },
// };

// function tacticTemplate() {
//   return {
//     target: tacticTargets.enemy,
//     condition: tacticConditions.any,
//     action: skills.basic_attack,
//   };
// }

// export { tacticTargets, tacticConditions, tacticTemplate };

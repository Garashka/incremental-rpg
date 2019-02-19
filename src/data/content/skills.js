import { skillEfects } from './effects';

let skills = {};

function calculateDamage(dict) {
  // TODO
  /*
    skillPower is a multiplier where 100 would be 100% of the final damage calculation, 120 woud be 120% etc.
    + it is presented to the player as a means of determining relative strength of skills
  */
  return (0.01 * dict.attribute) * dict.skillPower;
}

const basic = {
  basic_attack: {
    name: 'Attack',
    type: ['offensive', 'actor'],
    validTargets: ['any'],
    area: false,
    description: 'Stick them with the pointy(?) end!',
    minLevel: 0,
    actionPointCost: 0,
    skillPower: 100,

    action(event) {
      // Roll accuracy
      // Roll damage
      // Add modifiers

      const { caster, target } = event;
      caster.currentActionPoints -= this.actionPointCost;
      const damageDealt = calculateDamage({
        skillPower: this.skillPower,
        attribute: caster.strength,
      });
      target.currentHealth -= damageDealt;
      return `${caster.name} dealt ${damageDealt} damage to ${target.name}.`;
    },
  },
  basic_defend: {
    name: 'Defend',
    type: ['defensive', 'actor'],
    validTargets: ['self'],
    area: false,
    description: 'Take cover!',
    minLevel: 0,
    actionPointCost: 0,

    action: (event) => {
      const { caster } = event;
      caster.currentActionPoints -= this.actionPointCost;
      const buffKey = 'basic_buffDefend';
      caster.statusEffects[buffKey] = skillEfects[buffKey];
      return `${caster.name} takes a defensive stance.`;
    },
  },
};

const soldier = {
  soldier_pommelStrike: {
    name: 'Pommel Strike',
    type: ['offensive', 'status'],
    validTargets: ['enemy'],
    area: false,
    description: 'Hit them with the blunt part, interrupting most attacks',
    minLevel: 1,
    actionPointCost: 1,

    action(event) {
      const { caster, target } = event;
      caster.currentActionPoints -= this.actionPointCost;
      if (target.statusEffects.is_casting) {
        delete target.statusEffects.is_casting;
        target.statusEffects.stunned = { duration: 2 };
        return "You break the enemy's concentration, stunning them.";
      }
      return 'Your Pommel Strike has no effect.';
    },
  },
  soldier_focusedStrike: {
    name: 'Focused Strike',
    type: ['offensive'],
    validTargets: ['enemy'],
    area: false,
    description: 'Line up a powerful attack, then swing with all your might',
    minLevel: 1,
    actionPointCost: 1,
    skillPower: 150,

    action(event) {
      const { caster, target } = event;
      caster.currentActionPoints -= this.actionPointCost;
      let skillPower = this.skillPower;
      const result = [];
      if (target.statusEffects.stunned) {
        skillPower *= 1.5;
        result.push('The target is disabled, letting you line up a perfect strike');
      }
      const damageDealt = calculateDamage({
        skillPower,
        attribute: caster.strength,
      });
      target.currentHealth -= damageDealt;
      result.push(`${caster.name} dealt ${Math.trunc(damageDealt)} damage to ${target.name}.`);
      return result.join('<br />');
    },
  },
  soldier_firstAid: {
    name: 'First Aid',
    type: ['healing'],
    validTargets: ['self', 'ally'],
    area: false,
    description: 'Apply basic first aid to regain a little health',
    minLevel: 1,
    actionPointCost: 1,

    action(event) {
      const { caster, target } = event;
      caster.currentActionPoints -= this.actionPointCost;
      let healValue = target.maxHealth * (0.2 + (caster.intelligence * 0.01));
      // Prevent overhealing
      healValue = Math.min(healValue, target.maxHealth - target.currentHealth);
      target.currentHealth += healValue;
      return `${target.name} received first aid healing for ${Math.trunc(healValue)}`;
    },
  },
};

const wayfarer = {
  wayfarer_houndMaul: {
    name: 'Maul',
    type: ['offensive', 'companion', 'status'],
    validTargets: ['enemy'],
    description: 'Order your companion to pin the enemy',
    minLevel: 1,
    actionPointCost: 1,

    action(event) {
      const { caster, target } = event;
      caster.currentActionPoints -= this.actionPointCost;
      target.removeStatus('is_casting');
      target.statusEffects.stunned = { duration: 2, type: 'debuff' };
      console.log('Used Maul');
    },
  },
};

const hedgeWizard = {
  hedge_blast: {
    name: 'Aether Blast',
    type: ['offensive'],
    validTargets: ['enemy'],
    description: 'Blast the enemy with raw magical energy',
    minLevel: 1,
    actionPointCost: 1,
    skillPower: 125,
    action(event) {
      const { caster, target } = event;
      caster.currentActionPoints -= this.actionPointCost;
      const damageDealt = calculateDamage({
        skillPower: this.skillPower,
        attribute: caster.intelligence,
      });
      target.currentHealth -= damageDealt;
      return `${caster.name} blasts ${target.name} for ${damageDealt} damage .`;
    },
  },
  hedge_chillingTouch: {
    name: 'Chillling Touch',
    type: ['offensive', 'status'],
    validTargets: ['enemy'],
    description: 'Chill the enemy to their bones, temporarily stunning them',
    minLevel: 1,
    actionPointCost: 2,
    skillPower: 25,
    action(event) {
      const { caster, target } = event;
      caster.currentActionPoints -= this.actionPointCost;
      target.statusEffects.frozen = { duration: 3, type: 'debuff' };
      const damageDealt = calculateDamage({
        skillPower: this.skillPower,
        attribute: caster.intelligence,
      });
      target.currentHealth -= damageDealt;
      return `${caster.name} chilled ${target.name} for ${Math.trunc(damageDealt)} damage.`;
    },
  },
  hedge_drain: {
    name: 'Aether Drain',
    type: ['offensive', 'drain'],
    validTargets: ['enemy'],
    description: "Siphon the enemy's life force, regaining AP and HP.",
    minLevel: 1,
    actionPointCost: 0,
    skillPower: 25,
    action(event) {
      const { caster, target } = event;
      const damageDealt = calculateDamage({
        skillPower: this.skillPower,
        attribute: caster.intelligence,
      });
      target.currentHealth -= damageDealt;
      caster.currentActionPoints += Math.min(
        3,
        caster.maxActionPoints - caster.currentActionPoints,
      );
      caster.currentHealth += Math.min(
        damageDealt,
        caster.maxHealth - caster.currentHealth,
      );
      return `${caster.name} siphoned ${target.name}'s life force for ${Math.trunc(damageDealt)}.`;
    },
  },
};

const villager = {
  villager_throwSand: {
    name: 'Throw Sand',
    type: ['defensive', 'actor', 'status'],
    validTargets: ['enemy'],
    description: "Throw something gritty in your opponent's face, reducing their accuracy.",
    minLevel: 1,
    actionPointCost: 1,
    action(event) {
      const { caster, target } = event;
      caster.currentActionPoints -= this.actionPointCost;
      target.statusEffects.accuracy = { duration: 2, magnitude: -90, type: 'debuff' };
      console.log('Used Throw Sand');
    },
  },
};


skills = {
  ...basic, ...soldier, ...villager, ...wayfarer, ...hedgeWizard,
};
export default { ...skills };


import { calculateDamage } from './utilities';

export default {
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
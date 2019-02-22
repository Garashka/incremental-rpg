import { calculateDamage } from './utilities';

export default {
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
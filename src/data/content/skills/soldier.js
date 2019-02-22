export default {
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
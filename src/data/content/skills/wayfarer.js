import { calculateDamage } from './utilities';

export default {
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
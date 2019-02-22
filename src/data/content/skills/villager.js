export default {
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
// TODO: Structure better
// Duration of effects, e.g. battles, turns

const itemEffects = {
  forestSharpenedWeapon: {
    source: 'event_wanderingJourneymanSharpenWeapon',
    name: 'Sharpened',
    unique: true,
    effects: [{
      stat: 'basePhysicalDamage',
      magnitude: 4,
      operation: 'additive',
    },
    ],
  },
};

const skillEfects = {
  basic_buffDefend: {
    source: 'basic_defend',
    name: 'Defending',
    unique: true,
    effects: [{
      stat: 'block',
      magnitude: '20',
      operation: 'percentHP',
      duration: 1,
    }],
  },
};

export { itemEffects, skillEfects };

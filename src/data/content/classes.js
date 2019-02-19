export default {
  class_villager: {
    name: 'Villager',
    description: 'Untrained and unkempt',
    minPrestige: 0,
    minRenown: 0,
    unlocked: true,
    startingBonus: {
      maxHealth: 5,
      maxActionPoints: 2,
      baseDamage: 1,
      strength: 2,
      dexterity: 2,
      intelligence: 2,
      athletics: 2,
      perception: 2,
      physicalDefence: 2,
      magicalDefence: 2,
    },
    defaultEquippedWeapons: ['wpn_pitchfork'],
    availableSkills: ['basic_attack', 'basic_defend'],
    allSkills: ['basic_attack', 'basic_defend'],
    inventory: ['wpn_pitchfork'],
    statGrowth: {
      maxHealth: 10,
      maxActionPoints: 1,
      strength: 3,
      intelligence: 2,
      dexterity: 4,
      perception: 3,
      athletics: 2,
    },
  },
  // TODO: Everything other than Villager requires at least some renown
  // Soldier
  // Has had basic combat training and experience
  // Primarily uses melee weapons
  // Unlock through event in tavern
  class_soldier: {
    name: 'Soldier',
    description: 'Knows the pointy end',
    minPrestige: 0,
    minRenown: 0,
    unlocked: true,
    startingBonus: {
      maxHealth: 10,
      maxActionPoints: -1,
      baseDamage: 5,
      strength: 5,
      athletics: 3,
      dexterity: 2,
      physicalDefence: 2,
      magicalDefence: -1,
    },
    defaultEquippedWeapons: ['wpn_short_sword'],
    availableSkills: ['basic_attack', 'basic_defend', 'soldier_pommelStrike', 'soldier_focusedStrike', 'soldier_firstAid'],
    allSkills: ['basic_attack', 'basic_defend', 'soldier_pommelStrike', 'soldier_focusedStrike', 'soldier_firstAid'],
    inventory: ['wpn_short_sword'],
    statGrowth: {
      maxHealth: 10,
      maxActionPoints: 1,
      strength: 3,
      intelligence: 2,
      dexterity: 4,
      perception: 3,
      athletics: 2,
    },
  },

  // Wayfarer
  // Roams the land. Has a companion. Uses basic ranged and melee weapons.
  // Unlock through event in forest
  class_wayfarer: {
    name: 'Wayfarer',
    description: 'A wanderer and his trusty canine',
    minPrestige: 0,
    minRenown: 0,
    unlocked: false,
    startingBonus: {
      maxHealth: 5,
      maxActionPoints: 0,
      baseDamage: 5,
      strength: 4,
      athletics: 3,
      dexterity: 3,
      physicalDefence: 1,
      magicalDefence: 0,
      companions: ['pet_wayfarer_dog'],
    },
    defaultEquippedWeapons: ['wpn_pitchfork'],
    availableSkills: ['basic_attack', 'basic_defend', 'wayfarer_houndMaul'],
    allSkills: ['basic_attack', 'basic_defend', 'wayfarer_houndMaul'],
    inventory: ['wpn_pitchfork', 'pet_wayfarer_dog'],
    statGrowth: {
      maxHealth: 10,
      maxActionPoints: 1,
      strength: 3,
      intelligence: 2,
      dexterity: 4,
      perception: 3,
      athletics: 2,
    },
  },

  // Has high skill points with some basic magic skills
  // Unlocked through event in forest?
  class_hedge_wizard: {
    name: 'Hedge Wizard',
    description:
      'Has just enough magical knowledge to be dangerous to themselves.',
    minPrestige: 0,
    minRenown: 0,
    unlocked: true,
    startingBonus: {
      maxHealth: 5,
      maxActionPoints: 4,
      baseDamage: -1,
      strength: 1,
      athletics: 1,
      dexterity: 4,
      physicalDefence: 1,
      magicalDefence: 5,
    },
    defaultEquippedWeapons: ['wpn_simple_staff'],
    availableSkills: ['basic_attack', 'basic_defend', 'hedge_blast', 'hedge_chillingTouch', 'hedge_drain'],
    allSkills: ['basic_attack', 'basic_defend', 'hedge_blast', 'hedge_chillingTouch', 'hedge_drain'],
    inventory: ['wpn_simple_staff'],
    statGrowth: {
      maxHealth: 5,
      maxActionPoints: 2,
      strength: 1,
      intelligence: 5,
      dexterity: 4,
      perception: 2,
      athletics: 1,
    },
  },

  // Gunslinger - Advanced Class
  // Has an ammo capacity depending on weapon. Skills cost ammo in addition to SP.
  // When they have ammo, can their skills have high damage and speed
  // When reloading, they have a much slower speed and can't use ammo-based skills.

  // Samurai - Advanced Class
  // Builds charge by attacking and counter-attacking (based on power of skills)
  // Have extra skills that don't consume AP, only their charge
};

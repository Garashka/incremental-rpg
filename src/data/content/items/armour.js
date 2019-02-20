export default [
  {
    id: 'arm_simple_robe',
    name: 'Simple Robe',
    description: '',
    slot: 'body',
    price: 50,
    stats: {
      defence: {
        physical: 1,
        magical: 2,
      },
    },
  },
  {
    id: 'arm_leather_armour',
    name: 'Leather Armour',
    description: '',
    slot: 'body',
    price: 50,
    stats: {
      defence: {
        physical: 2,
        magical: 1,
      },
    },
  },
  {
    id: 'arm_iron_chainmail',
    name: 'Iron Chainmail',
    description: '',
    slot: 'body',
    price: 300,
    stats: {
      defence: {
        physical: 4,
        magical: 1,
      },
    },
  },
].map((x) => {
  x.type = 'armour';
  return x;
});

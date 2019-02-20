export default [
  {
    id: 'wpn_pitchfork',
    name: 'Pitchfork',
    description: "Pitchfork Emporium's Finest",
    slot: 'mainhand',
    price: 50,
    stats: {
      attack: {
        physical: 4,
      },
    },
  },
  {
    id: 'wpn_short_sword',
    name: 'Short Sword',
    description: 'A simple but functional weapon',
    slot: 'mainhand',
    price: 200,
    stats: {
      attack: {
        physical: 10,
      },
    },
  },
  {
    id: 'wpn_simple_staff',
    name: 'Simple Staff',
    description: 'A simple but functional weapon',
    slot: 'mainhand',
    price: 200,
    stats: {
      attack: {
        physical: 2,
        magical: 4,
      },
    },
  },
].map((x) => {
  x.type = 'weapon';
  return x;
});

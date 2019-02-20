export default [
  {
    id: 'pet_wayfarer_dog',
    name: 'Faithful Hound',
    description: 'The loyalest of dogs',
    slot: 'pet',
    baseBamage: 10,
    price: null, // Cannot be purchased
    behaviour: {
      attacks: true,
    },
  },
].map((x) => {
  x.type = 'companion';
  return x;
});

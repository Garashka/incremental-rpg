export default {
  methods: {
    // For subtracting any costs associated with a button click (e.g. in an event);
    subtractCost(cost) {
      // TODO: Make this a mixin
      switch (cost.currency) {
        case 'gold':
          this.$store.commit('actor/modifyGold', {
            delta: -cost.amount,
          });
          break;
        default:
          console.log(`Unknown cost currency: ${cost}`);
          break;
      }
    },
    gainEventReward(gain) {
      switch (gain.type) {
        case 'effectItem':
          switch (gain.target) {
            case 'activeWeapon':
              this.$store.commit('actor/addItemEnhancement', {
                itemSlot: 'equippedWeapons',
                itemIndex: 0,
                characterIndex: 0, // TODO: Select index of character receiving enhancement
                effect: gain.effect,
              });
              break;
            default:
              console.log(`Unknown gain target type: ${this.buttonData.gain.target}`);
              break;
          }
          break;
        default:
          console.log(`Unknown gain type: ${this.buttonData.gain}`);
          break;
      }
    },
  },
};


import store from '../../store';

// TODO: Refactor events so they can share costs
// Costs are positive values here and inverted from the event template

export default {
  event_wanderingJourneymanSharpenWeapon: {
    title: 'Wandering Journeyman',
    isAvailable() {
      return true;
    },
    scenes: {
      start: {
        cost: {
          currency: 'gold',
          amount: 1000,
        },
        get text() {
          return [
            'A wandering journeyman passes you on the road.',
            'He tells you he is roaming the land to try and improve his skill as a blacksmith.',
            `He offers to sharpen your weapons for ${this.cost.amount} ${this.cost.currency}.`,
          ];
        },
        buttons: {
          acceptOffer: {
            text: 'Accept',
            cost: {
              currency: 'gold',
              amount: 1000,
            },
            gain: {
              type: 'effectItem',
              target: 'activeWeapon',
              effect: 'forestSharpenedWeapon',
            },
            nextScene: ['acceptOffer'],
          },
          refuseOffer: {
            text: 'Refuse',
            nextScene: ['refuseOffer'],
          },
        },
      },
      refuseOffer: {
        text: [
          'The wandering journeyman thanks you for your time and continues on his way.',
        ],
        buttons: {
          return: {
            text: 'Return to Forest',
            nextScene: ['return'],
          },
        },
      },
      acceptOffer: {
        text: [
          'You spend an hour swapping tales whilst he hones your weapon.',
          'Although he is a journeyman, you can see he has a spark of skill,',
          'and it shows in his results.',
        ],
        buttons: {
          return: {
            text: 'Return to Forest',
            nextScene: ['return'],
          },
        },
      },
    },
  },
  event_tavern_orderDrink: {
    title: 'Carousing in the Tavern',
    isAvailable() {
      return true;
    },
    scenes: {
      start: {
        cost: {},
        get text() {
          return [
            'You give the barkeep a gold coin and he hands you an ale.',
          ];
        },
        buttons: {
          drink: {
            text: 'Drink it',
            nextScene: ['barBrawl', 'liquidCourage', 'carouse'],
          },
        },
      },
      barBrawl: {
        text: [
          '',
        ],
        buttons: {
          return: {
            text: 'Return to Village',
            nextScene: ['return'],
          },
        },
      },
      liquidCourage: {
        text: [
          '',
        ],
        buttons: {
          return: {
            text: 'Return to Village',
            nextScene: ['return'],
          },
        },
      },
      carouse: {
        text: [
          '',
        ],
        buttons: {
          text: 'Return to Village',
          nextScene: ['return'],
        },
      },
    },
  },
  event_class_unlockSoldier: {
    title: 'Recruiter',
    isAvailable() {
      if (store.state.actor.renown >= 10) {
        return true;
      } return false;
    },
  },
};

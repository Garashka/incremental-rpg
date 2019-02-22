import villager from './villager';
import soldier from './soldier';
import wayfarer from './wayfarer';
import hedgeWizard from './hedgeWizard';

import { skillEfects } from '../effects';

let skills = {};

function calculateDamage(dict) {
  // TODO
  /*
    skillPower is a multiplier where 100 would be 100% of the final damage calculation, 120 woud be 120% etc.
    + it is presented to the player as a means of determining relative strength of skills
  */
  return (0.01 * dict.attribute) * dict.skillPower;
}











skills = {
  ...basic, ...soldier, ...villager, ...wayfarer, ...hedgeWizard,
};
export default { ...skills };


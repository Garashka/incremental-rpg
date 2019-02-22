import basic from './basic';
import villager from './villager';
import soldier from './soldier';
import wayfarer from './wayfarer';
import hedgeWizard from './hedgeWizard';

import { skillEfects } from '../effects';

let skills = {
  ...basic, ...soldier, ...villager, ...wayfarer, ...hedgeWizard,
};

export default { ...skills };


export function calculateDamage(dict) {
    // TODO
    /*
      skillPower is a multiplier where 100 would be 100% of the final damage calculation, 120 woud be 120% etc.
      + it is presented to the player as a means of determining relative strength of skills
    */
    return (0.01 * dict.attribute) * dict.skillPower;
  }
  
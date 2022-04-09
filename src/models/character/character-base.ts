import { BaseAttributeSet } from 'models/skill-system/attribute';
import { Skill } from 'models/skill-system/skill';

export interface ICharacterBaseDataModel {
  isPlayerCharacter: boolean;
}

export abstract class CharacterBase {
  isPlayerCharacter = false;
  abstract attributes: BaseAttributeSet;

  constructor(data: ICharacterBaseDataModel) {
    this.isPlayerCharacter = data.isPlayerCharacter;
  }

  abstract useSkill(skill: Skill, target: CharacterBase): void;

  get health() {
    return this.attributes.health.current;
  }

  get maxHealth() {
    return this.attributes.maxHealth.current;
  }
}

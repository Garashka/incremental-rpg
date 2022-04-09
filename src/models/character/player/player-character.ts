import {
  CharacterClass,
  getCharacterClassById,
  ICharacterClassDataModel,
} from './character-classes';
import { CharacterRace, getRaceById, ICharacterRaceDataModel } from './races';
import { CharacterAttributeSet } from 'models/skill-system/attribute';
import defaultAttributes from 'data/content/character/attributes.json';
import { isString } from 'src/utils/common';
import { getSkillById, Skill } from 'models/skill-system/skill';
import { CharacterBase } from 'models/character/character-base';

export interface ICharacterDataModel {
  name: string;
  race: ICharacterRaceDataModel | string;
  characterClass: ICharacterClassDataModel | string;
}

export class Character extends CharacterBase {
  name: string;
  attributes: CharacterAttributeSet;
  race: CharacterRace;
  characterClass: CharacterClass;
  skills: { [id: string]: Skill } = {};
  effects: [];

  constructor(data: ICharacterDataModel) {
    super({ isPlayerCharacter: true });

    this.name = data.name;
    this.attributes = new CharacterAttributeSet(defaultAttributes);

    if (isString(data.race)) {
      data.race = getRaceById(data.race);
    }
    this.race = new CharacterRace(data.race);

    if (isString(data.characterClass)) {
      data.characterClass = getCharacterClassById(data.characterClass);
    }
    this.characterClass = new CharacterClass(data.characterClass);

    this.initializeSkills();
    this.effects = [];
  }

  initializeSkills() {
    const classSkills = this.characterClass.defaultSkills;

    for (const skillId of classSkills) {
      this.addSkill(skillId);
    }
  }

  addSkill(skillId: string) {
    if (!this.skills[skillId]) {
      const skillData = getSkillById(skillId);

      this.skills[skillData.id] = new Skill(skillData);
    }
  }

  getSkills() {
    return Object.values(this.skills);
  }

  canAffordSkill(skill: Skill) {
    // TODO: Other operators
    for (const cost of skill.cost) {
      const { attribute: attribId, magnitude } = cost;
      const { current } = this.attributes.get(attribId);

      if (current < magnitude) {
        return false;
      }
    }
    return true;
  }

  useSkill(skill: Skill, target: CharacterBase) {
    if (this.canAffordSkill(skill)) {
      skill.execute(this, target);
    }
  }

  get actionPoints() {
    return this.attributes.actionPoints.current;
  }

  get maxActionPoints() {
    return this.attributes.maxActionPoints.current;
  }
}

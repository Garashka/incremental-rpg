import { IAttributeModifier } from './attribute';
import { SkillEffectDataModel } from './effect';
import skillData from 'data/content/skills/basic.json';

export interface ISkillDeserializer {
  id: string;
}

export enum ESkillTargetType {
  SELF = 'self',
  FRIENDLY = 'friendly',
  ENEMY = 'enemy',
  ALL = 'all',
  NOT_SELF = 'notSelf',
}

export interface ISkillDataModel extends ISkillDeserializer {
  name: string;
  description?: string;
  cost: IAttributeModifier[];
  effects: SkillEffectDataModel[];
  validTargets: ESkillTargetType[];
}

export class Skill implements ISkillDataModel {
  id: string;
  name: string;
  description?: string;
  cost: IAttributeModifier[];
  effects: SkillEffectDataModel[];
  validTargets: ESkillTargetType[];

  constructor(data: ISkillDeserializer) {
    const skill = getSkillById(data.id);
    if (!skill) {
      throw `No skill data model found for '${data.id}'`;
    }

    this.id = skill.id;
    this.name = skill.name;
    this.description = skill.description;
    this.cost = skill.cost;
    this.effects = skill.effects;
    this.validTargets = skill.validTargets;
  }

  toJSON() {
    return this.id;
  }
}

const skills = skillData as ISkillDataModel[];

const skillMap = skills.reduce((acc, curr) => {
  Object.freeze(curr);
  acc[curr.id] = curr;
  return acc;
}, {} as { [id: string]: ISkillDataModel });

export function getSkillById(id: string): ISkillDataModel {
  const skill = skillMap[id];
  if (!skill) {
    throw `No skill data model found for '${id}'`;
  }

  return skill;
}

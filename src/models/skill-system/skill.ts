import { IAttributeModifier } from './attribute';
import { SkillEffectFactory, BaseEffect, TSkillEffectDataModel } from './effect';
import { CharacterBase } from 'models/character/character-base';
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
  effects: TSkillEffectDataModel[];
  validTargets: ESkillTargetType[];
}

interface ISkillInstance extends ISkillDeserializer {
  name: string;
  description?: string;
  cost: IAttributeModifier[];
  effects: BaseEffect[];
  validTargets: ESkillTargetType[];
}

export class Skill implements ISkillInstance {
  id: string;
  name: string;
  description?: string;
  cost: IAttributeModifier[];
  effects: BaseEffect[];
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
    this.effects = skill.effects.map((effect) => SkillEffectFactory.create(effect));
    this.validTargets = skill.validTargets;
  }

  execute(source: CharacterBase, target: CharacterBase) {
    for (const modifier of this.cost) {
      source.attributes.applyModifier(modifier);
    }
    for (const effect of this.effects) {
      effect.execute(source, target);
    }
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

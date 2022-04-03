import { IAttributeModifier } from './attribute';
import { Character } from 'models/character/character';

export enum ESkillEffectTypes {
  MODIFIER = 'modifier',
  STATUS = 'status',
  SCRIPT = 'script',
}

export enum ESkillEffectTargets {
  SOURCE = 'source',
  TARGET = 'target',
}

export interface ISkillScriptArgs {
  type: string;
  args: Record<string, unknown>;
}

interface ISkillEffectBase {
  type: ESkillEffectTypes;
  target: ESkillEffectTargets;
  duration?: 'instant' | 'infinite' | number;
}

interface ISkillEffectModifier extends ISkillEffectBase {
  modifier: IAttributeModifier;
}

interface ISkillEffectStatus extends ISkillEffectBase {
  status: string[];
}

interface ISkillEffectScript extends ISkillEffectBase {
  script: ISkillScriptArgs;
}

export type SkillEffectDataModel = ISkillEffectModifier | ISkillEffectStatus | ISkillEffectScript;

export class SkillEffect {
  private skillEffectData: SkillEffectDataModel;

  constructor(data: SkillEffectDataModel) {
    this.skillEffectData = data;
  }

  public apply(source: Character, target: Character | null = null) {
    if (!target) {
      target = source;
    }
  }
}

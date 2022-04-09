import { IAttributeModifier } from './attribute';
import { CharacterBase } from 'models/character/character-base';

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

export type TSkillEffectDataModel = ISkillEffectModifier | ISkillEffectStatus | ISkillEffectScript;

export abstract class BaseEffect {
  abstract execute(source: CharacterBase, target: CharacterBase | null): void;
}

export abstract class SkillEffectFactory {
  static create(data: TSkillEffectDataModel): BaseEffect {
    switch (data.type) {
      case ESkillEffectTypes.MODIFIER: {
        return new ModifierEffect(data as ISkillEffectModifier);
      }
      case ESkillEffectTypes.STATUS:
        return new StatusEffect(data as ISkillEffectStatus);
      case ESkillEffectTypes.SCRIPT:
        return new ScriptEffect(data as ISkillEffectScript);
      default:
        throw new Error(`Unknown skill effect type: ${data.type}`);
    }
  }
}

class ModifierEffect extends BaseEffect implements ISkillEffectModifier {
  modifier: IAttributeModifier;
  type: ESkillEffectTypes;
  target: ESkillEffectTargets;
  duration?: number | 'instant' | 'infinite' | undefined;

  constructor(data: ISkillEffectModifier) {
    super();
    this.modifier = data.modifier;
    this.type = data.type;
    this.target = data.target;
    this.duration = data.duration;
  }

  execute(source: CharacterBase, target: CharacterBase | null = null) {
    // TODO: Handle duration
    if (!target) {
      target = source;
    }

    const targetCharacter = this.evaluateTarget(source, target);
    targetCharacter.attributes.applyModifier(this.modifier);
  }

  private evaluateTarget(source: CharacterBase, target: CharacterBase) {
    switch (this.target) {
      case ESkillEffectTargets.SOURCE:
        return source;
      case ESkillEffectTargets.TARGET:
        return target;
      default:
        throw new Error(`Unknown skill effect target: ${this.target}`);
    }
  }
}

class StatusEffect extends BaseEffect implements ISkillEffectStatus {
  status: string[];
  type: ESkillEffectTypes;
  target: ESkillEffectTargets;
  duration?: number | 'instant' | 'infinite' | undefined;

  constructor(data: ISkillEffectStatus) {
    super();
    this.status = data.status;
    this.type = data.type;
    this.target = data.target;
    this.duration = data.duration;
  }

  execute(source: CharacterBase, target: CharacterBase | null = null) {
    if (!target) {
      target = source;
    }
  }
}

class ScriptEffect extends BaseEffect implements ISkillEffectScript {
  script: ISkillScriptArgs;
  type: ESkillEffectTypes;
  target: ESkillEffectTargets;
  duration?: number | 'instant' | 'infinite' | undefined;

  constructor(data: ISkillEffectScript) {
    super();
    this.script = data.script;
    this.type = data.type;
    this.target = data.target;
    this.duration = data.duration;
  }

  execute(source: CharacterBase, target: CharacterBase | null = null) {
    if (!target) {
      target = source;
    }
  }
}

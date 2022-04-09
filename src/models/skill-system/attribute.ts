import { Operator } from 'src/utils/enum';

export class CharacterAttribute {
  name: string;
  protected currentValue: number;
  protected baseValue: number;
  onChangeSubscribers: Array<(attribute: CharacterAttribute) => void> = [];

  constructor(name: string, currentValue: number, baseValue = currentValue) {
    this.name = name;
    this.currentValue = currentValue;
    this.baseValue = baseValue;
  }

  onChange(callback: (attribute: CharacterAttribute) => void) {
    this.onChangeSubscribers.push(callback);
  }

  set current(value: number) {
    this.currentValue = value;
    this.onChangeSubscribers.forEach((callback) => callback(this));
  }

  get current() {
    return this.currentValue;
  }

  set base(value: number) {
    this.baseValue = value;
    this.onChangeSubscribers.forEach((callback) => callback(this));
  }

  get base() {
    return this.baseValue;
  }
}

export interface IAttributeModifier {
  attribute: string;
  magnitude: number;
  operator: Operator;
  duration?: number;
}

interface IBaseAttributeDataModel {
  health: number;
  maxHealth?: number;
  actionPoints: number;
  maxActionPoints?: number;
}

interface ICharacterAttributeDataModel extends IBaseAttributeDataModel {
  strength: number;
  dexterity: number;
  intelligence: number;
}

interface IBaseAttributeSet {
  health: CharacterAttribute;
  maxHealth: CharacterAttribute;
  actionPoints: CharacterAttribute;
  maxActionPoints: CharacterAttribute;
}

interface ICharacterAttributeSet extends IBaseAttributeSet {
  strength: CharacterAttribute;
  dexterity: CharacterAttribute;
  intelligence: CharacterAttribute;
}

export abstract class BaseAttributeSet implements IBaseAttributeSet {
  health: CharacterAttribute;
  maxHealth: CharacterAttribute;
  actionPoints: CharacterAttribute;
  maxActionPoints: CharacterAttribute;

  constructor(data: IBaseAttributeDataModel) {
    this.health = new CharacterAttribute('health', data.health);
    this.maxHealth = new CharacterAttribute('maxHealth', data.maxHealth || data.health);
    this.actionPoints = new CharacterAttribute('actionPoints', data.actionPoints);
    this.maxActionPoints = new CharacterAttribute(
      'maxActionPoints',
      data.maxActionPoints || data.actionPoints
    );
  }

  abstract get(this: BaseAttributeSet, id: string): CharacterAttribute;

  addAttributeChangeSubscriber(
    attribute: string,
    callback: (attribute: CharacterAttribute) => void
  ) {
    const attributeObj = this.get(attribute);

    attributeObj.onChange(callback);
  }

  applyModifier(modifier: IAttributeModifier) {
    const { attribute, magnitude, operator, duration } = modifier;
    const attributeObj = this.get(attribute);

    if (operator === Operator.ADD) {
      attributeObj.current += magnitude;
    } else if (operator === Operator.SUBTRACT) {
      attributeObj.current -= magnitude;
    } else if (operator === Operator.SET) {
      attributeObj.current = magnitude;
    }
  }
}

export class EnemyAttributeSet extends BaseAttributeSet {
  constructor(data: IBaseAttributeDataModel) {
    super(data);
  }

  get(this: EnemyAttributeSet, id: string): CharacterAttribute {
    const attribute = this[id as keyof IBaseAttributeDataModel];
    if (!attribute) {
      throw new Error(`Attribute ${id} does not exist`);
    }
    return attribute;
  }
}

export class CharacterAttributeSet extends BaseAttributeSet implements ICharacterAttributeSet {
  strength: CharacterAttribute;
  dexterity: CharacterAttribute;
  intelligence: CharacterAttribute;

  constructor(attributes: ICharacterAttributeDataModel) {
    super(attributes);

    this.strength = new CharacterAttribute('strength', attributes.strength);
    this.dexterity = new CharacterAttribute('dexterity', attributes.dexterity);
    this.intelligence = new CharacterAttribute('intelligence', attributes.intelligence);
  }

  get(this: CharacterAttributeSet, id: string): CharacterAttribute {
    const attribute = this[id as keyof ICharacterAttributeDataModel];
    if (!attribute) {
      throw new Error(`Attribute ${id} does not exist`);
    }
    return attribute;
  }
}

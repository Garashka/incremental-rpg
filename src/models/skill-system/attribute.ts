import { Operator } from 'src/utils/enum';

export class CharacterAttribute {
  name: string;
  currentValue: number;
  maxValue: number;

  constructor(name: string, currentValue: number, maxValue = currentValue) {
    this.name = name;
    this.currentValue = currentValue;
    this.maxValue = maxValue;
  }
}

export interface IAttributeModifier {
  attribute: string;
  magnitude: number;
  operator: Operator;
  duration?: number;
}

interface ICharacterAttributeSet {
  health: number;
  actionPoints: number;
  strength: number;
  dexterity: number;
  intelligence: number;
}

export class CharacterAttributeSet {
  strength: CharacterAttribute;
  dexterity: CharacterAttribute;
  intelligence: CharacterAttribute;
  health: CharacterAttribute;
  actionPoints: CharacterAttribute;

  constructor(attributes: ICharacterAttributeSet) {
    this.health = new CharacterAttribute('health', attributes.health);
    this.actionPoints = new CharacterAttribute('actionPoints', attributes.actionPoints);
    this.strength = new CharacterAttribute('strength', attributes.strength);
    this.dexterity = new CharacterAttribute('dexterity', attributes.dexterity);
    this.intelligence = new CharacterAttribute('intelligence', attributes.intelligence);
  }
}

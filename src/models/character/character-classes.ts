import _classes from 'data/content/character/character-classes.json';

// Should map to properties in class toJSON function for deserializing
export interface ICharacterClassDeserializer {
  id: string;
}

// Should contain all other properties in data model
export interface ICharacterClassDataModel extends ICharacterClassDeserializer {
  name: string;
  description: string;
  defaultSkills: string[];
}

export class CharacterClass implements ICharacterClassDataModel {
  id: string;
  name: string;
  description: string;
  defaultSkills: string[];

  constructor(data: ICharacterClassDeserializer) {
    const dataModel = getCharacterClassById(data.id);

    this.id = dataModel.id;
    this.name = dataModel.name;
    this.description = dataModel.description;
    this.defaultSkills = dataModel.defaultSkills;
  }

  toJSON(): ICharacterClassDeserializer {
    return { id: this.id };
  }
}

export const characterClasses = _classes as ICharacterClassDataModel[];

// Cached map for individual class retrieval
const characterClassMap = characterClasses.reduce((acc, curr) => {
  Object.freeze(curr);
  acc[curr.id] = curr;
  return acc;
}, {} as { [id: string]: ICharacterClassDataModel });

export function getCharacterClassById(id: string): ICharacterClassDataModel {
  const characterClass = characterClassMap[id];
  if (!characterClass) {
    throw `No character class data model found for '${id}'`;
  }

  return characterClass;
}

export function getCharacterClassName(id: string): string {
  const characterClass = getCharacterClassById(id);

  if (!characterClass) {
    return '';
  }

  return characterClass.name;
}

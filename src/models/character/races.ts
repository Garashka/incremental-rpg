import _races from 'data/content/character/races.json';

export interface ICharacterRaceDataModel {
  id: string;
  name: string;
  description: string;
  allowedGenders: ECharacterGender[];
  effects: {
    [text: string]: string;
  };
}

export enum ECharacterGender {
  Unknown = 'Unknown',
  Male = 'Male',
  Female = 'Female',
}

export class CharacterRace {
  id: string;
  name: string;
  description: string;
  effects: Record<string, string>;

  constructor(data: ICharacterRaceDataModel) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.effects = data.effects;
  }

  toJSON() {
    return this.id;
  }
}

export const races = _races as ICharacterRaceDataModel[];

// Cached map for individual race retrieval
const raceMap = races.reduce((acc, curr) => {
  Object.freeze(curr);
  acc[curr.id] = curr;
  return acc;
}, {} as { [id: string]: ICharacterRaceDataModel });

export function getRaceById(id: string): ICharacterRaceDataModel {
  const race = raceMap[id];
  if (!race) {
    throw `No race data model found for '${id}'`;
  }

  return race;
}

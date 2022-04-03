import _enemies from 'data/content/enemies.json';
import { sample } from 'src/utils/array';

// Should map to properties in class toJSON function for deserializing
export interface IEnemyDeserializer {
  id: string;
}

// Full data model for importing from json
export interface IEnemyDataModel extends IEnemyDeserializer {
  name: string;
  description: string;
  level: number;
  adjectives: string[];
  health: number;
  minDmg: number;
  maxDmg: number;
  behaviour: Record<string, number>;
}

// Lightweight data model for class implementation
export interface IEnemyInstance extends IEnemyDeserializer {
  // TODO: Confirm this shares a single object reference
  dataModel: IEnemyDataModel;
  name: string;
  health: number;
  maxHealth: number;
}

export class EnemyCharacter implements IEnemyInstance {
  id: string;
  dataModel: IEnemyDataModel;
  name: string;
  health: number;
  maxHealth: number;

  constructor(data: IEnemyDeserializer) {
    const dataModel = getEnemyById(data.id);

    this.id = dataModel.id;
    this.dataModel = dataModel;
    this.name = sample(dataModel.adjectives) + dataModel.name;
    this.health = dataModel.health;
    this.maxHealth = this.health;
  }

  toJSON(): IEnemyDeserializer {
    return { id: this.id };
  }
}

const enemies = (_enemies as IEnemyDataModel[]).reduce((acc, curr) => {
  Object.freeze(curr);
  acc[curr.id] = curr;
  return acc;
}, {} as { [id: string]: IEnemyDataModel });

export function getEnemyById(id: string): IEnemyDataModel {
  const enemy = enemies[id];

  if (!enemy) {
    throw `No enemy data model found for '${id}'`;
  }

  return enemy;
}

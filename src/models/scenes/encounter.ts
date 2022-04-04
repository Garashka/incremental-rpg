import { ISceneInstance } from './scenes';
import _encounters from 'src/data/content/scenes/encounters.json';
import { sample } from 'src/utils/array';
import { EEncounterType } from 'src/utils/enum';

interface IEncounterBase {
  id: string;
  type: EEncounterType;
}

export interface ICombatEncounter extends IEncounterBase {
  enemies: {
    id: string;
    count: number;
  }[];
}

export type IEncounter = ICombatEncounter;

interface ISceneEncounterDataModel {
  id: string;
  encounters: IEncounter[];
}

const encountersById = (_encounters as ISceneEncounterDataModel[]).reduce((acc, curr) => {
  Object.freeze(curr);
  acc[curr.id] = curr;
  return acc;
}, {} as { [id: string]: ISceneEncounterDataModel });

export function getEncountersForSceneId(id: string): IEncounter[] {
  const encounterData = encountersById[id];
  if (!encounterData) {
    throw `No encounter data model found for '${id}'`;
  }

  return encounterData.encounters;
}

export function getEncounters(scene: ISceneInstance): IEncounter[] {
  if (!scene.data['encounter'] || scene.data['encounter'].length === 0) {
    throw `No enounter data model found for '${scene.pid}'`;
  }
  return scene.data['encounter'].reduce((acc, curr) => {
    const encounterData = encountersById[curr];
    return acc.concat(encounterData.encounters);
  }, [] as IEncounter[]);
}

export function getRandomSceneEncounterForId(id: string): IEncounter {
  const encounterData = getEncountersForSceneId(id);
  const randomEncounter = sample(encounterData);
  return randomEncounter;
}

export function getRandomSceneEncounter(scene: ISceneInstance): IEncounter {
  const encounterData = getEncounters(scene);
  const randomEncounter = sample(encounterData);
  return randomEncounter;
}

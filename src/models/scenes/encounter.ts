import { ISceneDataModel } from './scenes';
import _encounters from 'src/data/content/scenes/encounters.json';
import { sample } from 'src/utils/array';

export interface ISceneEncounterDataModel {
  id: string;
  enemies: {
    id: string;
    count: number;
  }[];
}

const encountersById = (_encounters as ISceneEncounterDataModel[]).reduce((acc, curr) => {
  Object.freeze(curr);
  acc[curr.id] = curr;
  return acc;
}, {} as { [id: string]: ISceneEncounterDataModel });

export function getEncountersForSceneId(id: string) {
  const encounterData = encountersById[id];
  if (!encounterData) {
    throw `No enounter data model found for '${id}'`;
  }

  return encounterData;
}

export function getEncounters(scene: ISceneDataModel) {
  if (!scene.data['encounter']) {
    throw `No enounter data model found for '${scene.pid}'`;
  }

  return getEncountersForSceneId(scene.data['encounter']);
}

export function getRandomSceneEncounterForId(id: string) {
  const encounterData = getEncountersForSceneId(id);
  const randomEncounter = sample(encounterData.enemies);
  return randomEncounter;
}

export function getRandomSceneEncounter(scene: ISceneDataModel) {
  const encounterData = getEncounters(scene);
  const randomEncounter = sample(encounterData.enemies);
  return randomEncounter;
}

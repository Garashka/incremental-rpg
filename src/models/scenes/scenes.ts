import { ISceneEncounterDataModel } from './encounter';
import _scenes from 'data/content/scenes/scenes.json';
import { ESceneType } from 'src/utils/enum';

export interface ISceneDeserializer {
  // integer id used to link directly between scenes
  pid: string;
}

// Model for importing from Twison
interface ITwisonLink {
  pid: string;
  name: string;
  link: string;
}

interface ITwisonPassageModel extends ISceneDeserializer {
  // Title
  name: string;
  // Raw passage text
  text: string;
  // Links to other scenes
  links: ITwisonLink[];
  // Trimmed text without links
  cleanText: string;
  // Data for the scene
  tags: string[];
  // Position in Twine graph, unneeded
  position: {
    x: string;
    y: string;
  };
}

export interface ISceneInstance extends ISceneDeserializer {
  name: string | null;
  title: string;
  text: string;
  links: ITwisonLink[];
  type: ESceneType;
  data: Record<string, string[]>;
}

export class Scene implements ISceneInstance {
  pid: string;
  type: ESceneType = ESceneType.DIALOGUE;
  name: string | null = null;
  title: string;
  text: string;
  links: ITwisonLink[];
  tags: string[] = [];
  data: Record<string, string[]> = {};

  constructor(data: ITwisonPassageModel) {
    this.pid = data.pid;
    this.title = data.name;
    this.links = data.links;
    this.text = data.cleanText;

    if (data.tags) {
      this.initialiseTags(data.tags);
    }
  }

  private initialiseTags(modelTags: string[]) {
    modelTags.forEach((tag) => {
      if (tag.indexOf(':') === -1) {
        this.tags.push(tag);
        return;
      }

      const [key, val] = tag.split(':');
      if (Object.prototype.hasOwnProperty.call(this.data, key)) {
        throw `Duplicate key '${key}' in scene data ${this.pid}`;
      }
      this.data[key] ? this.data[key].push(val) : (this.data[key] = [val]);
    });

    if (Object.prototype.hasOwnProperty.call(this.data, 'scene')) {
      if (this.data.scene.length > 1) {
        throw `Too many keys of type 'scene' in scene data ${this.pid}`;
      }
      this.type = this.data['scene'][0] as ESceneType;
      delete this.data['scene'];
    }

    if (Object.prototype.hasOwnProperty.call(this.data, 'id')) {
      if (this.data.id.length > 1) {
        throw `Too many keys of type 'scene' in scene data ${this.pid}`;
      }
      this.name = this.data['id'][0];
      delete this.data['id'];
    }
  }

  toJSON(): ISceneDeserializer {
    return { pid: this.pid };
  }
}

const scenes = [] as Scene[];
// All scenes have a pid to directly link between each other
const scenesById = {} as Record<string, Scene>;
// Special scenes that need to be directly accessed by code can have a human readable 'name'
const scenesByName = {} as Record<string, Scene>;

(_scenes.passages as ITwisonPassageModel[]).forEach((passage) => {
  const scene = new Scene(passage);
  scenes.push(scene);

  scenesById[scene.pid] = scene;

  if (scene.name) {
    scenesByName[scene.name] = scene;
  }
});

export class SceneNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SceneNotFoundError';
  }
}

/**
 * Used to navigate programmatically between scenes
 *
 * @param pid
 * @returns The scene object associated with the pid
 */
export function getSceneById(pid: string): Scene {
  const scene = scenesById[pid];
  if (!scene) {
    throw new SceneNotFoundError(`No scene data model found for '${pid}'`);
  }
  return scene;
}

/**
 * Used for special cases where the  object needs to be directly accessed by code
 *
 * @param name
 * @returns The scene object associated with the name
 */
export function getSceneByName(name: string): Scene {
  const scene = scenesByName[name];
  if (!scene) {
    throw `No scene data model found with the name ${name}`;
  }

  return scene;
}

export default scenesById;

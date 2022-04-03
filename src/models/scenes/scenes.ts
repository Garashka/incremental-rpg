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

export interface ISceneInstance {
  name: string | null;
  title: string;
  text: string;
  links: ITwisonLink[];
  type: ESceneType;
  data: Record<string, string>;
}

class Scene implements ISceneInstance {
  pid: string;
  type: ESceneType = ESceneType.DIALOGUE;
  name: string | null = null;
  title: string;
  text: string;
  links: ITwisonLink[];
  tags: string[] = [];
  data: Record<string, string> = {};

  constructor(data: ITwisonPassageModel) {
    this.pid = data.pid;
    this.title = data.name;
    this.links = data.links;
    this.text = data.cleanText;

    this.initTags(data.tags);

    if (this.data.name) {
      this.name = this.data.name;
    }
  }

  private initTags(modelTags: string[]) {
    modelTags.forEach((tag) => {
      if (tag.indexOf(':') === -1) {
        this.tags.push(tag);
        return;
      }

      const [key, val] = tag.split(':');
      if (Object.prototype.hasOwnProperty.call(this.data, key)) {
        throw `Duplicate key '${key}' in scene data ${this.pid}`;
      }
      this.data[key] = val;
    });

    if (Object.prototype.hasOwnProperty.call(this.data, 'scene')) {
      this.type = this.data['scene'] as ESceneType;
      delete this.data['scene'];
    }

    if (Object.prototype.hasOwnProperty.call(this.data, 'id')) {
      this.name = this.data['id'];
      delete this.data['id'];
    }
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
/**
 * Used to navigate programmatically between scenes
 *
 * @param pid
 * @returns The scene object associated with the pid
 */
export function getSceneById(pid: string): Scene {
  const scene = scenesById[pid];
  if (!scene) {
    throw `No scene data model found for '${pid}'`;
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

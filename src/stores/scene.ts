import { defineStore } from 'pinia';
import router from 'src/router';

import { getSceneById, getSceneByName, Scene } from 'src/models/scenes/scenes';

export interface SceneState {
  sceneId: string;
  sceneData: Scene | null;
  previousId: string;
}

export const useSceneStore = defineStore({
  id: 'scene',

  state: (): SceneState => ({
    sceneId: '',
    sceneData: null,
    previousId: '',
  }),
  persist: {
    paths: ['sceneId', 'previousId'],
    afterRestore: (context) => {
      if (context.store.sceneId !== '') {
        context.store.setSceneById(context.store.sceneId);
      }
    },
  },
  getters: {
    title(state) {
      return state.sceneData?.title || '';
    },
    text(state) {
      return state.sceneData?.text || '';
    },
    neighbours(state) {
      return state.sceneData?.links || [];
    },
    data(state) {
      return state.sceneData?.data || {};
    },
  },
  actions: {
    setSceneById(sceneId: string) {
      try {
        const sceneData = getSceneById(sceneId);

        if (sceneData) {
          this.setScene(sceneData);
        }
      } catch (err) {
        console.error(err);
      }
    },
    setSceneByName(sceneName: string) {
      const sceneData = getSceneByName(sceneName);

      if (sceneData) {
        this.setScene(sceneData);
      }
    },
    setScene(sceneData: Scene) {
      this.previousId = this.sceneId;
      this.sceneId = sceneData.pid;
      this.sceneData = sceneData;

      if (sceneData.type) {
        router.push(`/scene/${sceneData.type}`);
      }
    },
    goToPrevious() {
      if (this.previousId === '') {
        return;
      }

      const previousScene = getSceneById(this.previousId);

      this.sceneId = previousScene?.pid || '';
      this.sceneData = previousScene;
      this.previousId = '';

      if (previousScene?.type) {
        router.push(`/scene/${previousScene.type}`);
      }
    },
  },
});

import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      {
        path: '/character-creation',
        component: () => import('pages/CharacterCreation.vue'),
      },
      {
        path: '/scene',
        component: () => import('pages/scenes/SceneFrame.vue'),
        children: [
          {
            path: 'dialogue',
            component: () => import('pages/scenes/common/SceneCommon.vue'),
          },
          {
            path: 'combat',
            component: () => import('pages/scenes/common/SceneCombat.vue'),
          },
          {
            path: 'shop',
            component: () => import('pages/scenes/shop/ShopMain.vue'),
          },
          {
            path: 'exploration',
            component: () => import('pages/scenes/wilderness/WildernessMain.vue'),
          },
        ],
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;

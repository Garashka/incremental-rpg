<template>
  <q-layout view="hHh lpr fff">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          {{ productName }}
        </q-toolbar-title>
        <div>
          <q-toggle
            :model-value="$q.dark.isActive"
            color="black"
            keep-color
            @update:model-value="() => $q.dark.toggle()"
          ></q-toggle>
        </div>
        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>

      <q-tabs align="left"> </q-tabs>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" overlay bordered> </q-drawer>

    <q-drawer v-model="rightDrawerOpen" side="right" overlay bordered>
      <character-summary></character-summary>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <div class="row">
            <div class="col-grow">{{ productName }} - {{ version }}</div>
            <q-toggle v-model="showDebugFunctions" size="xs" dense></q-toggle>
          </div>
          <admin-helper-functions v-if="showDebugFunctions" />
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { version, productName } from 'app/package.json';
import CharacterSummary from 'components/sidebar/CharacterSummary.vue';
import AdminHelperFunctions from 'src/components/AdminHelperFunctions.vue';

export default defineComponent({
  name: 'MainLayout',

  components: { CharacterSummary, AdminHelperFunctions },

  setup() {
    const leftDrawerOpen = ref(false);
    const rightDrawerOpen = ref(false);
    const showDebugFunctions = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },

      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },

      showDebugFunctions,
      toggleDebugFunctions() {
        showDebugFunctions.value = !showDebugFunctions.value;
      },

      version,
      productName,
    };
  },
});
</script>

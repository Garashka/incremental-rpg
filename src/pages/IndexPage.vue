<template>
  <q-page v-if="userStore.isNewUser" class="row items-center justify-evenly">
    <q-btn @click="onBeginClick"> Begin your adventure </q-btn>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from 'src/stores/user';
import { useSceneStore } from 'src/stores/scene';

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    useSceneStore();

    function onBeginClick() {
      router.push('/character-creation');
    }

    return { onBeginClick, userStore };
  },
});
</script>

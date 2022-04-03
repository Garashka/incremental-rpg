<template>
  <q-card class="col-lg-6 q-page-child">
    <q-card-section>
      <div class="text-h6">{{ sceneStore.title }}</div>
    </q-card-section>
    <q-card-section>
      <div id="combat-content" class="fit row justify-center q-gutter-md">
        <MessageLog :messages="messages" />
        <ActionBar v-if="userStore.playerCharacter" :character="userStore.playerCharacter" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import MessageLog from 'src/components/MessageLog.vue';
import MessageLogMessages from 'src/models/message-log';
import { useSceneStore } from 'src/stores/scene';
import ActionBar from 'src/components/combat/ActionBar.vue';
import { useUserStore } from 'src/stores/user';

export default defineComponent({
  components: { MessageLog, ActionBar },
  setup() {
    const sceneStore = useSceneStore();
    const userStore = useUserStore();

    const messages = new MessageLogMessages();
    messages.addItem('You find a hungry wolf.');

    return {
      messages,
      sceneStore,
      userStore,
    };
  },
});
</script>

<style scoped></style>

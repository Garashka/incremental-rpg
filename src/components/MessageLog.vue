<template>
  <q-scroll-area
    ref="scrollRef"
    class="scroll-area q-pa-md"
    :content-style="contentStyle"
    :content-active-style="contentActiveStyle"
    visible
  >
    <p
      v-for="(message, index) in messages.items"
      :key="message.key"
      class="q-pa-xs q-ma-none"
      :class="index < messages.items.length - 1 && 'bottom-border'"
    >
      {{ message.text }}
    </p>
  </q-scroll-area>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { QScrollArea } from 'quasar';
import MessageLogMessages from 'src/models/message-log';

export default defineComponent({
  props: {
    messages: {
      type: MessageLogMessages,
      default: () => new MessageLogMessages(),
    },
  },
  setup(props) {
    const scrollRef = ref<null | QScrollArea>(null);
    watch(
      () => props.messages.items,
      () => {
        scrollRef.value?.setScrollPercentage('vertical', 100);
      }
    );
    return {
      scrollRef,
      contentStyle: {
        backgroundColor: 'rgba(200,200,200,0.2)',
        color: '#EEE',
      },
      contentActiveStyle: {
        backgroundColor: 'rgba(200,200,200,0.3)',
        color: '#EEE',
      },
    };
  },
});
</script>

<style scoped>
.scroll-area {
  height: 500px;
  width: 100%;
  max-width: 600px;
  border: 1px solid black;
  border-right: 2px solid black;
  padding: 1px;
  border-radius: 2px;
}
p.bottom-border {
  border-bottom: 1px solid black;
}
</style>

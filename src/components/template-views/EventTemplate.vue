<template>
    <div>
        <p v-for="(string, index) in currentScene.text" :key=index>{{string}}</p>
        <Button v-for="(data, index) in currentScene.buttons" :key=index :buttonData=data @nextScene=nextScene />
    </div>
</template>

<script>
import events from '../../data/content/events';
import Button from './EventTemplateButton.vue';

export default {
  props: ['eventID'],
  data() {
    return {
      eventData: events[this.eventID],
      currentScene: events[this.eventID].scenes.start,
    };
  },
  components: {
    Button,
  },
  computed: {
    bodyText() {
      return this.eventData.scenes[this.currentScene].text;
    },
  },
  methods: {
    nextScene(scene) {
      if (scene === 'return') {
        this.$emit('endEvent');
      } else {
        this.currentScene = this.eventData.scenes[scene];
      }
    },
  },
};
</script>

<style>
h1.eventTitle {
  font-size: 24px;
  text-align: left;
}
</style>

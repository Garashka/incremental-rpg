<template>
    <div>
        <component :is="renderedFrame" v-on:nextFrame='nextFrame'></component>
    </div>
</template>

<script>
import ChooseName from './ChooseName.vue';
import ChooseGender from './ChooseGender.vue';
import ChooseClass from './ChooseClass.vue';

export default {
  components: {
    ChooseName, ChooseGender, ChooseClass,
  },
  data() {
    return {
      frameIndex: 0,
      frames: ['ChooseName', 'ChooseGender', 'ChooseClass'],
      nextScene: 'IntroRoad',
    };
  },
  created() {
    this.frameIndex = 0;
    this.$store.commit('actor/initCharacter', { index: 0 });
    this.$store.commit('setCurrentLocation', this.nextScene);
  },
  methods: {
    nextFrame() {
      this.frameIndex++;
      if (this.frameIndex >= this.frames.length) {
        this.$store.commit('setRenderedTemplate', this.nextScene);
      }
    },
  },
  computed: {
    renderedFrame() {
      if (this.$store.state.actor.initialised === false) {
        return this.frames[this.frameIndex];
      }
    },
  },
};
</script>

<style>

</style>

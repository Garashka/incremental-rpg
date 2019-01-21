<template>
    <div id="main-content">
        You are a:
        <div id="button" class="button noSelect" @click="setGender('male')">Man</div>
        <div id="button" class="button noSelect" @click="setGender('female')">Woman</div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: [],
  computed: {
  },
  methods: {
    setGender(e) {
      this.$store.commit('actor/setGender', { index: 0, gender: e });
      this.$emit('nextFrame');
    },
  },
};
</script>

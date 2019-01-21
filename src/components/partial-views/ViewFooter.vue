<template>
    <div id="footer">
        <div id="reset" class="button" @click="reset">Reset</div>
        <DebugMenu v-if="isDevMode"/>
    </div>
</template>

<script>
import DebugMenu from './DebugMenu.vue';

export default {
  components: {
    DebugMenu,
  },
  computed: {
    isDevMode() {
      if (process.env.NODE_ENV === 'development') {
        return true;
      } return false;
    },
  },
  methods: {
    reset() {
      this.$store.dispatch('reset');
    },
  },
};
</script>


<style>
#footer {
  min-height: 50px;
  background-color: #212529;
  color: #868e96;
}
.footer-content {
  border: 1px black;
  height: 32px;
  padding: 8px;
}
</style>

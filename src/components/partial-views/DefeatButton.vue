<template>
    <div class="button noSelect" @click="click()">
        Return to Town
    </div>
</template>

<script>
import navMixins from '../../mixins/navigation';

export default {
  mixins: [navMixins],
  methods: {
    click() {
      this.setLocation('VillageHealer');
      this.$store.commit('endBattle');
    },
  },
};
</script>

<style>
.button {
  margin: auto;
  margin-top: 50px;
}
</style>

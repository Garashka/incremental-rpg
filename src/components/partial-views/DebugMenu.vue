<template>
    <div id="debug-commands">
        <div class="button" @click="killPlayer">Kill Player</div>
        <div class="button" @click="restorePlayer">Restore Player</div>
        <div class="button" @click="addGold">Add Gold</div>
    </div>
</template>

<script>
export default {
  methods: {
    killPlayer() {
      this.$store.commit('actor/modifyHealth', {index: 0, delta: -9999});
    },
    restorePlayer() {
      this.$store.commit('actor/resetHealth', {index: 0});
      this.$store.commit('actor/resetAP', {index: 0});
    },
    addGold() {
      this.$store.commit('actor/modifyGold', { delta: 99999 });
    },
  },
};
</script>

<style>

</style>

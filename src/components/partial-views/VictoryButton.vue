<template>
    <div class="button noSelect" @click="click">
        Return to Forest
    </div>
</template>

<script>
export default {
  methods: {
    click() {
      this.$emit('endBattle');
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

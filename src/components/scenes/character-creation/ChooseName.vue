<template>
    <div id='name-select'>
        Your name is: <input :value="name" @input="updateName"><br />
        <div id='confirm' @click='$emit("nextFrame")' class="button noSelect">
            Confirm
        </div>
    </div>
</template>

<style>

</style>

<script>
import { mapState } from 'vuex';

export default {
  props: [],
  computed: {
    ...mapState({
      pc: state => state.actor.party[0],
      name: state => state.actor.party[0].name,
    }),
  },
  methods: {
    updateName(e) {
      this.$store.commit('actor/updateName', { index: 0, name: e.target.value });
    },
  },
};
</script>

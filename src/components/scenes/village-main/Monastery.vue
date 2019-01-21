/*
Resurrect here
Retire (start over current reincarnation)
*/
<template>
    <div>
        The brother tells you that they cannot help you. Their services are only for the poor,<br />
        infirm and dying, not for adventurers with self-inflicted wounds.<br />
        He suggests you try the village healer.<br />
        <br />
        <h1>Well of Forgetting</h1>
        Hidden in the monastery gardens is a well the locals call the 'Well of Forgetting'. <br />
        They say that if you drink from it, you can start life over.<br />
        <div class="button noSelect" 
            @click="showModal"
            >Drink from the Well
        </div>
        <Modal
            v-show="isModalVisible"
            @close="closeModal"
            @restart="restart"
        />
    </div>
</template>

<script>
import Modal from "./MonasteryModal.vue";

export default {
  components: { Modal },
  data() {
    return {
      isModalVisible: false
    };
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    restart() {
      this.isModalVisible = false;
    // this.$store.commit('setRenderedTemplate', 'ChooseClass');
      console.log('TODO: Return to class select');
    }
  }
};
</script>

<style>
</style>

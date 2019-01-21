/*
Multiple healers changing with progression? Functional difference of any kind?
E.g. Village Healer -> Medicus -> Doctor or something

TODO: Calculate cost
*/
<template>
    <div v-if="isHealthMissing">
        <p>The healer examines you thoroughly. He can give you a concoction to accelerate your recovery but it will cost 100 gold.</p>
        <div class="button noSelect" @click="heal">
            Pay for Healing
        </div>
    </div>
    <div v-else>
        The healer gives you a quick look before saying you are in perfect health and are wasting his time.
    </div>
</template>

<script>
import statusMixins from "../../../mixins/status";

export default {
  mixins: [statusMixins],
  methods: {
    heal() {
      this.$store.commit("actor/modifyGold", { delta: -100 });
      this.$store.commit("actor/resetHealth", { index: 0 });
      this.$store.commit("actor/resetAP", { index: 0 });
    }
  }
};
</script>

<style>
</style>

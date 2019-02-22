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
    <div v-else-if="justHealed">
      <p>
        The healer gives you a foul-smelling mixture, which you drink. After a few minutes you feel your wounds washed away.
      </p>
      <div class="button noSelect" @click="returnToLast">
        Return to village
      </div>
    </div>
    <div v-else>
      <p>
        The healer gives you a quick look before saying you are in perfect health and are wasting his time.
      </p>
      <div class="button noSelect" @click="returnToLast">
        Return to village
      </div>
    </div>
</template>

<script>
import statusMixins from "../../../mixins/status";
import navigationMixins from "../../../mixins/navigation";

export default {
  mixins: [statusMixins, navigationMixins],
  data() {
    return {
      justHealed: false,
    }
  },
  methods: {
    heal() {
      this.$store.commit("actor/modifyGold", { delta: -100 });
      this.$store.commit("actor/resetHealth", { index: 0 });
      this.$store.commit("actor/resetAP", { index: 0 });
      this.justHealed = true;
    },
  }
};
</script>

<style>
</style>

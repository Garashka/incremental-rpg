<template>
    <div class="button"
        @click=click
        :class="{tooExpensive: !canAfford}"
    >
        {{buttonData.text}}
    </div>
</template>

<script>
import { itemEffects } from "../../data/content/effects";
import items, { totalWeaponDamage } from "../../data/content/items";
import inventoryMixins from '../../mixins/inventory';

export default {
  mixins: [inventoryMixins],
  props: ["buttonData"],
  //   data: function() {},
  computed: {
    canAfford() {
      if (this.buttonData.cost != undefined) {
        const { currency, amount } = this.buttonData.cost;
        // let currency = this.buttonData.cost.currency;
        // let amount = this.buttonData.cost.amount;
        if (this.$store.state.actor[currency] >= amount) {
          return true;
        }
        return false;
      }
      return true;
    }
  },
  methods: {
    click() {
      if (this.canAfford) {
        if (this.buttonData.cost != undefined) {
          this.subtractCost(this.buttonData.cost);
        }
        if (this.buttonData.gain != undefined) {
          this.gainEventReward(this.buttonData.gain);
          }
        const scene = this.buttonData.nextScene[
          Math.floor(Math.random() * this.buttonData.nextScene.length)
        ];
        this.$emit("nextScene", scene);
      }
    },
  }
};
</script>

<style>
</style>

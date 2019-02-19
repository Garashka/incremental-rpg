<template>
    <tr>
        <td>{{ itemData.name }}</td>
        <td><p class="stat" v-for="(stat, idx) in weaponStats" :key="idx">{{ stat }}</p></td>
        <td>{{ itemData.cost }}</td>
        <td>
            <div class="shopButton noSelect"
            :class="{tooExpensive: !canAfford}"
            @click="buyItem"
            >
                Buy
            </div>
        </td>
    </tr>
</template>

<script>
import each from 'lodash/each';
import cloneDeep from 'lodash/cloneDeep';
import dict from '../../data/content/dictionary';
import { newItem } from '../../data/content/items';

export default {
  props: {
    itemData: Object,
  },
  computed: {
    weaponStats() {
      const output = [];
      each(this.itemData.stats, (value, key) => {
        output.push(`${dict[key]}: ${value}`);
      });
      return output;
    },
    canAfford() {
      if (this.itemData.cost <= this.$store.state.actor.gold) {
        return true;
      } return false;
    },
  },
  methods: {
    buyItem() {
      if (this.canAfford) {
        const item = newItem(this.itemData);
        this.$store.commit('actor/addToInventory', item);
        this.$store.commit('actor/modifyGold', { delta: -this.itemData.cost });
      }
    },
  },
};
</script>

<style scoped>
p.stat {
  margin: 0px;
}
td {
  padding: 4px;
  text-align: left;
  margin: 0px;
  margin-bottom: 0px;
}
.shopButton {
  position: relative;
  text-align: center;
  border: 1px solid black;
  width: 50px;
  margin-bottom: 2px;
  padding: 2px 4px;
  cursor: pointer;
  display: inline-block;
}
.tooExpensive {
  text-decoration: line-through;
  cursor: default;
}
</style>

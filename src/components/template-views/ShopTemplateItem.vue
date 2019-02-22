<template>
    <tr>
        <td>{{ itemData.name }}</td>
        <td><p class="stat" v-for="(stat, idx) in itemStats" :key="idx">{{ stat }}</p></td>
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
import itemMixins from '../../mixins/items'

export default {
  mixins: [itemMixins],
  props: {
    itemData: Object,
  },
  computed: {
    canAfford() {
      if (this.itemData.price <= this.$store.state.actor.gold) {
        return true;
      } return false;
    },
  },
  methods: {
    buyItem() {
      if (this.canAfford) {
        this.$store.commit('actor/addToInventory', this.itemData.id);
        this.$store.commit('actor/modifyGold', { delta: -this.itemData.price });
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

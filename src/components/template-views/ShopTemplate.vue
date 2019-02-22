<template>
    <div>
        <table>
            <th>Item</th>
            <th>Stats</th>
            <th>Cost</th>
            <th>Purchase</th>
            <ShopItem v-for="(value, index) in shopInventory"
            :itemData="value"
            :key="index"
            />
        </table>
    </div>
</template>

<script>
import each from 'lodash/each';
import ShopItem from './ShopTemplateItem.vue';
import itemMixins from '../../mixins/items';

export default {
  mixins: [itemMixins],
  components: {
    ShopItem,
  },
  data() {
    return {
      shopData: this.$store.getters.currentLocationData,
    };
  },
  computed: {
    shopInventory() {
      const inventory = [];
      each(this.shopData.inventory, (item) => {
        inventory.push(this.findItemByID(item));
      });
      return inventory;
    },
  },
};
</script>

<style>
table {
    /* border: 1px solid black; */
    border-collapse: collapse;
    box-sizing: border-box;
}
th {
    padding: 5px;
}
</style>

<template>
    <div>
        <p v-for="(item, index) in inventory" :key="index">
            <b>{{itemName(item)}}</b><br />
            {{itemDescription(item)}}<br />
            {{itemStats(item).join('\r\n')}}
        </p>
    </div>
</template>

<script>
import items from '../../game/content/items';
import dict from '../../game/content/dictionary';
import each from 'lodash/each';

export default {
  data() {
    return {
      inventory: this.$store.state.actor.inventory,
    };
  },
  methods: {
    itemName(item) {
      if (this.isEquipped(item)) {
        return `${item.name} (e)`;
      } 
      return item.name;
    },
    itemDescription(item) {
      return item.description;
    },
    itemStats(item) {
      const stats = item.stats;
      const output = [];
      each(stats, (val, key) => {
        output.push(`${dict[key]}: ${val}`);
      });
      return output;
    },
    isEquipped(item) {
      return item.equipped;
    },
  },
};
</script>

<style>

</style>

<template>
  <div>
    <b>{{itemName(item)}}</b>
    <br>
    {{itemDescription(item)}}
    <br>
    <template v-for="(line, index) in itemStats(item)">
      {{line}}
      <br :key="index">
    </template>
    <div class="button" v-if="isEquipped">Equip</div>
    <div class="button" v-else>Unequip</div>
    <div class="button">Drop</div>
  </div>
</template>

<script>
import each from 'lodash/each';
import dict from '../../game/content/dictionary';

export default {
  props: ['item'],
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
    equip(item) {
        //Sanity check not equipped
        console.log(`TODO: Equip ${item.name}`);
    },
    unequip(item) {
        //Sanity check is equipped
        console.log(`TODO: Unequip ${item.name}`);
    },
  }
};
</script>

<style>
.button {
  position: relative;
  text-align: center;
  border: 1px solid black;
  min-width: 20px;
  margin: 3px;
  padding: 3px 5px;
  cursor: pointer;
  font-size: 0.7em;
  display: inline-block;
}

</style>

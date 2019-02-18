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
    <div class="button-inventory noSelect" v-if="isEquipped" @click="equip">Equip</div>
    <div class="button-inventory noSelect" v-else @click="unequip">Unequip</div>
    <div class="button-inventory noSelect" :class="{essential: !isEssential}" @click="dispose">Drop</div>
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
    isEssential(item) {
      return item.essential;
    },
    equip() {
        // Sanity check not equipped
        console.log(`TODO: Equip ${this.item.name}`);
    },
    unequip() {
        // Sanity check is equipped
        console.log(`TODO: Unequip ${this.item.name}`);
    },
    dispose() {
      // Sanity check item should allowed to dispose
      if (this.item.essential == false) {
        console.log(`TODO: Dispose ${this.item.name}`);
      } else {
        console.log(`Cannot dispose of ${this.item.name} - marked as essential`);
      }
    }
  }
};
</script>

<style>
.button-inventory {
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

.essential {
  text-decoration: line-through;
}

</style>

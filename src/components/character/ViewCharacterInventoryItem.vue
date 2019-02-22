<template>
  <div>
    <b>{{itemName()}}</b>
    <br>
    {{itemDescription()}}
    <br>
    <template v-for="(line, index) in itemStats">
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
import dict from '../../data/content/dictionary';
import itemMixins from '../../mixins/items'

export default {
  mixins: [itemMixins],
  props: ['item'],
  data() {
    return {
      itemData: this.findItemByID(this.item.id),
    };
  },
  methods: {
    itemName() {
      if (this.isEquipped(this.item)) {
        return `${this.itemData.name} (e)`;
      }
      return this.itemData.name;
    },
    itemDescription() {
      return this.itemData.description;
    },
    isEquipped(item) {
      return item.equipped;
    },
    isEssential(item) {
      return item.essential;
    },
    equip() {
        // Sanity check not equipped
        console.log(`TODO: Equip ${this.itemData.name}`);
    },
    unequip() {
        // Sanity check is equipped
        console.log(`TODO: Unequip ${this.itemData.name}`);
    },
    dispose() {
      // Sanity check item should allowed to dispose
      if (this.item.essential == false) {
        console.log(`TODO: Dispose ${this.itemData.name}`);
      } else {
        console.log(`Cannot dispose of ${this.itemData.name} - marked as essential`);
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

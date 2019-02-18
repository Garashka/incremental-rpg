<!-- TODO: Split between different item types in inventory -->

<template>
    <div>
        <p v-for="(item, index) in inventory" :key="index">
          <ItemTemplate :item="item"></ItemTemplate>
        </p>
    </div>
</template>

<script>
import items from '../../game/content/items';
import ItemTemplate from './ViewCharacterInventoryItem';

export default {
  components: {
    ItemTemplate
  },
  data() {
    return {
      inventory: this.$store.state.actor.inventory,
    };
  },
  methods: {
  },
};
</script>

<style>

</style>

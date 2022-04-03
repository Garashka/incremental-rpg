<template>
  <table>
    <th>Item</th>
    <th>Price</th>
    <th>Purchase</th>
    <tr v-for="item in shopInventory" :key="item.id">
      <td>{{ item.name }}</td>
      <td>{{ item.price }}</td>
      <td>
        <q-btn>Buy</q-btn>
      </td>
    </tr>
  </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useSceneStore } from 'src/stores/scene';
import { getShopById } from 'src/models/scenes/shop';

export default defineComponent({
  setup() {
    const sceneStore = useSceneStore();

    const shopId = sceneStore.data.shop;
    const shopData = getShopById(shopId);
    const shopInventory = shopData?.inventory || [];

    return {
      shopInventory,
    };
  },
});
</script>

<style scoped></style>

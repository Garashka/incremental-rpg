<template>
  <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">404</div>

      <div class="text-h2" style="opacity: 0.4; margin: 10px">Oops. Nothing here...</div>

      <admin-helper-functions />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AdminHelperFunctions from 'src/components/AdminHelperFunctions.vue';

export default defineComponent({
  name: 'ErrorNotFound',
  components: { AdminHelperFunctions },
});
</script>

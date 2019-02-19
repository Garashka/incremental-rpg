<template>
    <div>
        You awaken in a clearing, with no recollection how you arrived. Your memories are foggy, but judging from your attire you're pretty sure you are a:<br />
        <table>
            <tr>
                <ClassStatblock
                    v-for="(value, key) in unlockedClasses"
                    v-bind:key="key"
                    v-bind:klass="value"
                    v-bind:id="key"
                    @selected="setClass"
                ></ClassStatblock>
            </tr>
        </table>
    </div>
</template>

<script>
import ClassStatblock from './ChooseClassStatblock.vue';
import characterClasses from '../../../data/content/classes.js';

export default {
  data() {
    return {
      characterClasses,
    };
  },
  components: {
    ClassStatblock,
  },
  computed: {
    unlockedClasses() {
      let result = {};
      Object.entries(characterClasses).forEach(([key, value]) => {
        if (value.unlocked == true) {
          result[key] = value;
      }});
      return result;
    }
  },
  methods: {
    setClass(id) {
      this.$store.commit('actor/setClass', { index: 0, klass: id });
      console.log(`Initialising player class to ${id}`);
      this.$emit('nextFrame');
    },
  },
};
</script>

<style scoped>
table {
    border-collapse: collapse;
    box-sizing: border-box;
}

/* #characterClasses table {
	display: block;
	// margin: auto;
	border-collapse: collapse;
}

#characterClasses td {
	display: inline-block;
	max-width: 200px;
	padding: 5px;
	border: 2px solid #868e96;
} */
</style>

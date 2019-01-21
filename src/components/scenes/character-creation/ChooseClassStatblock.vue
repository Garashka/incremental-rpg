<template>
    <td>
        {{ klass.name }}<br/>
        {{ klass.description }}<br/>
        <br/>
        Starting Equipment:<br/>
        <ul>
            <li v-for="(value, key) in klass.inventory" v-bind:key="key">
                {{ items[value].name }}
            </li>
        </ul>
        <br/>
        Available Skills:
        <ul>
            <li v-for="(value, key) in klass.availableSkills" v-bind:key="key">
                {{ skills[value].name }}
            </li>
        </ul>
        <div id="button" class="button noSelect" @click="setClass(id)">Choose {{ klass.name }}</div>
    </td>
</template>

<script>
import skills from '../../../game/content/skills.js';
import items from '../../../game/content/items.js';

export default {
  data() {
    return {
      skills,
      items,
    };
  },
  props: ['klass', 'id'],
  methods: {
    setClass(id) {
      this.$emit('selected', id);
    },
  },
};
</script>

<style scoped>
td {
    max-width: 200px;
    padding: 5px;
    display: inline-block;
    border: 2px solid #868e96;
    margin: -1px;
}
ul {
    list-style-type: none;
    list-style-position:inside;
    margin:0;
    padding:0;
}
</style>

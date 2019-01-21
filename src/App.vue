<template>
  <div id="app">
    <b-container fluid id="header">
        <ViewHeader/>
    </b-container>
    <b-container fluid id="content">
      <b-row>
        <b-col col sm="2"><ViewSidebar @setRenderedTemplate='setRenderedTemplate' @setCurrentLocation='setCurrentLocation'/></b-col>
        <b-col col sm="9"><ViewBody @setRenderedTemplate='setRenderedTemplate' @setCurrentLocation='setCurrentLocation'/></b-col>
      </b-row>
      <b-row>
        <b-col>
          <ViewFooter/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import ViewBody from './components/partial-views/ViewBody.vue';
import ViewHeader from './components/partial-views/ViewHeader.vue';
import ViewFooter from './components/partial-views/ViewFooter.vue';
import ViewSidebar from './components/partial-views/ViewSidebar.vue';

export default {
  name: 'app',
  components: {
    ViewBody,
    ViewHeader,
    ViewFooter,
    ViewSidebar,
  },
  created() {
    if (this.$store.state.actor.initialised == false) {
      this.setRenderedTemplate('CharacterCreation');
    }
  },
  methods: {
    setRenderedTemplate(template) {
      this.$store.commit('setRenderedTemplate', template);
    },
    setCurrentLocation(location) {
      this.$store.commit('setCurrentLocation', location);
    },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#content {
  padding: 0px;
}
</style>

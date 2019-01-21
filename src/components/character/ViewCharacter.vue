<template>
    <div id='character-page'>
        <b-card no-body>
            <b-tabs card>
            <b-tab title='Character'>
                <Character />
            </b-tab>
            <b-tab title='Inventory'>
                <Inventory />
            </b-tab>
            <b-tab title='Skills'>
                <Skills />
            </b-tab>
            <b-tab title='Tactics'>
                <Tactics />
            </b-tab>
            <b-tab title='Achievements'>
                <Achievements />
            </b-tab>
            </b-tabs>
        </b-card>
    </div>
</template>

<script>
import Character from './ViewCharacterStats.vue';
import Inventory from './ViewCharacterInventory.vue';
import Skills from './ViewCharacterSkills.vue';
import Tactics from './ViewCharacterTactics.vue';
import Achievements from './ViewCharacterAchievements.vue';

export default {
  components: {
    Character, Inventory, Skills, Tactics, Achievements,
  },

};
</script>

<style>
    #character-page {
        width: 80%;
        display: inline-block;
        margin: 30px;
    }
    div.card-body {
        min-height: 500px;
    }
    a.nav-link {
        color: #696969;
    }
    a.active {
        cursor: default;
    }
</style>

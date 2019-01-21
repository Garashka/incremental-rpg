<template>
    <div class='combatButton noSelect' @click='click'>Use Tactics</div>
</template>

<script>
import each from "lodash/each";
import { tacticTargets, tacticConditions } from "../../game/content/tactics";
import skills from "../../game/content/skills";

export default {
  props: {
    battle: Object,
    casterIndex: Number
  },
  computed: {
    caster() {
      return this.battle.party[this.casterIndex];
    },
    tactics() {
      return this.caster.tactics;
    }
  },
  methods: {
    click() {
      each(this.tactics, (tactic, index) => {
        let target = tacticTargets[tactic.targetType].evaluate(this.battle);
        if (tacticConditions[tactic.condition].evaluate(target)) {
          if (this.canUse(tactic.action)) {
            const msg = skills[tactic.action].action({
              caster: this.caster,
              target: target
            });
            if (!("silent" in skills[tactic.action].type)) {
              this.$emit("addToLog", msg);
            }
            this.$emit("update");
            this.$emit("nextTurn");
            return false;
          }
        }
      });
    },
    canUse(action) {
      if (skills[action].actionPointCost <= this.caster.currentActionPoints) {
        return true;
      }
      return false;
    }
  }
};
</script>

<style>
</style>

<template>
    <div class="combatButton noSelect"
        v-bind:class="{tooExpensive: !canUse}"
        @click="useSkill"
    >
        {{ actionData.name }}
    </div>
</template>

<script>
// To make skills not care about if caster is party or pc we may need to make the store
// Hold PC and party data in an object and access by key
import skills from "../../data/content/skills/index";

export default {
  props: {
    action: String,
    caster: Object,
    target: Object
  },
  data() {
    return {
      actionData: {}
    };
  },
  computed: {
    canUse() {
      if (this.actionData.actionPointCost <= this.caster.currentActionPoints) {
        return true;
      }
      return false;
    }
  },
  methods: {
    useSkill() {
      if (this.canUse) {
        // TODO: Accomodate parties. Probably pass in current character as prop
        let payload = { caster: this.caster };
        if (this.actionData.validTargets.includes("self")) {
          payload.target = this.caster;
        } else payload.target = this.target;
        const msg = this.actionData.action(payload);
        // In case of future dummy or silent actions
        if (!("silent" in this.actionData.type)) {
          this.$emit("addToLog", msg);
        }
        this.$emit("update");
        this.$emit("nextTurn");
      }
    }
  },
  created() {
    this.actionData = skills[this.action];
  }
};
</script>

<style scoped>
.tooExpensive {
  background: red;
  text-decoration: line-through;
  cursor: auto;
}
</style>

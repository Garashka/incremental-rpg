export class Item {
    constructor(key, dict, equipped = false) {
        this.name = dict.name || `TODO: Name missing from ${key}`;
        this.description = dict.description || `TODO: Description missing from ${key}`;
        this.cost = dict.cost;
        this.stats = dict.stats;
        this.slot = dict.slot || `TODO: No slot type for ${key}`;
        this.equipped = equipped;
        if (dict.enhancements) {
          this.enhancements = dict.enhancements;
        } else {
          this.enhancements = {};
        }
        if (dict.essential) {
          this.essential = dict.essential;
        } else this.essential = false;
    }
}
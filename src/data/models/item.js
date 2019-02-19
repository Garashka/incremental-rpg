const uuid = require('uuid/v4');

class Item {
    constructor(dict, equipped = false) {
        this.id = dict.id;
        this.uuid = uuid();
        this.name = dict.name || `TODO: Name missing from ${key}`;
        this.description = dict.description || `TODO: Description missing from ${key}`;

        this.price = dict.price;
        this.stats = dict.stats;
        this.type = dict.type;
        this.slot = dict.slot || `TODO: No slot type for ${key}`;
        this.canEquip = dict.canEquip || false;
        
        this.equipped = equipped;
        if (dict.enhancements) {
          this.enhancements = dict.enhancements;
        } else this.enhancements = {};
        if (dict.essential) {
          this.essential = dict.essential;
        } else this.essential = false;
    }
}

module.exports = Item;
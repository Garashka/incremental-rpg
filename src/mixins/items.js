
import each from 'lodash/each';
import dict from '../data/content/dictionary';
import { allItems } from '../data/content/items/index';

export default {
    methods: {
        findItemByID(id) {
            const item = allItems.find(i => i.id == id);
            return item;
        },
        findItemDataByInstance(item) {
            const itemData = allItems.find(i => i.id == item.id)
            return itemData;
        }
    },
    computed: {
        itemStats(itemData) {
            const output = [];
            each(this.itemData.stats, (subobj, statType) => {
                each(subobj, (statVal, stat) => {
                    output.push(`${dict[stat]} ${dict[statType]}: ${statVal}`);
                })
            });
            return output;
        },
    }
}
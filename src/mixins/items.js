
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
    }
}
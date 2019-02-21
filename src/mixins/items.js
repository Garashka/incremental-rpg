
import {allItems} from '../data/content/items/index';

export default {
    methods: {
        findItemByID(id) {
            const item = allItems.find(i => i.id == id);
            return item;
        }
    }
}
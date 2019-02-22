import uuid from 'uuid/v4';

export default function ItemInstance(dict) {
  let item = {};
  item.id = dict.id;
  item.uuid = dict.uuid || uuid();
  
  if (dict.essential) {
    item.essential = dict.essential;
  } else item.essential = false;
  return item;
}


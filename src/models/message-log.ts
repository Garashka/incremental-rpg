export default class MessageLog {
  items: MessageLogItem[];
  maxItems: number;
  currKey: number;

  constructor(maxItems = 100) {
    this.items = [];
    this.maxItems = maxItems;
    this.currKey = 0;
  }

  addItem(message: string) {
    if (this.items.length >= this.maxItems) {
      this.items.shift();
    }

    this.items.push(new MessageLogItem(message, this.currKey));
    this.currKey += 1;
  }

  clear() {
    this.items = [];
  }
}

class MessageLogItem {
  text: string;
  key: number;

  constructor(text: string, key: number) {
    this.text = text;
    this.key = key;
  }
}

let ItemManager = (function() {
  function validateItemData(itemName, category, quantity) {
    const MIN_NAME_LENGTH = 5;
    const MIN_CATEGORY_LENGTH = 5;
    const nameIsValid = (name) => name.replaceAll(" ", "").length >= MIN_NAME_LENGTH;
    const isOneWord = (word) => word.split(" ").length === 1;
    const categoryIsValid = (cat) => ((cat.length >= MIN_CATEGORY_LENGTH)
      && (isOneWord(cat)));
    const quantityIsValid = (quant) => quant >= 0;

    return nameIsValid(itemName) && categoryIsValid(category) && quantityIsValid(quantity);
  }

  function createSkuCode(itemName, category) {
    return (itemName.replaceAll(" ", "").slice(0, 3) + category.slice(0, 2)).toUpperCase();
  }

  return {
    items: [],

    create(itemName, category, quantity) {
      if (validateItemData(itemName, category, quantity)) {
        let skuCode = createSkuCode(itemName, category);
        this.items.push({
          skuCode,
          itemName,
          category,
          quantity
        });

        return true;
      } else {
        return false;
      }
    },

    getItemIndex(skuCode) {
      return this.items.findIndex((item) => item.skuCode === skuCode);
    },

    getItem(skuCode) {
      return this.items[this.getItemIndex(skuCode)];
    },

    update(skuCode, object) {
      Object.assign(this.getItem(skuCode), object);
    },
    
    delete(skuCode) {
      this.items.splice(this.getItemIndex(skuCode), 1);
    },

    inStock() {
      return this.items.filter((item) => item.quantity > 0);
    },
    
    itemsInCategory(category) {
      return this.items.filter((item) => item.category === category);
    },
  }
})();

let ReportManager = {
  init(itemManager) {
    this.items = itemManager;
  },

  reportInStock() {
    console.log(this.items.inStock().map((item) => item.itemName).join(", "));
  },

  createReporter(skuCode) {
    let item = this.items.getItem(skuCode);

    return {
      itemInfo() {
        Object.keys(item).forEach((key) => {
          console.log(`${key}: ${item[key]}`);
        });
      }
    };
  }
}

console.log(ItemManager.create('basket ball', 'sports', 0));           // valid item
console.log(ItemManager.create('asd', 'sports', 0));
console.log(ItemManager.create('soccer ball', 'sports', 5));           // valid item
console.log(ItemManager.create('football', 'sports'));
console.log(ItemManager.create('football', 'sports', 3));              // valid item
console.log(ItemManager.create('kitchen pot', 'cooking items', 0));
console.log(ItemManager.create('kitchen pot', 'cooking', 3));          // valid item
// returns list with the 4 valid items
console.log(ItemManager.items);

ReportManager.init(ItemManager);
// logs soccer ball,football,kitchen pot
ReportManager.reportInStock();

ItemManager.update('SOCSP', { quantity: 0 });
// returns list with the item objects for football and kitchen pot
console.log(ItemManager.inStock());
// football,kitchen pot
ReportManager.reportInStock();

// returns list with the item objects for basket ball, soccer ball, and football
console.log(ItemManager.itemsInCategory('sports'));

ItemManager.delete('SOCSP');
// returns list the remaining 3 valid items (soccer ball is removed from the list)
console.log(ItemManager.items);

let kitchenPotReporter = ReportManager.createReporter('KITCO');
kitchenPotReporter.itemInfo();
// logs
// skuCode: KITCO
// itemName: kitchen pot
// category: cooking
// quantity: 3

ItemManager.update('KITCO', { quantity: 10 });
kitchenPotReporter.itemInfo();
// logs
// skuCode: KITCO
// itemName: kitchen pot
// category: cooking
// quantity: 10
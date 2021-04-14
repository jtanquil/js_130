"use strict";

function makeList() {
  let listItems = [];

  return {
    add(listItem) {
      listItems.push(listItem);
      console.log(`${listItem} added!`);
    },

    remove(listItem) {
      listItems.splice(listItems.indexOf(listItem), 1);
      console.log(`${listItem} removed!`);
    },

    list() {
      if (listItems.length === 0) {
        console.log("The list is empty.");
      } else {
        listItems.forEach((item) => console.log(item));
      }
    }
  };
}

let list = makeList();
list.add("peas");
console.log("");
list.list();
console.log("");
list.add("corn");
console.log("");
list.list();
console.log("");
list.remove("peas");
console.log("");
list.list();

console.log(list.listItems); // undefined <= listItems only accessible through list methods via closure!
## JS 130 - Closures and Private Data Practice Problems ##

1. 

```javascript
function makeCounterLogger(firstNumber) {
  return (secondNumber) => {
    if (firstNumber <= secondNumber) {
      for (let count = firstNumber; count <= secondNumber; count += 1) {
        console.log(count);
      }
    } else {
      for (let count = firstNumber; count >= secondNumber; count -= 1) {
        console.log(count);
      }
    }
  }
}

let countlog = makeCounterLogger(5);
countlog(8);
countlog(2);
```

2.

```javascript
function makeList() {
  let listItems = [];

  return (listItem) => {
    if (!listItem) {
      if (listItems.length === 0) {
        console.log("The list is empty");
      } else {
        listItems.forEach((item) => {
          console.log(item);
        });
      }
    } else {
      let listItemIndex = listItems.indexOf(listItem);

      if (listItemIndex >= 0) {
        listItems.splice(listItemIndex, 1);
        console.log(`${listItem} removed!`);
      } else {
        listItems.push(listItem);
        console.log(`${listItem} added!`);
      }
    }
  }
}
```

## More Practice Problems ##

2. Even though `makeList` returns an object with methods instead of a function, these methods are still function definitions, so via closure, they have access to variables in their surrounding scope, in particular `listItems`, just as the function returned by `makeList` in the previous problem did.

```javascript
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
```

// default value of thisArg is set to the global object (value of this outside of a function invocation)
function forEach(arr, callback, thisArg = this) {
  for (let index = 0; index < arr.length; index += 1) {
    callback.call(thisArg, arr[index], index, arr);
  }
}

class Foo {
  constructor(prefix) {
    this.prefix = prefix;
  }

  showItem(item) {
    console.log(this.prefix, item);
  }
}

let foo = new Foo("Item: ");
// [1, 2, 3].forEach(foo.showItem, foo); // => foo is the context
// [4, 5, 6].forEach(foo.showItem); // => throws error, undefined is the context

forEach(["a", "b", "c"], (item) => console.log(item));
forEach([1, 2, 3], foo.showItem, foo);
forEach([4, 5, 6], foo.showItem);
forEach(["a", "b", "c"], (value, index, arr) => {
  console.log(`After ${value} comes ${arr[index + 1]}`);
});
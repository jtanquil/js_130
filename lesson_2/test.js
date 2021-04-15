function test(...args) {
  let [ first, ...rest ] = args;
  let [ last, ...middle ] = rest.reverse();

  return {
    first,
    last,
    middle: middle.sort(),
  };
}

let hello = ["h", "e", "l", "l", "o"];
let { first, last, middle } = test(...hello);
console.log(first);
console.log(last);
console.log(middle);
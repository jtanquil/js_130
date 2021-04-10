// 1. filter
function filter(arr, callback, thisArg = this) {
  let filteredArr = [];

  for (let index = 0; index < arr.length; index += 1) {
    if (callback.call(thisArg, arr[index], index, arr)) {
      filteredArr.push(arr[index]);
    }
  }

  return filteredArr;
}

let numbers = [1, 2, 3, 4, 5];
console.log(filter(numbers, number => number > 3)); // => [ 4, 5 ]
console.log(filter(numbers, number => number < 0)); // => []
console.log(filter(numbers, () => true));           // => [ 1, 2, 3, 4, 5 ]

let values = [1, "abc", null, true, undefined, "xyz"];
console.log(filter(values, value => typeof value === "string"));
// => [ 'abc', 'xyz' ]

// 2. map
function map(arr, callback, thisArg = this) {
  let mappedArr = [];

  for (let index = 0; index < arr.length; index += 1) {
    mappedArr.push(callback.call(thisArg, arr[index], index, arr));
  }

  return mappedArr;
}

console.log(map(numbers, number => number * 3));  // => [ 3, 6, 9, 12, 15 ]
console.log(map(numbers, number => number + 1));  // => [ 2, 3, 4, 5, 6 ]
console.log(map(numbers, () => false));
// => [ false, false, false, false, false ]

console.log(map(values, value => String(value)));
// => [ '1', 'abc', 'null', 'true', 'undefined', 'xyz' ]

// 3. reduce
function reduce(arr, callback, initialAccumulator = arr[0]) {
  let accumulator = initialAccumulator;

  for (let index = 0; index < arr.length; index += 1) {
    accumulator = callback(accumulator, arr[index]);
  }

  return accumulator;
}

console.log(reduce(numbers, (accum, number) => accum + number));   // => 15
console.log(reduce(numbers, (prod, number) => prod * number));     // => 120
console.log(reduce(numbers, (prod, number) => prod * number, 3));  // => 360
console.log(reduce([], (accum, number) => accum + number, 10));    // => 10
console.log(reduce([], (accum, number) => accum + number));
// => undefined

let stooges = ["Mo", "Larry", "Curly"];
console.log(reduce(stooges, (reversedStooges, stooge) => {
  reversedStooges.unshift(stooge);
  return reversedStooges;
}, []));
// => ["Curly", "Larry", "Mo"]

// 3a. filter with reduce
function filterWithReduce(arr, callback) {
  return arr.reduce((acc, ele) => {
    if (callback(ele)) {
      return [...acc, ele];
    } else {
      return acc;
    }
  }, [])
}

console.log(filterWithReduce(numbers, number => number > 3)); // => [ 4, 5 ]
console.log(filterWithReduce(numbers, number => number < 0)); // => []
console.log(filterWithReduce(numbers, () => true));           // => [ 1, 2, 3, 4, 5 ]

console.log(filterWithReduce(values, value => typeof value === "string"));

// 3b. map with reduce
function mapWithReduce(arr, callback) {
  return arr.reduce((acc, ele) => [...acc, callback(ele)], []);
}

console.log(mapWithReduce(numbers, number => number * 3));  // => [ 3, 6, 9, 12, 15 ]
console.log(mapWithReduce(numbers, number => number + 1));  // => [ 2, 3, 4, 5, 6 ]
console.log(mapWithReduce(numbers, () => false));
// => [ false, false, false, false, false ]

console.log(mapWithReduce(values, value => String(value)));
// => [ '1', 'abc', 'null', 'true', 'undefined', 'xyz' ]
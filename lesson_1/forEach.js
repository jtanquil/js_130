function forEach(arr, callback) {
  for (let index = 0; index < arr.length; index += 1) {
    callback(arr[index]);
  }
}

let arr = [1, 2, 3, 4];

arr.forEach((value) => console.log(value * value));

forEach(arr, (value) => console.log(value * value));
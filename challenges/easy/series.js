// Series class:
// take a string as an argument, assume the characters are all digits
// take the string. split it, map each character to its number equivalent, store the result in this.digits
// slices method:
// input: integer, num
// output: nested array where each array contains a subsequence from consecutive entries of 
// this.digits of length num
// this.digits = [0, 1, 2, 3, 4]
// slices(2) => [[0, 1], [1, 2], [2, 3], [3, 4]]
// if num > this.slices.length, throw an error
// 1. let allSlices = [], let offset = 0
// 2. if num > this.slices.length, throw an error
// 3. otherwise, push this.slices.slice(offset, offset + num) to allSlices
// 4. increment offset by 1
// 5. repeat steps 3/4 until offset = this.slices.length - num

class Series {
  constructor(string) {
    this.digits = string.split("").map((digit) => Number(digit));
  }

  slices(sliceLength) {
    if (sliceLength > this.digits.length) {
      throw new Error("slice length cannot be longer than the number of digits");
    }

    let allSlices = [];

    for (let offset = 0; offset < this.digits.length - sliceLength; offset += 1) {
      allSlices.push(this.digits.slice(offset, offset + sliceLength));
    }

    return allSlices;
  }
}

module.exports = Series;
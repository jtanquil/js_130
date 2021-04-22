// classify static method:
// input: integer
// output: error if the input <= 0 or input isn't an integer
// "deficient" if its Aliquot sum is < input
// "perfect" if its Aliquot sum is = input
// "abundant" if its Aliquot sum is > input
// given num, if num <= 0, throw an error, otherwise, 
// iterate through the positive integers < num,
// add up those integers that are divisors of num,
// return the result

class PerfectNumber {
  static classify(num) {
    if (num <= 0 || !Number.isInteger(num)) {
      throw new Error("Input needs to be a positive integer");
    } else {
      let aliquotSum = 0;

      for (let count = 1; count < num; count += 1) {
        if (num % count === 0) {
          aliquotSum += count;
        }
      }

      if (aliquotSum < num) {
        return "deficient";
      } else if (aliquotSum === num) {
        return "perfect";
      } else {
        return "abundant";
      }
    }
  }
}

module.exports = PerfectNumber;
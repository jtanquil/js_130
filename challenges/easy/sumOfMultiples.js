// SumOfMultiples object
// takes a list of integers as arguments
// store them in array this.factors

// .to instance and static method
// .to instance: compute the sum of the multiples of this.factors < input integer
// .to static: create new SumOfMultiples(3, 5), invoke .to on that

// .to (instance)
// input: positive integer
// output: sum of the multiples of this.factors < input
// 1. let sum = 0;
// 2. iterate over the integers >= 1, but < input
// 3. for each integer, if it is a multiple of some number in this.factors, add it to sum
// 4. return sum

class SumOfMultiples {
  static to(value) {
    return new SumOfMultiples().to(value);
  }

  constructor(...factors) {
    this.factors = factors.length > 0 ? factors : [3, 5];
  }

  to(value) {
    let sum = 0;

    for (let counter = 1; counter < value; counter += 1) {
      if (this.factors.some((factor) => counter % factor === 0)) {
        sum += counter;
      }
    }

    return sum;
  }
}

module.exports = SumOfMultiples;
// Triangle object
// constructor: 3 numbers representing side lengths as an argument
// - trying to construct an invalid triangle throws an error
// (all sides have length > 0, sum of any two side lengths > length of the third side) 
// `kind` instance method: returns the kind of triangle:
// equilateral: all sides are the same length
// isosceles: exactly 2 sides are the same length
// scalene: all sides are different lengths

class Triangle {
  constructor(firstSide, secondSide, thirdSide) {
    this.firstSide = firstSide;
    this.secondSide = secondSide;
    this.thirdSide = thirdSide;

    if (!this._isValid()) {
      throw new Error("Invalid triangle");
    }
  }

  kind() {
    let sides = [this.firstSide, this.secondSide, this.thirdSide];

    if (sides.every((side) => side === this.firstSide)) {
      return "equilateral";
    } else if
      ((sides[0] === sides[1]) || (sides[0] === sides[2]) || (sides[1] === sides[2])) {
        return "isosceles";
    } else {
      return "scalene";
    }
  }

  _isValid() {
    if (Math.min(this.firstSide, this.secondSide, this.thirdSide) <= 0) {
      return false;
    } else {
      return (this.firstSide + this.secondSide > this.thirdSide) &&
        (this.firstSide + this.thirdSide > this.secondSide) &&
        (this.secondSide + this.thirdSide > this.firstSide);
    }
  }
}

module.exports = Triangle;
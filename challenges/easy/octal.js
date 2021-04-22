// Octal object:
// constructor takes a string as an argument
// if the string is a valid octal string, store it in this.octalValue
// if it isn't, set this.octalValue = 0;
// a string is a valid octal value <=> every character in the string is a digit from 0-7

// toDecimal instance method
// output: the decimal value of this.octalValue
// 1. let digits = this.octalValue.split(""), let decimalValue = 0;
// 2. for each digit in digits, multiply it by 8 ^ (digits.length - 1 - index of digit), add the result to decimalValue
// 3. return decimalValue
// digits = [2, 0, 4, 7]
// 2 * (8 ** 3) + 0 * (8 ** 2) + 4 * (8 ** 1) + 7 * 1 = 1024 + 0 + 32 + 7 = 1063

class Octal {
  static isValidOctalString(string) {
    const VALID_OCTAL_CHARS = ["0", "1", "2", "3", "4", "5", "6", "7"];

    return string.split("").every((char) => VALID_OCTAL_CHARS.includes(char));
  }

  constructor(string) {
    this.octalValue = Octal.isValidOctalString(string) ? string : "0";
  }

  toDecimal() {
    let digits = this.octalValue.split("");

    return digits.reduce((decimalValue, digit, index) =>
      decimalValue + Number(digit) * (8 ** (digits.length - 1 - index)), 0);
  }
}

module.exports = Octal;
// 1990 => 1000 + 900 + 90 => M + CM + XC => MCMXC
// 4 => IV, 9 => IX, 40 => XL, 50 => L
// given a number, split it up into thousands/hundreds/tens/ones
// get the corresponding numeral for each, concatenate them
// for any of these, if the leading digit is 0, corresponding numeral for that part is empty
// thousands: M * thousands digit
// hundreds: 1-3 => C-CCC, 4 => CD, 5 => D, 6-8 => DC-DCC, 9 => CM
// tens: 1-3 => X-XXX, 4 => XL, 5 => L, 6-8 => LX-LXXX, 9 => XC
// ones: 1-3 => I-III, 4 => IV, 5 => V, 6-8 => VI-VIII, 9 => IX

// RomanNumeral class: constructor takes a number (positive integer) as an argument (store it in a property, value)
// toRoman method: returns a string that is a representation of this.value as a roman numeral
// static variable containing the conversions between digits and corresponding roman numerals
// keys: thousands, hundreds, tens, ones, each value is an object whose keys are 1-9, 
// values are corresponding roman numeral string

class RomanNumeral {
  static getRomanNumeralFromDigit(digit, base) {
    const ROMAN_NUMERAL_VALUES = {
      1: {
        ones: "I",
        tens: "X",
        hundreds: "C",
        thousands: "M",
      },
      5: {
        ones: "V",
        tens: "L",
        hundreds: "D",
      },
      9: {
        ones: "IX",
        tens: "XC",
        hundreds: "CM",
      }
    };
    
    switch (digit) {
      case 0:
        return "";
      case 1:
      case 2:
      case 3:
        return ROMAN_NUMERAL_VALUES[1][base].repeat(digit);
      case 4:
        return ROMAN_NUMERAL_VALUES[1][base] + ROMAN_NUMERAL_VALUES[5][base];
      case 5:
      case 6:
      case 7:
      case 8:
        return ROMAN_NUMERAL_VALUES[5][base] + ROMAN_NUMERAL_VALUES[1][base].repeat(digit - 5);
      case 9:
        return ROMAN_NUMERAL_VALUES[9][base];
    }
  }

  constructor(value) {
    this.value = value;
  }

  toRoman() {
    let thousandsDigit = Math.floor(this.value / 1000);
    let hundredsDigit = Math.floor((this.value % 1000) / 100);
    let tensDigit = Math.floor((this.value % 100) / 10);
    let onesDigit = this.value % 10;

    return RomanNumeral.getRomanNumeralFromDigit(thousandsDigit, "thousands") +
      RomanNumeral.getRomanNumeralFromDigit(hundredsDigit, "hundreds") +
      RomanNumeral.getRomanNumeralFromDigit(tensDigit, "tens") +
      RomanNumeral.getRomanNumeralFromDigit(onesDigit, "ones");
  }
}

module.exports = RomanNumeral;
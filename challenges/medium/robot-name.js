// Robot class
// property: name, randomly generated, matches [A-Z]{2}\d{3}
// name method: returns name
// reset: generates new random name that hasn't already been taken
// static methods:
// _generateName: randomly generates name
// static property:
// names = keeps track of all names

// _generateName:
// 1. generate a random name that mathces the name regex
// 2. if that name is in the list of names, generate a new one
// 3. if it isn't, add it to the list and return the name

// reset:
// 1. generate a new name
// 2. remove the current name from names
// 3. assign the new name from step one to this.name

Math.seedrandom = require('seedrandom');

class Robot {
  static ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  static DIGITS = "0123456789";
  static names = [];

  static _getRandomChar(string) {
    return string[Math.floor(Math.random() * string.length)];
  }

  static _getRandomLetter() {
    return Robot._getRandomChar(Robot.ALPHABET);
  }

  static _getRandomDigit() {
    return Robot._getRandomChar(Robot.DIGITS);
  }

  static _generateRandomName() {
    let newName;

    while (!newName || Robot.names.includes(newName)) {
      newName =
        `${Robot._getRandomLetter()}${Robot._getRandomLetter()}` +
        `${Robot._getRandomDigit()}${Robot._getRandomDigit()}${Robot._getRandomDigit()}`;
    }

    return newName;
  }

  constructor() {
    this.randomName = Robot._generateRandomName();

    Robot.names.push(this.randomName);
  }

  name() {
    return this.randomName;
  }

  reset() {
    let newName = Robot._generateRandomName();

    Robot.names.splice(Robot.names.indexOf(this.name), 1);
    Robot.names.push(newName);

    this.randomName = newName;
  }
}

module.exports = Robot;
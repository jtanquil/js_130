// Scrabble object
// constructor: takes string as an argument, store it in this.word
// score: returns the scrabble score of the word
// - case-insensitive
// - whitespace = 0
// - null = 0
// given a word, iterate through the characters of the word, look up the corresponding point value of the letter, add up the point values and return
// - edge cases: if the character isn't a letter, corresponding score is 0
// data structure:
// keys: point values (1, 2, 3, 4, 5, 8, 10), values: array of letters corresponding to those point values
// for each character, find the point value whose corresponding entry in the data structure contains the character, if no such value, return 0 for that character's point value

class Scrabble {
  static POINT_VALUES = {
    1: ["a", "e", "i", "o", "u", "l", "n", "r", "s", "t"],
    2: ["d", "g"],
    3: ["b", "c", "m", "p"],
    4: ["f", "h", "v", "w", "y"],
    5: ["k"],
    8: ["j", "x"],
    10: ["q", "z"],
  }

  static getCharacterPointValue(character) {
    let pointValue = Number(Object.keys(Scrabble.POINT_VALUES).find((value) => {
      return Scrabble.POINT_VALUES[value].includes(character.toLowerCase());
    }));

    return pointValue || 0;
  }

  static score(word) {
    return word.split("").reduce((score, character) =>
      Scrabble.getCharacterPointValue(character) + score, 0);
  }

  constructor(word) {
    this.word = word ? word : "";
  }

  score() {
    return Scrabble.score(this.word);
  }
}

module.exports = Scrabble;
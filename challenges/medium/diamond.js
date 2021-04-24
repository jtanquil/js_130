// Diamond class: one static method, makeDiamond
// input: letter (capital?)
// output: diamond of the form:
// 1st half: starts with A, goes up the alphabet to the given letter at the widest point
// 2nd half: tapers off, ends with A at the very last row
// observation: width of each row = 2 * (number of unique letters) - 1
// number of rows: 2 * (number of unique letters) - 1
// ex: makeDiamond('C'):
//(2 spaces) A (2 spaces)
//(1 space) B (1 space) B (1 space)
// C (3 spaces) C
//(1 space) B (1 space) B (1 space)
//(2 spaces) A (2 spaces)
// " ".repeat(5) => replace 2 - i, 2 + i blank with the ith letter

// given a letter,
// let rows = [], let emptyRow = " ".repeat(2 * i - 1), where letter is the ith letter in the alphabet
// add i rows to rows, where the kth row is emptyRow with the
// (emptyRow.length - 1)/2 +- k characters replaced with the kth character
// mirror the i-1, i -2, ... 1st rows to rows
// return rows.join("\n")
// ex/ makeDiamond("E")
// emptyRow = " ".repeat(9)
// emptyRow with index 4 replaced with A
// emptyRow with index 3, 5 replaced with B
// emptyRow with 2, 6 replaced with C
// emptyRow with 1, 7 replaced with D
// emptyRow with 0, 8 replaced with E
// mirror the first 4 rows

class Diamond {
  static ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  static makeDiamond(letter) {
    const alphabetLetter = Diamond.ALPHABET.indexOf(letter) + 1;
    const rowLength = 2 * alphabetLetter - 1;
    const emptyRow = new Array(rowLength).fill(" ");
    const rowMidpoint = (emptyRow.length - 1) / 2;

    let rows = [];

    for (let rowNum = 0; rowNum < alphabetLetter; rowNum += 1) {
      // top half
      let currentLetter = Diamond.ALPHABET[rowNum];
      let newRow = emptyRow.slice();

      newRow[rowMidpoint - rowNum] = currentLetter;
      newRow[rowMidpoint + rowNum] = currentLetter;

      rows.push(newRow.join("") + "\n");
    }

    // bottom half
    rows = rows.concat(rows.slice(0, rows.length - 1).reverse());

    return rows.join("");
  }
}

module.exports = Diamond;
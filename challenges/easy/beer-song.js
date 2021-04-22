// BeerSong object
// verse and verses static method
// verse: takes an integer n, returns the n -> n - 1 verse of the song
// verses: takes integers m, n (m > n), returns m -> m - 1, m - 1 -> m - 2, ... , n -> n - 1 verses
// lyrics: verses(99, 0)

// verse:
// given an integer n,
// 1. create the first sentence `n bottle(s) of beer on the wall, n bottle(s) of beer.\n`
// 2. create the 2nd sentence `take one down...n - 1 bottles of beer on the wall`

class BeerSong {
  static verse(num) {
    switch(num) {
      case 0:
        return "No more bottles of beer on the wall, no more bottles of beer." +
          "\nGo to the store and buy some more, 99 bottles of beer on the wall.\n";
      case 1:
        return "1 bottle of beer on the wall, 1 bottle of beer." +
          "\nTake it down and pass it around, no more bottles of beer on the wall.\n";
      case 2:
        return "2 bottles of beer on the wall, 2 bottles of beer." +
          "\nTake one down and pass it around, 1 bottle of beer on the wall.\n";
      default:
        return `${num} bottles of beer on the wall, ${num} bottles of beer.` +
          `\nTake one down and pass it around, ${num - 1} bottles of beer on the wall.\n`;
    }
  }

  static verses(start, end) {
    let allVerses = [];

    for (let count = start; count >= end; count -= 1) {
      allVerses.push(BeerSong.verse(count));
    }

    return allVerses.join("\n");
  }

  static lyrics() {
    return BeerSong.verses(99, 0);
  }
}

module.exports = BeerSong;
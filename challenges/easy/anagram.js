// Anagram class
// constructor: takes string as an argument, store in this.word, compared against lists of potential anagrams
// match(list): returns a filtered list, containing only the elements of list that are anagrams of this.word
// match:
// given a list, filter through the list, for each word on the list, check whether that word is an anagram of this.word
// return a list of words that are anagrams of this.word

class Anagram {
  static isAnagram(word1, word2) {
    let sortedWord1 = word1.toLowerCase().split("").sort().join("");
    let sortedWord2 = word2.toLowerCase().split("").sort().join("");

    return sortedWord1 === sortedWord2;
  }
  constructor(word) {
    this.word = word;
  }

  match(list) {
    return list.filter((word) => {
      return Anagram.isAnagram(word, this.word) &&
        word.toLowerCase() !== this.word.toLowerCase();
    });
  }
}

module.exports = Anagram;
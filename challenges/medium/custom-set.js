// CustomSet class
// constructor: takes an array of numbers (values) that serve as the elements of the set
// set values = [], this.add every element of values to this.elements individually to check for dupes
// instance methods:
// isEmpty: returns if this.values.length = 0

// contains: takes a value, returns if that value is in the set
// given a value, return this.elements.includes(value)

// isSubset: takes a CustomSet, returns if the caller is one of its subsets
// _values: return a copy of the array of the set's values
// given another CustomSet, if the caller is empty, return true, otherwise,
// get an array of the caller's elements and return if all of them are contained in the CustomSet

// isDisjoint: takes a CustomSet, returns if the caller and the argument are disjoint sets
// given another set, return true if
// 1. every element of the caller is not contained in the other set
// 2. every element of the other set is not contained in the caller

// isSame: takes a CustomSet, returns if the caller and the argument have the same elements
// return true if the caller is a subset of the argument, and the argument is a subset of the caller

// add: takes a value, adds it to the set (adding a duplicate (check with contains) doesn't change the set), returns the caller

// intersection: takes a CustomSet, returns a CustomSet containing the intersection of the caller and the argument
// given another set, iterate through the elements of the caller
// given each element, if it's in the other set, add it to an array intersectionElements
// return a new set created with intersectionElements

// difference: takes a CustomSet, returns the difference (caller - argument)
// given another set, iterate through the elements of caller
// given each element, if it's not in the other set, add it to an array differenceElements
// return a new set created with differenceElements

// union: takes a CustomSet, returns the union of the caller and the argument
// get the values of the caller, concatenate them to the values of the difference (argument - caller)
// create a new set out of those elements

class CustomSet {
  constructor(values = []) {
    return (function(values) {
      let setValues = [];
      
      this._values = () => setValues.slice();
      this.add = (value) => {
        if (!this.contains(value)) {
          setValues.push(value);
        }

        return this;
      };

      values.forEach((value) => {
        this.add(value);
      })

    }).call(this, values)
    // this.values = [];
    // values.forEach((value) => {
    //   this.add(value);
    // })
  }

  // _values() {
  //   return this.values.slice();
  // }

  isEmpty() {
    return this._values().length === 0;
  }

  contains(value) {
    return this._values().includes(value);
  }

  // add(value) {
  //   if (!this.contains(value)) {
  //     this.values.push(value);
  //   }

  //   return this;
  // }

  isSubset(set) {
    return this.isEmpty() || this._values().every((value) => set.contains(value));
  }

  isDisjoint(set) {
    return this._values().every((value) => !set.contains(value)) &&
      set._values().every((value) => !this.contains(value));
  }

  isSame(set) {
    return this.isSubset(set) && set.isSubset(this);
  }

  intersection(set) {
    return new CustomSet(this._values().filter((element) =>
      set.contains(element)));
  }

  difference(set) {
    return new CustomSet(this._values().filter((element) =>
      !set.contains(element)));
  }

  union(set) {
    let callerElements = this._values();
    let argumentElements = set.difference(this)._values();

    return new CustomSet(callerElements.concat(argumentElements));
  }
}

module.exports = CustomSet;
// Element class
// constructor: takes value and next
//    - next's default value is null
// instance methods: datum, isTail, next
// datum: returns this.value
// isTail: returns this.next === null
// next: returns this.next

class Element {
  constructor(value, nextElement = null) {
    this.value = value;
    this.nextElement = nextElement;
  }

  datum() {
    return this.value;
  }

  next() {
    return this.nextElement;
  }

  isTail() {
    return this.next() === null;
  }
}

// SimpleLinkedList class
// constructor: no arguments
// this.items = [], each element will be an Element
// size: returns this.items.length
// isEmpty: returns this.size() === 0
// push: takes a value as an argument
// pushes an element w/that value, no next to the list
// if there is a tail in the list, update its next to the element that was pushed
// _tail: iterate through the elements of the list, find the first element that s.t isTail() returns true
// peek: returns value of the tail
// head: iterate through this.listItems
// for each element, let count = 0 and let nextElement = element.next
// if nextElement !== null, then increment count by 1, set nextElement = nextElement.next, and repeat
// afterward, if count = this.size(), then return element
// pop: search for the head, then splice it from the list
// fromArray
// if the argument is an empty array, or null/undefined, then create an empty linked list
// otherwise, push the elements in the array into the list in reverse order
// toArray
// let newArray = [], element = this.head()
// unshift element's value onto newArray, then move onto the next element
// continue until hitting the tail
// return newArray
// reverse
// convert the linked list into an array, reverse the array, then return the linked list from that reversed array

class SimpleLinkedList {
  static fromArray(arr) {
    let newLinkedList = new SimpleLinkedList();

    if (arr && arr.length > 0) {
      arr.slice().reverse().forEach((element) => {
        newLinkedList.push(element);
      });
    }

    return newLinkedList;
  }

  constructor() {
    this.listItems = [];
  }

  size() {
    return this.listItems.length;
  }

  isEmpty() {
    return this.size() === 0;
  }

  head() {
    if (this.isEmpty()) {
      return null; 
    } else {
      return this.listItems.find((element) => {
        let count = 1;
        let nextElement = element.next();

        while (nextElement) {
          count += 1;
          nextElement = nextElement.next();
        }

        return count === this.size();
      });
    }
  }

  push(value) {
    let newElement = new Element(value);
    let head = this.head();

    if (head) {
      newElement.nextElement = head;
    }

    this.listItems.push(newElement);
  }

  peek() {
    return this.isEmpty() ? null : this.head().datum();
  }

  pop() {
    let head = this.head();

    return this.listItems.splice(this.listItems.indexOf(head), 1)[0].datum();
  }

  toArray() {
    let newArray = [];
    let element = this.head();

    while (element) {
      newArray.push(element.datum());
      element = element.next();
    }

    return newArray;
  }

  reverse() {
    return SimpleLinkedList.fromArray(this.toArray().reverse());
  }
}

module.exports = {
  Element,
  SimpleLinkedList
};
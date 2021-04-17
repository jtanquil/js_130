function makeStack() {
  let stack = [];

  return {
    push(value) {
      stack.push(value);
    },

    pop(value) {
      return stack.pop();
    },

    printStack() {
      stack.forEach((item) => {
        console.log(item);
      });
    }
  };
}

let myStack = makeStack();
myStack.push("a");
myStack.push("b");
myStack.push("c");
myStack.printStack();
console.log(myStack.pop());
myStack.push("d");
myStack.printStack();
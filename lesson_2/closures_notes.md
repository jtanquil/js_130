## JS 130 - Closures Notes ##

- **definition**: a **closure** is the combination of a function and the lexical environment in which the function was defined
  - it is a function combined with all of the variables in its lexical scope, including function and class names
- **purpose**: closures let a function access a vaariable that was in scope when the function was defined, even when that variable is no longer in scope
- **relationship to scope**: the variables that a function has access to via a closure are determined by the scope in which the function was defined, and the variables in scope during a function's execution depend on the closure formed by the function's definition 
- **closures are a lexical concept**: a closure is determined by **where a function is defined in the code**
  - similar to how scope is lexical - the variables that are in any given scope is determined by how the code is written
  - like scope, even if a function is never called, **it still forms a closure with its surrounding scope**
  - this is why variables within a closure are still available for the function to access even though they are no longer "in scope" - this is usually said to mean that the variables are no longer in scope when the function is invoked, but they are still available to the function **because they were in the lexical scope in which the function was defined**
- **the envelope mental model for closures**
    - when you define a function, JavaScript attaches to the function object an envelope containing pointers to all of the variables within the lexical scope in which a function is defined, and the function can access those variables
    - **a note about pointers to variables**: normally we wouldn't talk about pointers to variables, we would think about variables containing pointers to objects, but it is necessary for closures to contain pointers to variables rather than the values in the variables so functions can track changes in the variables it has access to via a closure:
    ```javascript
    let test = 1;

    // closure of testFunc contains *a pointer* to the variable test declared on line 1
    function testFunc() {
      console.log(test);
    }

    testFunc(); // 1

    test = 2;

    // if the closure created with the definition of testFunc only contained the value of test, this would not see the change in test
    testFunc(); // 2
    ```
    - **variable access via closures**: when a function encounters a variable name during its execution, it checks its local scope, then it checks the envelope
      - checking the envelope is the "look through outer scopes until reaching the global scope" step
      - **above example**: when `testFunc` is invoked and it attempts to access the variable `test`, it first checks its own local scope, doesn't find `test`, then checks its envelope; this contains the `test` variable defined on line 1 contained in the scope in which `testFunc` was defined
    - **remember that closures are determined lexically** so the variables contained in this envelope are determined by where the function was defined, NOT where it ends up being invoked
      - so a variable not present in scope in which a function is invoked can be accessed by the function if it was put into the envelope as the function was defined; similarly, if the variable was not put in the envelope when the function was defined, the function can't access it during invocation even if it's in scope when it's invoked!
      - **above example**: `testFunc` has access to the `test` variable declared on line 1 as a consequence of `test` being put into the envelope attached to `testFunc` when it was defined, NOT because `test` was in scope when `testFunc` was invoked
- **examples**
    - functions are first-class values, so it is easy to invoke them in a different scope in which they were defined; in particular, higher-order functions that return functions provide an example of leveraging closures:
    ```javascript
    function getCounter() {
      let counter = 1;

      function incrementCounter() {
        counter += 1;
        return counter;
      }

      return incrementCounter;
    }

    let func = getCounter();
    console.log(func()); // 2
    console.log(func()); // 3
    ```
      - the closure formed by the definition of `incrementCounter` contains the scope defined by `incrementCounter`, in addition to the variables in the lexical environment defined by the scope defined by `getCounter` - this will contain the variable `counter` scoped to `getCounter`, and the variable `func` scoped to the top level code
          - can confirm by adding `console.log(counter)` and `console.log(func)` to `incrementCounter`
      - **notes about this example**
          - `counter`, even though it is out of scope when `func` (`incrementCounter`) is invoked, still remains in memory due to being in the closure created by the definition of `incrementCounter`, so the value of `counter` doesn't get garbage collected (see later) after `getCounter` is finished executing. it remains in memory and can be accessed/modified by `incrementCounter`
          - this demonstrates how **closures can be used to create private state** - `counter` is a variable that cannot be directly accessed, it can only be accessed through an interface that `getCounter` provides, which is the function `incrementCounter`:
          ```javascript
          console.log(func.counter); // undefined <= counter isn't a property of func!
          console.log(counter); // ReferenceError: counter is not defined <= no counter variable in the top level scope!
          ```
    - example with a callback:
    ```javascript
    let array = [1, 2, 3, 4, 5];
    let evens = [];
    array.forEach((number) => {
      if (number % 2 === 0) {
        evens.push(number);
      }
    });

    console.log(evens); // [2, 4]
    ```
      - the callback's definition creates a closure containing the variables in the scope defined by the callback (`number`), and the top-level variables `array` and `evens`, allowing the callback to access `evens` when it is invoked during the invocation of `forEach`
    - **partial function application**: a pattern where one function takes multiple arguments, and another function applies some of those arguments by returning a function that invokes the first function passing some of the arguments:
    ```javascript
    function add(first, second) {
      return first + second;
    }

    function makeAdder(firstArg) {
      return function(secondArg) {
        return add(firstArg, secondArg);
      }
    }

    let addFive = makeAdder(5);
    let addTen = makeAdder(10);

    console.log(addFive(2)); // 7
    console.log(addFive(100)); // 105 
    console.log(addTen(2)); // 12
    console.log(addTen(100)); // 110
    ```
      - the function defined in the `return` statement of `makeAdder` create a closure that contains the `add` function (from the top level scope) and the `firstArg` variable (from the `makeAdder` scope)
      - note that when `addFive` retrieves the value of `firstArg` during invocation, the value it retrieves is `5`; similarly, `addTen` retrieves the value `10` during invocation. This shows that `addFive` and `addTen` are accessing different variables, because their associated closures are different (TODO: explain this while retaining the character of closures as a lexical property)
      - this technique is useful when dealing with a function that accepts a callback whose signature is different from the signature of the callback you would actually want to use (useful if you need to use this callback several times, in different contexts)
      - `Function.prototype.bind` is an example of partial function application - it takes optional arguments that specify some of the function's arguments when invoking `bind`; the permanently binding to a context can also be considered an "argument" that is applied with partial function application
- **closures and private data**: one of the most powerful uses of closures is creating private data in variables declared inside a function, and only accessible via closure through a public interface returned by the function (either another function, an object with methods that can access those private variables via closure, etc)
    - **why**: enforce access of data to provided methods, prevents other users from becoming dependent on an implementation
        - example: a `list` object might be implemented as a array, kept private in a function, with a public interface (to add/remove/see items in the list, etc) provided by functions that can access `list` via closure. The implementation of `list` may change to some other object, but if the usage of the public API (add/remove/see methods) remains the same, then it won't matter to people who use the list - it would though if they were directly accessing `list`
    - **caveat**: still very easy to expose data by returning references to that data (maybe make examples using arrays and destructive methods)
    ```javascript
    function makeTodoList() {
      let list = [];

      return {
        add(listItem) {
          list.push(listItem);
        }

        getAllListItems() {
          return list; // this will return a reference to the list variable which lets other users mutate the list!
        }
      };
    }
    ```
      - encryption is the only reasonably safe way to protect such data
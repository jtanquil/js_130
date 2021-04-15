## JS 130 - IIFEs ##

- **what**: an **immediately invoked function expression (IIFE)** is a function that is defined, then immediately invoked
- **syntax**: function declaration/expression in parentheses, then invoked w/parenthesis:
    ```javascript
    (function() {
      console.log("hi");
    })(); // hello
    ```
    - no parentheses around the function declaration causes an error:
    ```javascript
    function test() {
      console.log("hi");
    }(); // SyntaxError: unexpected token
    ```
    - parentheses are an operator used to group expressions, and when surrounding a function definition, they tell JavaScript to evaluate the function as an expression (hence why a function declaration surrounded by parentheses is considered a function expression); this expression returns the function, and the function call parentheses invoke the function
    - IIFEs take arguments and can return values just like any other function invocation:
    ```javascript
    (function test(number) {
      return number + 1;
    })(2); // 3
    ```
    - alternate style: place the function invocation parentheses inside the grouping parentheses. this is not recommended due to its ambiguity
    ```javascript
    (function() {
      console.log("hello");
    }());
    ```
    - grouping parentheses can be omitted from IIFEs when their function definition is an expression that doesn't occur at the beginning of a line:
    ```javascript
    let func = function() {
      return 3;
    }(); // won't throw a SyntaxError

    console.log(func); // 3
    ```
    - grouping parentheses are still recommended here for clarity:
    ```javascript
    let func = (function() {
      return 3;
    })();

    console.log(func); // 3
    ```
    - IIFEs work with arrow functions too:
    ```javascript
    console.log(((a, b) => a * b)(2, 3)); // 6
    ```
- **uses of IIFE**
    - **creating private scope**
        - **motivation**: when adding code to large, messy programs, it is easy to accidentally use variable names that are already present in the current scope, or declare variables that will end up being used somewhere else in the scope that you aren't aware of:
        ```javascript
        // lots of code

        let array = [1, 2, 3, 4, 5];
        let isEven = (number) => (number % 2 === 0);
        let evens = array.filter(isEven);

        console.log(evens); // [2, 4]

        // even more code
        ```
        - **the issue with this code:** what if `array`, `isEven` and `evens` are variable names already used by the code before it?
            - removing the `let` statements would fix the error that would cause, but if those variables are used later after this code, then assigning those variables to these values could lead to errors happening later in the program
            - we could just use different variable names, but variable names are hard and keeping track of which ones are used in a huge, messy codebase is also hard
            - we can put this code in a function that defines a separate scope where these variable names can safely be used:
            ```javascript
            // lots of code

            function getEvens() {
              let array = [1, 2, 3, 4, 5];
              let isEven = (number) => (number % 2 === 0);
              let evens = array.filter(isEven);

              console.log(evens); // [2, 4]
            }

            // more code
            ```
            - this lets us use the names `array`, `isEven` and `evens` without worrying about whether there are variables with those names in the top level scope, but it is possible that the function `getEvens` is using a name already being used (or used later on) in the top level scope, so we still have the same problem
        - **solution**: the function `getEvens` defines a new scope where we can safely use the names `array`, `isEven` and `evens` in an inner scope isolated from the rest of the code. Instead of using a function declaration, we can do the same thing with an IIFE:
        ```javascript
        // lots of code

        (function() {
          let array = [1, 2, 3, 4, 5];
          let isEven = (number) => (number % 2 === 0);
          let evens = array.filter(isEven);

          console.log(evens);
        })(); // [2, 4]

        // more code
        ```
          - this code still defines an inner scope isolated from the rest of the program - a **private scope** - where the variables will not clash with any other variables, but since the function is unnamed, it also won't clash with other names 
          - note: naming the function in an IIFE does not add it to surrounding scope
          ```javascript
          // lots of code

          (function test() {
            let array = [1, 2, 3, 4, 5];
            let isEven = (number) => (number % 2 === 0);
            let evens = array.filter(isEven);

            console.log(evens);
          })(); // [2, 4]

          let test = 3;

          console.log(test); // 3, IIFE doesn't add the function test to the top level scope!
          
          // more code
          ```
        - **blocks for private scope**: blocks can also be used to create private scopes:
        ```javascript
        // lots of code
        {
            let array = [1, 2, 3, 4, 5];
            let isEven = (number) => (number % 2 === 0);
            let evens = array.filter(isEven);

            console.log(evens); // [2, 4]
        }
        ```
          - in this example, the block creates a block scope isolated from the rest of the code, so the names `array`, `isEven` and `evens` can be used without clashing with any other variables
          - this is more straightforward, but existing code often uses IIFEs to create private scope, so understanding both is necessary
          - also, this won't work with anything function-scoped like variables declared with `var` and function declarations:
          ```javascript
          // lots of code

          {
            var array = [1, 2, 3];
            function func() {
              console.log("hi");
            }

            console.log(array); // [1, 2, 3]
            func(); // hi
          }

          console.log(array); // [1, 2, 3], still the same array!
          func(); // hi, still the same function!

          // more code
          ```
    - **defining private data**
        - code that uses closures to define private data can be rewritten using IIFEs:
        ```javascript
        // private data with closures
        function makePrivateCounter() {
          let count = 0;
          return function() {
            count += 1;
            return count;
          };
        };

        let privateCounter = makePrivateCounter();
        privateCounter(); // 1
        privateCounter(); // 2
        ```
        ```javascript
        // with IIFEs

        const privateCounter = (function() {
          let count = 0;
          return function() {
            count += 1;
            return count;
          };
        })();

        privateCounter();
        privateCounter();
        privateCounter();
        ```
        - **idea**: the function defined after `privateCounter` defines a scope in which the variable `count` exists, and the function it returns has access to that variable via closure. the IIFE returns a copy of that function, which has access to `count` via closure. This is the only way to access `count` since the function in which it was defined was an IIFE, so it is effectively private
    - **private data vs private scope** 
        - private scope refers to using scope to prevent some code from making changes to variables in an outer scope, in other code - it is about creating an isolated scope in which using variables names won't interfere with the outer scope
        - private data is about encapsulation - defining data that the outer scope can only access via an interface that you provide (in the context of an IIFE, it is about variables declared within an IIFE that returns an interface that can interact with those variables via closure)
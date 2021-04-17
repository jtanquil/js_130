## JS 130 - Hoisting Notes ##

- ambiguous: initialization, function/block scope, declaration

- **the `var` statement**
    - used to declare variables, like `let` and `const`
    - variables declared with `var` can be redeclared (even in strict mode!):
        ```javascript
        var x = 0;
        var x = 1;
        var x = function() {};
        console.log(this.x); // [Function: x], overrides
        ```
    - **`var` vs `const`**: the `var` statment can't create constants like `const`
    - **`var` vs `let`**:
        - 1) variables declared with `var` at the top level of a program adds that variable as a property on the global object, variables declared with `let` or `const` don't:
        ```javascript
        // in the node repl; acts differently in node
        let foo = 1;
        const bar = 2;
        var qux = 3;

        console.log(global.foo); // undefined
        console.log(global.bar); // undefined
        console.log(global.qux); // 3
        ```
          - shows that `let`/`const` are safer to use at the top level of a program than `var`, adding properties to the global object might lead to bugs
      - 2) `let` (and `const`) is **block scoped**, while `var` is **function scoped**, i.e.
          - variables declared with `let` are only visible within the block in which they are declared
          - variables declared with `var` are only visible within the **function** in which they are declared
              - therefore, it is possible to declare a variable with `var` within a block and access it from outside that block within a function that contains that block:
              ```javascript
              function foo() {
                if (true) {
                  var a = 1;
                }

                console.log(a);
              }

              foo(); // logs 1; line 6 would throw a ReferenceError if a was declared with let
              ```
              - this leads to the question: **what if a variable is declared with `var` inside a block that never runs?**
              ```javascript
              function foo() {
                if (false) {
                  var a = 1; // this block never runs
                }

                console.log(a);
              }

              foo(); // logs undefined; line 6 would throw a ReferenceError if a was declared with let
              ```
              - here, the variable `a` still exists in the function because it has function scope; this is a consequence of **hoisting**, specifically how the process treats block scope vs function scope
- **note about function scope**: at the top level of a program, outside of any function, "function scope" refers to the entire file
    - **global scope** is sometimes used to refer to this scope, but module scope would be a better term
- **hoisting - definition**
    - JavaScript engines operate in two phases: the **creation phase** and the **execution phase**
        - **execution phase**: the program is run line-by-line
        - **creation phase**: the engine performs preliminary work
            - relevant to hoisting: the engine finds all **variable, function and class declarations** and **hoists** those declarations to the top of their respective function or block (depending on how they are scoped)
            - in particular: variable declarations declared with `let`/`const` are hoisted to the top of the blocks in which they are defined, and variable declarations declared with `var` are hoisted to the top of the functions in which they are defined
            - this **does not** actually alter the code, it just executes the program in a manner as though it was changed in that way
- **hoisting variable declarations**:
    - **with `let`/`const`**: when JavaScript hoists `let`/`const` declarations, **JavaScript defines the name, but it doesn't set the variable to an initial value** (not even `undefined`)
        - attempting to access these variables before they are actually declared in the code throws a `ReferenceError: Cannot access before initialization`; these variables are said to be in the **Temporal Dead Zone**
        - to demonstrate that `let`/`const` declarations are technically hoisted:
        ```javascript
        // attempting to access a variable that is never declared in code
        console.log(a); // ReferenceError: a is not defined
        ```
        ```javascript
        // attempting to access a variable declared with let before it is actually declared in code
        console.log(a); // ReferenceError: Cannot access `a` before initialization
        let a = 1;
        ```
        - **a note about initialization**: "initialization" occurs when JavaScript executes the variable declaration statement, not when it creates the variable; hence `cannot access before initialization` in the error message in the 2nd case
    - **with `var`**: `var` declarations are hoisted to the top of the function in which they are defined, and are set to `undefined` - they aren't in the Temporal Dead Zone as variables declared with `let` or `const` are after hoisting
        ```javascript
        // attempting to access a variable that is never declared in code
        console.log(a); // ReferenceError: a is not defined
        ```
        ```javascript
        // attempting to access a variable declared with var before it is actually declared in code
        console.log(a); // undefined
        var a = 1;
        ```
        - the function-scoping and lack of Temporal Dead Zone for `var` declarations commonly lead to bugs; effectively making this code
        ```javascript
        function test() {
          if (true) {
            console.log(a); // undefined
            console.log(b); // undefined
            var a = 7;
          }

          console.log(a); // 7
          console.log(b); // undefined

          var b = 3;
        }
        ```
        functionally equivalent to this after hoisting: (not actually equivalent)
        ```javascript
        function test() {
          var a;
          var b;
          if (true) {
            console.log(a); // undefined
            console.log(b);
            a = 7;
          }

          console.log(a); // 7
          console.log(b); // undefined

          b = 3;
        }
        ```
- **hoisting function declarations**:
    - **functions have function scope**, so JavaScript hoists function declarations to the top of the enclosing function, **including the function's definition**
        - function declarations, like `var` declarations, don't live in the temporal dead zone
        - this allows functions to be called from anywhere within the scope in which it was declared, in particular before the function is even declared/defined in the code
        - function declarations are hoisted above variables in the same scope:
        ```javascript
        var bar = 3;

        foo(); // 3

        function foo() {
          console.log(bar);
        }
        ```
        ```javascript
        // equivalent to:
        function foo() {
          console.log(bar);
        }

        var bar;
        bar = 3;

        foo(); // 3
        ```
        - **function hoisting has undefined behavior when the function is nested in a non-function block**: how this code behaves is **implementation-dependent** and it is recommended to avoid these situations
            - **example**: declaring functions inside blocks that might not execute:
            ```javascript
            function foo() {
              if (true) {
                function bar() {
                  console.log("bar");
                } 
              } else {
                function qux() {
                  console.log("qux");
                }
              }

              console.log(bar);
              bar();

              console.log(qux);
              qux();
            }

            foo();
            ```
            - on most implementations running this code would produce:
            ```javascript
            [Function: bar]
            bar
            undefined
            TypeError: qux is not a function
            ```
            indicating that the names `bar` and `qux` were hoisted to the top of the scope defined by `foo`, but while the definition of `bar` was also hoisted, `qux` was not
            - **but different implementations of JavaScript produce differnt results** - don't nest functions inside non-function blocks
- **hoisting class declarations**:
    - works like variable hoisting with `let`: JavaScript hoists the name, but doesn't initialize it, so hoisted classes that haven't been initialized live in the Temporal Dead Zone
    - also like variables declared with `let`, classes have block scope, unlike functions which have function scope
    - can show that classes are still technically hoisted in the same way as with variables:
    ```javascript
    // no class definition
    console.log(new Test()); // ReferenceError: Test is not defined
    ```
    ```javascript
    // hoisted class declaration
    console.log(new Test()); // ReferenceError: Cannot access 'Test' before initialization
    class Test{}
    ```
- **hoisting as a mental model**: it doesn't actually happen
    - **during the creation phase**: JavaScript goes through the code, whenever it encounters a variable/function/class declaration it adds that identifer to the appropriate scope
        - by the end of the creation phase, JavaScript knows all the identifiers and the scopes they belong to
    - **during the execution phase**: JavaScript no longer cares about declarations, only initialization and function/class definitions; JavaScript only needs to look up identifiers as needed
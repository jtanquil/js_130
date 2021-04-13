## JS 130 Notes - Strict Mode ##

- **what**: optional mode introduced in ES5 that modifies the semantics of JavaScript to prevent certain kinds of errors and syntax
- **why**
    - strict mode eliminates some silent errors (instances where code does something unintended but technically allowed without strict mode, leading to problems)
    - strict mode prevents some code that inhibits JavaScript's ability to optimize a program
    - strict mode prohibits some names and syntax that may conflict with future versions of JavaScript
- **how to use**: add `"use strict";` (including quotations) at the top of the program file/function definition
    - `"use strict";` is a **pragma**, a language construct that tells the compiler/interpreter/etc to process the code differently; not actually part of the language
    - once strict mode is enabled, it can't be disabled later in the same program/function\
    - strict mode is enabled automatically in the body of a class, and with JavaScript modules
    - strict mode is **lexically scoped**:
        ```javascript
        "use strict";

        // strict mode enabled at the top level scope and all inner scopes
        function test() {
          // strict mode here
        }

        // still strict mode
        test();
        ```
        ```javascript
        // sloppy mode
        function test() {
          // sloppy mode
        }

        function test2() {
          "use strict";

          // strict mode in here
          test(); // test is invoked, sloppy mode in there
          // back to strict mode
        }

        // sloppy mode
        test2();
        ```
- **changes in strict mode**
    - **implicit global variables and implicit execution context**: without strict mode, undeclared variables are added as properties of the global object and are treated like global variables (in the sense that you can access them anywhere in the program)
        - strict mode **sets the implicit execution context to `undefined` instead of the global object**, which prevents undeclared variables from being added to the global object:
        ```javascript
        // no strict mode
        function test() {
          a = 1; // adds "a" property to the global object
        }

        test();
        console.log(a); // 1
        ```
        ```javascript
        "use strict";

        function test() {
          a = 1; // ReferenceError: a is not defined
        }

        test();
        console.log(a);
        ```
          - forces global variables to be declared explicitly, preventing them from accidentally being defined and causing errors
          - can also catch errors like mispelling variable names, and forgetting to use `this` in object methods:
          ```javascript
          "use strict";

          function Test() {
            this.a = 1;
          }

          Test.prototype.func = function() {
            a = 2; // w/strict mode, this will throw a ReferenceError: a is not defined
          }

          let test = new Test();
          test.func();
          ```
          - still allows access to the global object, just prevents it from being used as the implicit execution context
    - **implicit context in functions**: when a method is invoked with the function invocation syntax, `this` is set to `undefined` under strict mode:
    ```javascript
    // no strict mode
    let obj = {
      a: 1,
      test() {
        this.a = 2;
      }
    };

    let func = obj.test;
    func(); // <= adds an "a" property to the global object
    console.log(obj.a); // 2
    ```
    ```javascript
    "use strict";

    let obj = {
      a: 1,
      test() {
        this.a = 2;
      }
    };

    let func = obj.test;
    func(); // throws TypeError: Cannot set property "a" of undefined"
    ```
      - this can help catch errors that occur due to context loss, particularly invoking a method as a function
- **leading zeros**: with sloppy mode JavaScript, an integer literal that begins with `0` but doesn't contain `8` or `9` will be interpreted as an octal number
    - with strict mode, numbers that look like octal numbers (begin with a `0` or `-0`, don't contain `8` or `9`) will raise a `SyntaxError: Octal literals are not allowed in strict mode` 
    - more generally, any number literal beginning with `0` or `-0`, except for `0` or `0` + decimal component will throw `SyntaxError: Numbers can't begin with 0`
    - this can be useful for dealing with strings coming from an external source that need to be parsed into integers
        - modern versions of JavaScript default to decimal with `parseInt`, but older versions might not
- **when to use strict mode**:
    - in new code
    - at the function level in new functions added to old codebases
      - if not adding new functions, using strict mode in old codebases may break the code, so avoid doing so
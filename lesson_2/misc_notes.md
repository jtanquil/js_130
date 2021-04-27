## JS 130 - Misc Notes ##

- **modules**
    - issues with large single-file programs: unwieldy, difficult to understand and work with, issues with encapsulation/private data
    - solution: splitting up a program into multiple files, called **modules**
    - **CommonJS modules**
        - also known as Node modules
        - we've already used them when getting user input: `require('readline-sync')` **imports** code into our program
        - **CommonJS module syntax**: import the module using the `require` function (may require installing the module with npm)
        - **creating CommonJS modules**:
        ```javascript
        // in export.js
        function test() {
          console.log("hi");
        }

        module.exports = test;
        ```
        ```javascript
        // in import.js
        const test = require("./export"); // relative path to the file from which to import code
        test(); // hi
        ```
        - in `export.js`, the last line adds the `test` function to the code that the module can export to other programs, and in `import.js`, that code is imported into the program using `require`.
        - `require` takes a path (relative to the current file) to the file containing the module; if requiring from a package installed with npm this isn't necessary
        - any value can be exported - functions, constants, variables, classes
        - multiple items can be exported:
        ```javascript
        // export.js
        let testVar = "hello";

        function test1() {
          console.log(testVar);
        };

        function setTestVar(newTestVar) {
          testVar = newTestVar;
        }

        module.exports = {
          test1,
          setTestVar,
        };
        ```
        ```javascript
        // import.js
        const { test1, setTestVar } = require("./export");
        test1(); // hello
        setTestVar("hi there");
        test1(); // hi there
        ```
        - in this example, `require("./export")` returns the object assigned to `module.exports` in `export.js` and the variables `test1` and `setTestVar` are assigned to the properties of that object with the object destructuring syntax
        - **CommonJS variables**
            - in Node, all code is part of a CommonJS module; in particular each program is part of one
            - each module has access to some variables:
                - `module`: an object that represents the current module
                - `exports`: the name(s) exported by the module (same as `module.exports`)
                - `require(moduleName)`: the function that loads `moduleName`
                - `__dirname`: the absolute pathname of the directory that contains the module
                - `__filename`: the absolute pathname of the file that contains the module
    - **JS modules/ES6 modules**: since ES6, JavaScript supporst modules natively with `import` and `export` keywords
        - **issues with CommonJS**: while useful in Node applications, CommonJS modules aren't suitable for the browser environment
            - CommonJS modules are loaded *synchronously* - whenever a CommonJS module is loaded with `require`, Node will load the indicated module into memory and wait until it is finished doing so to execute any other code
                - this is obviously an issue when trying to load modules that are stored in another server, quite likely dependent on other modules stored on other servers
                - there are tools like RequireJS and Browserify that are workarounds to this issue
        - **JS module syntax**: precede declarations of any values you want to export with `export`; anything that isn't explicitly exported is local to the module
        ```javascript
        // test1.js
        import { fromTest2 } from "./test2";

        let a = 1; // not exported

        export function fromTest1() {
          console.log("hi");
        }
        ```
        ```javascript
        // test2.js
        import { fromTest1 } from "./test1";

        export function fromTest2() {
          console.log("hello there");
        }
        ```
        - Node doesn't directly support JS modules, but Babel can transpile ES6 modules into a form that Node understands
- **exceptions**
    - an **exception** is an event that occurs during program execution to indicate an anomalous or exceptional condition
    - exceptions terminate the program by default, but can be caught/handled by the program with an **exception handler**, which JavaScript implements using `try/catch` statements
        - the `try` block runs code that might raise an exception, and the `catch` block deals with exceptions
    - **not all errors are exceptions** - for instance, invalid user input could result in an error that should be dealt with (using input validation/asking for input again/etc) but an exception would cause the program to terminate, so this shouldn't be an exception
        - exceptions should be execeptional situations
    - objects that represent exceptions, that are **thrown/raised** by JavaScript are `Error` type objects, or types that inherit from `Error` like `SyntaxError`, `TypeError`, `ReferenceError` etc
    - **throwing exceptions**
        - JavaScript can throw exceptions by itself internally (for example, using a variable before it's declared throws a `ReferenceError`)
        - you can also throw exceptions yourself:
        ```javascript
        function throwError() {
          throw new Error("test error"); // creates an instance of an Error object to throw
        }

        throwError(); // Error: test error
        ```
        ```javascript
        // could also define a custom error type to throw
        class NewTestError extends Error {}

        function throwError() {
          throw new NewTestError("test error");
        }

        throwError(); // NewTestError: test error
        ```
    - **catching exceptions**: done using `try/catch` blocks:
    ```javascript
    class NewTestError extends Error {}

    function throwError() {
      throw new NewTestError("test error");
    }

    try {
      throwError();
      console.log("no error thrown"); // never runs
    } catch (error) {
      if (error instanceof NewTestError) {
        console.log("test error, ignored");
      } else {
        throw error;
      }
    }

    console.log("after the error"); // runs after the NewTestError is thrown
    ```
    - program flow: `try` block is executed, `throwError` throws a `NewTestError`, which propagates upward through the program (similar to the program flow after a `return` statement); it's caught by the `catch` block after the `try` block, which logs `test error, ignored` since the error was a `NewTestError`
        - the `catch` block catches only a particular type of exception; in general they shouldn't catch any type of exception (otherwise it might catch an exception being thrown by something you can't handle, like an `InternalError`)
    - **general program flow when a program throws an exception**: the exception propagates upward through the program, stopping at each block checking for a `try` block. 
        - if it doesn't find one, JavaScript issues an error message and terminates the program.
        - if it does find one, then it exits the block without executing any of the remaining code and executes the `catch` block
        - if the `catch` block re-throws the exception, then the process starts again
        - if the `catch` block throws its own exception, then the first exception is discarded and the process begins again with the new exception
        - if the `catch` block doesn't throw a new exception, then the program discards the first exception and execution continues after the `catch` block
    - **when to use exceptions**: they should handle **exceptional** conditions
        - don't use exceptions for flow control
        - if there's a better way to handle an exception, use that instead
        - also think about what you do when catching an exception - in general, you don't want to catch every possible exception (see above)
            - in general, do as little as possible in addition when catching an exception, such as:
                - ignoring the exception
                - returning an error value like `undefined` or `null` that the calling function can detect
                - log an error message and/or re-throw the exception
- **garbage collection (GC)**
    - automatic process that JavaScript uses to free up memory allocated to unused values
        - contrast to other languages like C or C++ where memory allocation/deallocation is manually done
    - **how it works**
        - **reference count**: naive algorithm for GC that tracks references to values in the program, and flags values for becoming eligible for GC if their reference count drops to 0
            - leads to problems with circular references
            - modern browsers use more sophisticated algorithms, but pretend that JS uses reference counting
        - **the stack and heap**
            - **idea**: most programming languages divide memory into two regions - the stack and the heap
            - roughly speaking, JavaScript stores primitive values and references on the stack, and everything else (particularly the actual values of objects/arrays/strings that are referenced by references) on the heap
            - the stack doesn't participate in GC, so **most primitive values don't get involved in GC**
                - at the beginning of each function and block, JavaScript allocates memory on the stack for the variables defined in that function or block
                - each item in the stack has fixed size, so JavaScript can calculate the necessary memory during the creation phase without knowing the actual values
                    - JavaScript can calculate how much stack space each function/block needs during the creation phase
                - when the block or function is done running, the allocated stack memory is automatically returned to the system
                - **note**: **this is an oversimplification** since it doesn't account for variables that persist in memory after leaving scope because functions can access them through closure; they can be thought of as being stored on the heap, making them subject to GC
            - values stored in the heap generally have different sizes that can't be determined in advance, so they are added to the heap when they get created
                - since the program retains references to the values on the heap, it can't automatically allocate/deallocate heap memory like it does for stack memory, so it relies on GC to deallocate these values when needed
            - GC occurs periodically, with modern versions of JavaScript it can't be done manually
            - GC does not happen when a variable goes out of scope (see: closures, other sources of persistent references)
- circular references
  ```javascript
  function go() {
    let foo = {};
    let bar = { qux : foo };
    foo.xyz = bar;
  }

  go();
  ```
  - invoking `go` adds the object referenced by `foo` and the object referenced by `bar` to the heap, and adds references to them to the stack. since `foo` and `bar` reference each other through their properties, both objects have a reference count of `2` at the end of the execution of `go`
  - exiting the `go` function deallocates the stack space allocated to `go`, so the references to `foo` and `bar` are gone, but both objects still exist (on the heap) and they reference each other via their properties, so neither object is eligible for GC and never go away until the program ends
  ```javascript
  function go() {
    let foo = {};
    let bar = { qux: foo };
    foo.xyz = bar;
  }
  
  for (let count = 0; count < 10000000; count += 1) {
    go(); // creates 20000000 objects on the heap that can never be GCed
  }
  ```
  - this illustates why, in practice, GC is not done with reference counting in modern browsers
  - modern browsers use **mark and sweep**, another algorithm, to do GC, which solves the circular reference problem but introduces other problems
- **side effects**:
    - possible side effects:
        - reassigning a non-local variable
        - mutating the value of any object referenced by a non-local variable
        - reading from/writing to any data entity (files, network connections, etc) that is non-local to your program
            - in particular, any I/O: `console.log`, user input
            - `new Date` accesses the system clock
            - `Math.random()` accesses the random number generator
        - raises an exception
            - catching an exception can still produce side effects in the `catch` block
        - calls another function with side effects
    - more correct to talk about whether a specific function call has side effects, especially for functions that invoke a callback, but generally we will talk about whether functions have side effects when they are **used as intended**, i.e. the function is invoked in a manner that makes sense
    - **mixing side effects and return values**
        - generally not recommended to mix a side effect with returning a useful value (i.e. a value that has meaning to the calling code)
        - some exceptions, like reading user input
    - **pure functions**: functions that
        - have no side effects
        - given the same set of arguments, **always** return the same value during the function's lifetime
            - the **lifetime** of a function begins when it's created, and ends when it's destroyed (i.e. the lifetime of a function that is created inside another function is within the invocation of that outer function)
            - **idea**: nothing else in the program can influence what the function does during its lifetime; operates similar to a mathematical function
        - we talk about pure functions in the same way we talk about functions with side effects - specific calls of functions can be pure, but we'll talk about pure functions being used as intended
        - very important for functional programming (which is important for many JavaScript libraries like React)
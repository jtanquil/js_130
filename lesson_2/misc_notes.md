## JS 130 - Misc Notes ##

- questions: 
  - **hoisting**: how to talk about hoisting (what is being hoisted - class/`let`/`const` names vs `var` names + init vs function declarations), (function declaration vs definition, initialization), hoisting as a mental model vs what's actually happening 
  - **closures**: how to talk about closures? closure of a function? 
  - **IIFE**: scope created by the IIFE? what is this compared to function/block scope? named function declarations in an IIFE - how do they work? problem 1 - throws a different error?

  - study session notes
    - **exam**: one longer question with coding, interview similar to JS 109, do exercises

- "Advanced Concepts":
  - "hoisting"
    - What is hoisting?
        - general definition: mental model that conceptualizes how during the creation phase, JS variable/function/class declarations are "hoisted" to the top of their respective function/block scopes
    - How do var, let, and const interact with hoisting? How do they differ?
        - `let` and `const` interact with hoisting the same way: hoisted to the top of their blocks, cannot be accessed before initialization (no value, not even `undefined` - **Temporal Dead Zone**)
        - `var` variables are hoisted to the top of their function, can be accessed before initialization (evaluates to `undefined`)
        ```javascript
        var foo = 10;

        function bar() {
          if (foo > 20) {
            // let foo = 50;
            var foo = 50;
          }

          console.log(foo);
          foo += 10;
        }

        bar();
        bar();
        bar();
        ```
    - How do functions and classes interact with hoisting? How do they differ?
        - function declarations are hoisted to the top of their function scope (the whole declaration, so they can be invoked before they are defined in the code)
        - class declarations: act like `let` or `const`, also subject to Temporal Dead Zone
        ```javascript
        let user = new User("hi"); // throws ReferenceError: cannot access User before initialization

        class User {
          constructor(name) {
            this.name = name;
          }
        }
        ```
    - What part does hoisting play in the way a specific program works? (last part of the notes)
        - after creation phase, JavaScript knows about the identifiers and their scope; during execution, doesn't care about declarations, just definitions/initialization, just looks up identifiers
        - hoisting: determines identifiers and scope during creation phase
  - "strict mode"
    - What is strict mode? How does it differ from sloppy mode?
        - optional mode in JavaScript that modifies its semantics (meaning of the code) to prevent "silent errors" that commonly happen in sloppy mode
            - prevent silent errors
            - optimizes code, runs faster
            - prevents using names/syntax that might conflict with future JavaScript versions
    - How do you enable strict mode at the global or function level?
        - `"use strict";` pragma
            - at the global (module) level: put it at the top of the file
            - in a function: put it at the top of the function definition
                - works like lexical scope
            - automatically enabled in a class definition and in modules
    Describe how code behaves under both strict and sloppy mode.
    When is strict mode enabled automatically?
    When should you use (or not use) strict mode?
  - "Closures"
    What is a closure?
    What is in a closure?
    When is a closure created?
    - What is the relationship between closures and scope?
        - closure uses the variables in scope at function definition to determine the variables the function will have access to during its execution
        - 
    What do we mean when we say that closures are defined lexically?
    - What is partial function application?
        - can be done with `bind`
  - "IIFEs"
    What are IIFEs?
    How do you use them?
    How do you use IIFEs to create private scopes?
    How do you use blocks to create private scopes?
    How do you use IIFEs to create private data?
  - "Modules"
    The benefits of using modules.
    How to use and create CommonJS modules.
    How CommonJS modules pass exported items to the importing module.
  - "Exceptions"
    What are exceptions?
    Given an exception error message, identify the exception type and understand the meaning.
    Understand the terms raise, throw, re-throw, and catch.
    Know the syntax for the throw and try/catch statements.
    Understand the program flow for an exception.
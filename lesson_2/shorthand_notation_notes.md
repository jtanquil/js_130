## JS 130 - Shorthand Notation Notes ##

- **concise property initializers**
  ```javascript
  // normal object property initialization  
  function test(a, b, c) {
    return {
      a: a,
      b: b,
      c: c,
    };
  }
  // equivalent to this concise syntax, introduced in ES6
  function test(a, b, c) {
    return {
      a,
      b,
      c,
    };
  }
  // concise notation can be mixed with ordinary notation
  function test(a, b , c) {
    return {
      newName: a,
      b,
      c,
    };
  }
  ```
- **concise method definitions**
  ```javascript
  // normal method notation
  let obj = {
    test: function() {
      // ...
    },

    test2: function() {
      // ...
    }
  };

  obj.test();
  obj.test2();
  // shorthand notation
  let obj = {
    test() {
      // ...
    },

    test2() {
      // ...
    }
  };

  // invocations will still work
  obj.test();
  obj.test2();
  ```
  - there are some subtle differences between concise method definitions and normal definitions but they're not very important
- **object destructuring**: allows multiple assignments in a single expression
  ```javascript
  let obj = {
    foo: "foo",
    bar: "bar",
    qux: 42,
  };

  // multiple assignment without destructuring
  let foo = obj.foo;
  let bar = obj.bar;
  let qux = obj.qux;

  // equivalent code with destructuring
  // spaces inside brackets not necessary but easier to read/distinguish from literal syntax
  let { foo, bar, qux } = obj;

  // order of names in the braces is not important
  // this will still assign qux to obj.qux, foo to obj.foo, bar to obj.bar
  let { qux, foo, bar } = obj;

  // you can omit names that you don't need
  // this will assign bar to obj.bar, qux to obj.qux
  let { bar, qux } = obj;

  // you can use different names for the result
  // this will assign myQux to obj.qux, foo to obj.foo, bar to obj.bar
  let { qux: myQux, foo, bar } = obj;
  ```
  - destructuring with function parameters: pass an object to a function, the function definition uses destructuring in the parameters to pull out the needed properties and store them in local variables
  ```javascript
  // destructuring here assigns a to obj.a, b to obj.b
  function test({ a, b }) {
    console.log(a); // 3
    console.log(b); // 4
  }

  let obj = {
    a: 3,
    b: 4,
  };

  test(obj);
  ```
  - outside of a variable declaration (like in an assignment), destructuring can produce a syntax error since `{` can mark the beginning of a block rather than destructuring; adding parentheses fixes this:
  ```javascript
  // assignment => this will throw a syntax error because { is interpreted as starting a block
  { foo, bar, qux } = obj;

  // fixed version of the above
  ({ foo, bar, qux } = obj);
  ```
- **array destructuring**: similar syntax as object destructuring:
  ```javascript
  let foo = [1, 2, 3];

  // without array destructuring
  let first = foo[0];
  let second = foo[1];
  let third = foo[2];

  // equivalent assignment with array destructuring
  let [ first, second, third ] = foo;

  // can skip elements by leaving blanks
  // this will assign first to bar[0], fourth to bar[3], fifth to bar[4], seventh to bar[6]
  let bar = [1, 2, 3, 4, 5, 6, 7];
  let [ first, , , fourth, fifth, , seventh ] = bar;

  // can be used to swap variables
  let a = 2;
  let b = 3;
  [ a, b ] = [b, a]; // left side is using destructuring, right side is array literal syntax
  ```
- spread and rest syntax `...`
  - **spread syntax**: uses `...` to "spread" the elements of an array or object into separate items
  ```javascript
  function test(a, b) {
    return a + b;
  }

  let array = [2, 3];

  // passing arguments without spread syntax, tedious
  test(array[0], array[1]);
  // pass an array using apply
  test.apply(null, array);
  // pass arguments using spread syntax to spread the elements into the parameters
  test(...array); // same as test(array[0], array[1])
  ```
    - use cases for spread syntax:
    ```javascript
    // cloning an array
    let array = [1, 2, 3];
    let arrayCopy = [...array]; // same as let arrayCopy = [array[0], array[1], array[2]]

    console.log(arrayCopy); // [1, 2, 3]
    console.log(array === arrayCopy); // false

    // concatenate arrays
    let array1 = [1, 2, 3];
    let array2 = [4, 5, 6];
    let array3 = [...array1, ...array2];

    console.log(array3); // [1, 2, 3, 4, 5, 6]

    // insert an array into another array
    let array4 = [1, 2, 3];
    let array5 = [...array4, 4, 5, 6, ...array4];

    console.log(array5); // [1, 2, 3, 4, 5, 6, 1, 2, 3]
    ```
    - also works with objects
    ```javascript
    // cloning an object
    let obj1 = { a: 1, b: 2 };
    let obj2 = { ...obj1 };

    console.log(obj2); // { a: 1, b: 2 }
    console.log(obj1 === obj2); // false

    // merge objects
    let obj3 = { a: 1, b: 2 };
    let obj4 = { c: 3, d: 4 };
    let obj5 = { ...obj3, ...obj4 };
    
    console.log(obj5); // { a: 1, b: 2, c: 3, d: 4 }
    ```
      - **note about spread syntax for objects**: it only returns an object's enumerable own properties (ones it would return if passed to `Object.keys`)
          - doesn't duplicate objects that inherit from some other object
          - the object prototype is NOT enumerable, and the `length` of an array is not enumerable
  - **rest syntax**: uses `...` to collect multiple items into an array or object:
    ```javascript
    let array = [1, 2, 3, 4];
    let [ first, ...rest ] = array; // assigns first to array[0], rest to [array[1], array[2], array[3]]
    
    console.log(first); // 1
    console.log(rest); // [2, 3, 4]

    // with objects
    let obj = { a: 1, b: 2, c: 3, d: 4 };
    let { a, c, ...rest } = obj; // assigns a to obj.a, c to obj.c, rest to { b: 2, d: 4 }

    console.log(a); // 1
    console.log(c); // 3,
    console.log(rest); // { b: 2, d: 4 }
    ```
    - the rest element (`...rest` in both examples) must be the last item in any expression that uses rest syntax
    - **example**: functions that take arbitrary numbers of parameters can use rest syntax to collect any other arguments into an array:
    ```javascript
    function test(a, b, ...otherArgs) {
      console.log(a); // 1
      console.log(b); // 2
      console.log(otherArgs); // [3, 4, 5, 6]
    }

    test(1, 2, 3, 4, 5, 6);
    ```
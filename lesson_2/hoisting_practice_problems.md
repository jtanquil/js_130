## JS 130 - Hoisting Practice Problems ##

1. This code will log `Bye` to the console. The variable `foo` declared with `var` and the function declaration `foo` both have function scope, but functions are hoisted above variables when they occupy the same scope. The code is therefore equivalent to

```javascript
var foo;

function foo() {
  console.log("Hello");
}

foo = function() {
  console.log("Bye");
}

foo();
```

which means that the name `foo` in the top level scope is first assigned to the function `foo` defined on lines 1-3, then reassigned to the function returned by the function expression on lines 5-7. Therefore, the invocation of `foo` on the last line logs `Bye`.

2. This code logs

```javascript
undefined
Hello
Bye
2
```

Since `index` and `foo` are both declared with `var`, they are function scoped, and they are hoisted to the top of the top level of code, making it functionally identical to:

```javascript
var index;
var foo;

for (index = 0; index < 2; index += 1) {
  console.log(foo);
  if (index === 0) {
    foo = "Hello";
  } else {
    foo = "Bye";
  }
}

console.log(foo);
console.log(index);
```

During the first iteration of the loop, line 2 logs `undefined`. During this iteration, since the value of `index` is `0`, the first branch of the `if` statement is executed, so the variable `foo` is assigned to `Hello`. During the second iteration of the loop, line 2 logs the current value of `foo`, `Hello`. The `else` clause of the `if` statement is executed this time, since the value of `index` is `1`, and this reassigns `foo` to `Bye`. The program exits the loop before the next iteration since `index` is incremented to `2` and the condition `index < 2` is no longer met. Line 10 logs the current value of `foo`, `Bye`, and line 11 logs the current value of `index`, `2`.

3. Changing the function definition from assigning the value of a function expression to a variable declared with `var` to an actual function declaration will fix this code:

```javascript
bar();

function bar() {
  console.log("foo!");
}
```

4. The code will log `NaN` to the console. There are two scopes defined in this code - the top level scope, and the scope defined by the function `foo` on lines 2-5. Each scope has its own `bar` variable declared with `var` - the one declared on line 1 is scoped to the top level code, and the one declared on line 3 is scoped to the scope defined by the function `foo` on lines 2-5. Hoisting makes this code equivalent to:

```javascript
function foo() {
  var bar;
  bar = bar - 42;
  console.log(bar);
}

var bar;
bar = 82;

foo();
```

When `foo` is invoked, the identifier `bar` already exists within the scope defined by that function, so the expression `bar - 42` will access the value of that variable, as opposed to the `bar` that exists in the parent scope. The value of that `bar` is `undefined`, so that expression evaluates to `NaN`, which is logged to the console.

5. As the code is currently written, it will log

```javascript
undefined // from line 2, foo-scoped bar, declared on line 10
3.1415 // from line 8, foo-scoped qux, declared on line 7, assigned on line 4 but reassigned on line 7
42 // from line 22, foo-scoped qux, declared on line 7, reassigned on line 21
undefined // from line 2, foo-scoped bar, declared on line 10
0.5772 // from line 17, foo-scoped qux, declared on line 7, reassigned on line 4
2.7183 // from line 14, xyzzy-scoped qux, declared on line 13
undefined // from line 18, return value of xyzzy
42 // from line 22, foo-scoped qux, declared on line 7, reassigned on line 21
```

This function can be rewritten to produce the same output by just taking the function "rewritten" by our mental model of hoisting and replacing all the `var` declarations with `let`:

```javascript
function foo(condition) {
  let qux;
  let bar;
  let xyzzy;

  console.log(bar);

  qux = 0.5772;

  if (condition) {
    qux = 3.1415;
    console.log(qux);
  } else {
    bar = 24;

    xyzzy = function() {
      let qux;
      qux = 2.7183;
      console.log(qux);
    };

    console.log(qux);
    console.log(xyzzy());
  }

  qux = 42;
  console.log(qux);
}

foo(true);
foo(false);
```

This preserves the output since every assignment/reassignment of the variables defined in `foo` or its nested function `xyzzy` occur either in the same scope in which the variable is scoped to, or one of its inner scopes.

6.

```javascript
function Pet(name, image) {
  this.name = name;
  this.image =  image;
}

var catImage;
var pudding;

Pet.prototype.walk = function() {
  console.log(`${this.name} is walking.`);
};

// somehow needs to produce "cannot access 'Image' before initialization"
// "hoisting" with var doesn't do that though? access just returns undefined
class Image {
  constructor(file) {
    this.file = file;
  }
}

catImage = new Image("cat.png");
pudding = new Pet("Pudding", catImage);
```
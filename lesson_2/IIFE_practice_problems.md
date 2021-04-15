## JS 130 - IIFEs Practice Problems ##

1. This code will throw an error, because JavaScript considers the function definition (everything before the last parentheses) to be a function declaration, and an error will be thrown because function declarations must be named. (TODO: answer is `SyntaxError: unexpected token (` which suggests that a function statement without a name IS fine but a function declaration can't be invoked without grouping parentheses - is this a different error?)

2. Convert the function declaration into a function expression with parentheses:

```javascript
(function() {
  console.log("Sometimes, syntax isn't intuitive!");
})();
```

3. This code produces an error because the function definition of `sum` is hoisted up to the top of the top-level scope, so the code is functionally identical to:

```javascript
function sum(arr) {
  // ...
}

var sum = 0;
sum += 10;
sum += 31;

// ...

sum += sum(numbers);
```

The last line will throw an error `TypeError: sum is not a function` because it is attempting to invoke the value of `sum`, which is the number `41`, as a function. Using IIFEs solves this problem:

```javascript
var sum = 0;
sum += 10;
sum += 31;

let numbers = [1, 7, -3, 3];

sum += (function(arr) {
  return arr.reduce((sum, number) => {
    sum += number;
    return sum;
  }, 0);
})(numbers);
```

4. 

```javascript
(function(start) {
  for (let count = start; count >= 0; count -= 1) {
    console.log(count);
  }
})(7);
```

5. The function `foo` is inaccessible in the global scope. The parentheses surrounding the function definition of `foo` turn it into a function expression, which returns the function, but that doesn't add the function to the global scope. It is only accessible within the scope created by the IIFE (TODO: what exactly is this? compared to function/block scope)

6. 

```javascript
let bar = (function(start) {
  let prod = start;
  return function(factor) {
    prod *= factor;
    return prod;
  };
})(2);
let result = bar(3);
result += bar(4);
result += bar(5);
console.log(result);
```

7. 

```javascript
(function countdown(start) {
  if (start === 0) {
    console.log(start);
  } else {
    console.log(start);
    countdown(start - 1);
  }
})(7);
```
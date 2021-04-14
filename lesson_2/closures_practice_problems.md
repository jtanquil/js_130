## JS 130 - Closures Practice Problems ##

1. This code logs

```javascript
1
2
3
4
```

The definition of the function returned by `makeCounter` creates a closure containing a pointer to the top-level scope variable `counter` declared on line 1. `incrementCounter` increments the value of `counter` by `1` every time it is invoked. Invoking `makeCounter` does not change the value of `counter`, so invocations of `incrementCounter` just increment the value of `counter` each time.

2. This code logs

```javascript
1
1
1
1
```

The only `counter` variable that the function returned by `makeCounter` has access to is the local `counter` variable declared inside that function on line 3. This function declares `counter`, initializes it to `0`, increments its value, then returns that value, `1`. This variable is local to that function, each invocation of `incrementCounter` increments its own local `counter` variable.

3. This code logs

```javascript
1
2
1
2
```

There are two invocations of `makeCounter`. Each invocation returns a function that, due to closure, has access to the variables in its lexical environment, in particular the variable `counter` in the scope defined by `makeCounter` declared on line 2. On line 10, the invocation of `makeCounter` returns a function that has access to such a `counter` variable, whose value is incremented when `incrementCounter` is invoked. The invocation of `makeCounter` on line 14 returns a function that has access to a different lexical environment from the function returned by line 10, in the sense that the `counter` variable that the first function assigned to `incrementCounter` can access via closure is a different variable in memory than the `counter` variable available to the second function assigned to `incrementCounter` - they are different because they were created by different invocations of `makeCounter`. This is why the first two invocations of `incrementCounter` log `1` and `2`, and the last two invocations log `1` and `2` again - the first two invocations increment the `counter` variable declared by the `makeCounter` invocation on line 10, and the last two invocations increment the `counter` variable declared by the `makeCounter` invocation on line 14.

4. This code logs 

```javascript
1
2
1
2
```

for the same reason as before. `incrementCounter1` and `incrementCounter2`, via closure, can both access a variable named `counter` local to the scope defined by `makeCounter`, but these are **different** variables, with the same name, `counter`, that were declared in distinct invocations of `makeCounter` (on lines 10 and 11). Invoking `incrementCounter1` increments the `counter` variable created by the invocation of `makeCounter` on line 10, and invoking `incrementCounter2` increments the `counter` variable created by the invocation of `makeCounter` on line `11`.

5. Here, the function returned by `makeMultipleLister`, via closure, can access the variable `number` local to `makeMultipleLister` since it was present in the function's lexical scope when it was defined.

```javascript
function makeMultipleLister(number) {
  return () => {
    let currentNumber = number;

    while(currentNumber < 100) {
      console.log(currentNumber);
      currentNumber += number;
    }
  }
}
```

6. Here, `runningTotal` is present in the lexical environment of `add` and `subtract` when they were both defined, so they have access to that variable.

```javascript
let runningTotal = 0;

function add(number) {
  runningTotal += number;
  console.log(runningTotal);
}

function subtract(number) {
  runningTotal -= number;
  console.log(runningTotal);
}
```

7. The code logs `150`. The invocation of `foo` on line 9 returns a function, assigned to `bar`, that via closure has access to the variable `prod`, declared on line 2 in `foo`, whose value is set to `2`, the value of the parameter `start`, on line 2. Each invocation of `bar` multiplies the value of `prod` by the `factor` passed to `bar` as an argument, stores the result in `prod`, then returns that value. On line 10, the invocation `bar(3)` sets the value of `prod` to `2 * 3`, or `6`, and returns `6`, which is stored in `result`. Line 11 increments `result` by the return value of `bar(4)`, which reassigns `prod` to `6 * 4`, or `24`, and returns `24`. This sets the value of `result` to `30`. Line 12 increments `result` by the return value of `bar(5)`, which reassigns `prod` to `24 * 5`, or `120`, and returns `120`. This sets the value of `result` to `150`. Line 13 logs the value of `result`, `150`, to the console.

8. Due to closure, the function returned by `later` will have access to both of `later`'s parameters, `func` and `arg`.

```javascript
function later(func, arg) {
  return () => func(arg);
}
``` 

9.

```javascript
function later2(func, arg1) {
  return (arg2) => func(arg1, arg2);
}
```

10.

```javascript
function bind(context, func) {
  return () => func.call(context);
}
```
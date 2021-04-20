## JS 130 - Asynchronous Code Problems ##

### Asynchronous Execution with `setTimeout` ###

1.

```javascript
function delayLog() {
  for (let numSeconds = 1; numSeconds <= 10; numSeconds += 1) {
    setTimeout(() => {
      console.log(numSeconds);
    }, numSeconds * 1000);
  }
}

delayLog();
```

2. Changing the declaration `let numSeconds` to `var numSeconds` gives `numSeconds` function scope. The loop defines 10 copies of the callback function, and through closure they each access the same `numSeconds` variable if `numSeconds` is function scoped with `var`, as opposed to when `numSeconds` was block scoped (then each iteration of the loop creates a new `numSeconds` variable scoped to that particular iteration of the loop, and the corresponding copy of the callback accesses that particular `numSeconds` variable). Therefore, when the callbacks are finally invoked, they see the value of `numSeconds` at the end of the loop, which is `11`.

3. The `setTimeout` invocations are executed first in the order in which they appear, then the callbacks are invoked by increasing order of the delays, since the time it took to invoke `setTimeout` is negligible compared to the delays.

```javascript
setTimeout(function() {   // 1
  console.log('Once');    // 5
}, 1000);

setTimeout(function() {   // 2
  console.log('upon');    // 7
}, 3000);

setTimeout(function() {   // 3
  console.log('a');       // 6
}, 2000);

setTimeout(function() {   // 4
  console.log('time');    // 8
}, 4000);
```

4. `g()`, `f()`, (10 milliseconds pass), `d()`, `z()`, (5 milliseconds pass), `n()`, (5 more milliseconds pass), `s()`, (5 more milliseconds pass) `q()`

(`f` is still invoked after `g`, despite the delay being set to 0, since delays might be longer than specified)

5.

```javascript
function afterNSeconds(callback, delayInSeconds) {
  const SECOND_TO_MILLISECOND = 1000;

  setTimeout(callback, delayInSeconds * SECOND_TO_MILLISECOND);
}

afterNSeconds(() => console.log("hi"), 3);
```

### Repeating Execution with `setInterval` ###

1.

```javascript
function startCounting() {
  let count = 1;
  let id = setInterval(() => {
    console.log(count);
    count += 1;
  }, 1000);
}
```

2.

```javascript
function startCounting() {
  let count = 1;
  let counterId = setInterval(() => {
    console.log(count);
    count += 1;
  }, 1000);

  return counterId;
}

function stopCounting(counterId) {
  clearInterval(counterId);
}
```
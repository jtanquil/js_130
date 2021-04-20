## JS 130 - Asynchronous Programming Notes ##

- **asynchronous functions** are functions that don't block execution for the rest of the program while they execute; they can run concurrently with other operations
   - normally, code runs sequentially - one line at a time; this is **synchronous code**
   - even if synchronous code doesn't run in the order in which it appears in the program (due to function calls, branching etc), the code is still run sequentially in the sense that each line of code in the sequence is executed one at a time, and one line doesn't start executing until the last one in the sequence finishes
- `setTimeout`
    - function that takes a callback, and a delay time in milliseconds; `setTimeout` will wait until the specified delay elapses, then invokes the callback
    ```javascript
    setTimeout(() => { // 1st line executed
      console.log("hi"); // 3rd line executed
    }, 1000);
    
    console.log("hello"); // 2nd line executed

    // logs:
    // hello
    // hi
    ```
    - flow: `setTimeout` queues up the invocation of its callback in 1 second, then `console.log('hello')` logs `hello`; after 1 second has passed, the callback is invoked and logs `hi`
    - callbacks passed to `setTimeout` are only run when JavaScript isn't doing anything else:
    ```javascript
    setTimeout(() => {
      console.log("hi");
    }, 0);

    setTimeout(() => {
      console.log("hello there");
    }, 0);

    console.log("yo");

    // logs
    // yo
    // hi
    // hello there
    ```
    - even though the delay is `0`, the callbacks are only invoked after `console.log("yo")` and there is nothing else left for the program to run
    - interaction with closure:
    ```javascript
    // logs
    // 1 (after 1 second)
    // 2 (after 1 second)
    // 3 (after 1 second)
    for (let count = 1; count <= 3; count += 1) {
      setTimeout(() => console.log(count), count * 1000);
    }
    ```
    ```javascript
    // logs
    // 4 (after 1 second)
    // 4 (after 1 second)
    // 4 (after 1 second)
    for (var count = 1; count <= 3; count += 1) {
      setTimeout(() => console.log(count), count * 1000);
    }
    ```
    - in both examples, the callbacks `() => console.log(count)` has access to the `count` variable defined in the `for` loop via closure. in the first example, `count` is block scoped due to being declared with `let`, so each callback has access to a different `count` variable (since the loop will create a new one with each iteration), but in the second, `count` is function scoped due to `var`, so each callback has access to the **same** copy of `count`, and when the callbacks are finally invoked they all log the value of `count` after the final iteration of the loop, `4`.
    - also note that the delay for each iteration of the loop has to increase since the amount of time needed to iterate through the loop is negligible; if the delays were all the same, then `1/2/3` would appear basically simultaneously
- `setInterval`
    - function that takes a callback and a delay in millseconds
    - `setInterval` will invoke the callback at the given interval until it is told to stop
        - `setInterval` returns an identifier that can be passed to `clearInterval` to cancel the repeated execution of the callback
        ```javascript
        let id = setInterval(() => console.log("hi"), 2000);

        // starts logging "hi" every 2 seconds
        // some more code

        clearInterval(id); // this will stop the logging of "hi"
        ```
- **the event loop** - how JavaScript handles concurrency
    - [just rewatch this video](https://www.youtube.com/watch?v=8aGhZQkoFbQ)
    - relevant parts: call stack, web APIs, task queue, event loop
    - **idea**: it is easy to visualize the call stack when dealing with purely synchronous code - the top of the stack is the function we're current in, function calls push to the stack, function returns pop off the stack, and the rest of the stack is blocked by the top element in the sense that the top function must finish execution before the functions further down in the stack can continue execution
        - **but how does this work with asynchronous code?**
    - `setTimeout`, `setInterval`, (probably some other async functions) are not part of the JavaScript runtime but are implemented via **web APIs** (or some other equivalent in node?)
        - invoking these functions pass the callback, with a timer, to these web APIs, which track the timer then add the callback to the **task queue** when the timer finishes
        - anything in the task queue is handled by the **event loop** - the event loop executes the callbacks in the task queue **when the call stack is empty**
        ```javascript
        setTimeout(() => console.log("hello"), 0);

        console.log("hi");
        // logs
        // hi
        // hello
        ```
        - line 1 adds the callback + timer set to `0` to the web API, which then adds the callback to the **task queue** after the timer is done
        - the event loop only runs the callback waiting in the task queue after the call stack is empty, which only happens **after** line 3 finishes executing, which is why `hi` is logged before `hello` despite the delay on the `setTimeout` invocation being `0`
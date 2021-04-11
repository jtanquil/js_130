- on exceptions: one situation where it may be appropriate to use them when otherwise it wouldn't (ex/on bad inputs) is when the code might be part of a module used by other programs - then we may not have control over what those programs do
- convention: private methods (shouldn't be used outside of the class) have names starting with an underscore `_` 
- callbacks: when passed a callback, and passing it into another function:
```javascript
arr.map((ele) => callback(ele)); // creates a new callback function
arr.map(callback); // avoids creating a new callback, looks better
```
- **encapsulation**: hide implementation details from users of the class; idea is we want users to use the **public interface** (i.e. public methods provided by the class) to interact with the class
    - don't encourage users to directly access or manipulate the internal state of the object
    - don't let them become dependent on its implementation
- **private data**: data in an object that is inaccessible outside that object
    - technically possible in JavaScript, but it's awkward and relies on other features (closures, IIFEs)
    - otherwise, all implementation details are public
    - methods as a way of hiding implementation details rely on trust rather than an actual private state
        - convention is to use the methods provided by a class to perform the necessary actions instead of directly accessing class properties
        - **why**: the entire goal of creating a class and encapsulating logic is to hide implementation details and contain the ripple effects of changing code
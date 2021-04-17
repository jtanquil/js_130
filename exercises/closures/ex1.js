function myBind(fn, context) {
  return function(...args) {
    return fn.apply(context, args);
  }
}

let obj1 = {
  a: 1
};

let obj2 = {
  a: 2
};

function test(b) {
  console.log(this.a + b);
}

let newTest = myBind(test, obj1);
newTest(2); // 3
newTest.call(obj2, 2); // 3
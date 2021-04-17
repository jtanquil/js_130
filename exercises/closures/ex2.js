function myBind(fn, context, ...partialArgs) {
  return (...restOfArgs) =>
    fn.apply(context, partialArgs.concat(restOfArgs));
}

function test(a, b, c) {
  console.log(this.prop + a + b + c);
}

let obj1 = {
  prop: "a"
};

let obj2 = {
  prop: "b"
}

let testFunc = myBind(test, obj1, "c");
testFunc("e", "d"); // aced
testFunc.call(obj2, "e", "d"); // aced
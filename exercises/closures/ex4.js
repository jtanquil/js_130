function delegate(object, methodName, ...args) {
  return (...restOfArgs) =>
    object[methodName](args.concat(restOfArgs));
}

let foo = {
  name: 'test',
  bar: function(greeting) {
    console.log(greeting + ' ' + this.name);
  },
};

let baz = {
  qux: delegate(foo, 'bar', 'hello'),
};

baz.qux();   // logs 'hello test';

foo.bar = function() { console.log(`${this.name} changed`); };

baz.qux();          // logs 'changed'
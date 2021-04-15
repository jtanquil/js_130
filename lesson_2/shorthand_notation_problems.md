## JS 130 - Shorthand Notation Practice Problems ##

1.

```javascript
function foo(bar, qux, baz) {
  return {
    bar: bar,
    baz: baz,
    qux: qux,
  };
}
```

2.

```javascript
function foo() {
  return {
    bar: function() {
      console.log("bar");
    },

    qux: function(arg1) {
      console.log("qux");
      console.log(arg1);
    },

    baz: function(arg1, arg2) {
      console.log("baz");
      console.log(arg1);
      console.log(arg2);
    },
  };
}
```

3.

```javascript
function foo(one, two, three) {
  return {
    bar: one,
    baz: two,
    qux: three,
  };
}

let obj = foo(1, 2, 3);
let baz = obj.baz;
let qux = obj.qux;
let bar = obj.bar;
```

4.

```javascript
function foo(array) {
  return [
    array[2],
    5,
    array[0]
  ];
}

let array = [1, 2, 3];
let result = foo(array);
let bar = result[0];
let qux = result[1];
let baz = result[2];
```

5.

```javascript
function product(num1, num2, num3) {
  return num1 * num2 * num3;
}

let array = [2, 3, 5];
let result = product(array[0], array[1], array[2]);
```

6.

```javascript
function product() {
  return [].reduce.call(arguments, (total, number) => total * number);
}

let result = product(2, 3, 4, 5);
console.log(result);
```

7.

```javascript
function qux() {
  let animalType = "cat";
  let age = 9;
  let colors = ["black", "white"];
  // missing code
  return {
    type: animalType,
    age,
    colors
  };
}

let { type, age, colors } = qux();
console.log(type);    // cat
console.log(age);     // 9
console.log(colors);  // [ 'black', 'white' ]
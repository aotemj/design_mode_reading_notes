// 函数作为返回值输出
// console.log(Object.prototype.toString.call([1, 2, 3])); // [object Array]
// console.log(Object.prototype.toString.call("123")); // [object String]

/*
1. 判断数据的类型
我们来看看这个例子，判断一个数据是否是数组，在以往的实现中，可以基于鸭子类型的概
念来判断，比如判断这个数据有没有 length 属性，有没有 sort 方法或者 slice 方法等。但更好
的方式是用 Object.prototype.toString 来计算。Object.prototype.toString.call( obj )返回一个
字符串，比如 Object.prototype.toString.call( [1,2,3] ) 总是返回 "[object Array]" ， 而
Object.prototype.toString.call( “str”)总是返回"[object String]"。所以我们可以编写一系列的
isType 函数。代码如下
*/


/*
var isString = function (obj) {
  return Object.prototype.toString.call(obj) == '[object String]'
}

var isNumber = function (obj) {
  return Object.prototype.toString.call(obj) == '[object Number]'
}

var isArray = function (obj) {
  return Object.prototype.toString.call(obj) == '[object Array]'
}
*/


/*我们发现，这些函数的大部分实现都是相同的，不同的只是 Object.prototype.toString.
call( obj )返回的字符串。为了避免多余的代码，我们尝试把这些字符串作为参数提前值入 isType
函数。代码如下*/

/*
function isType(type) {
  return function (obj) {
    return Object.prototype.toString.call(obj) == `[object ${type}]`
  }
}

isNumber = isType('Number')
console.log(isNumber(3)); // true


isString = isType("String")

console.log(isString("123")) // true
*/

/*
我们还可以用循环语句，来批量注册这些 isType 函数
*/

/*
var Type = {}

for (let i = 0, type; type = ["String", "Number", "Array"][i++];) {
  Type[`is${type}`] = (function () {
    return function (obj) {
      return Object.prototype.toString.call(obj) === `[object ${type}]`
    }
  })()
}


console.log(Type.isArray([]));
console.log(Type.isArray("132"));
console.log(Type.isNumber(123));
*/














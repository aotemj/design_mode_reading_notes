// 闭包 的应用1
var Type = {}

for (var i = 0, type; type = ["Number", "Array", "String"][i++];) {
    (function (type) {
        Type[`is${type}`] = function (obj) {
            return Object.prototype.toString.call(obj) === `[object ${type}]`
        }
    })(type)
}

console.log(Type.isArray([])); // true
console.log(Type.isString("str")) // true
console.log(Type.isNumber(1))//  true

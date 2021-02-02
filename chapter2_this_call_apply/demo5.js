// apply call

// var func = function (a, b, c) {
//     console.log([a, b, c])
// }
//
// func.apply(null, [1, 2, 3])
// func.call(null, 1, 2, 3)


// var func = function (a, b, c) {
//     console.log(this === global) // true
// }
//
// func.apply(null, [1, 2, 3])
//

// 'use strict'
// var func = function () {
//     console.log(this === null)
// }
//
// func.apply(null, [1, 2, 3])

let res = Math.max.apply(null, [1, 2, 3])
console.log(res); // 3


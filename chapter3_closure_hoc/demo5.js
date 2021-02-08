// 闭包的应用2

// var muti = function () {
//     var a = 1;
//     for (var i = 0, l = arguments.length; i < l; i++) {
//         a = a * arguments[i]
//     }
//
//     return a
// }

// 优化：

// var cache = {}
//
// var muti = function () {
//     var args = [].join.call(arguments, ',')
//
//     if (cache[args]) {
//         return cache[args]
//     }
//
//     console.log('重新计算了');
//     var a = 1
//     for (var i = 0, l = arguments.length; i < l; i++) {
//         a = a * arguments[i]
//     }
//     return cache[args] = a
// }

// 继续优化（隐藏全局变量:cache）

// var muti = (function () {
//     var cache = {}
//     return function () {
//         var args = [].join.call(arguments, ',')
//         if (cache[args]) {
//             return cache[args]
//         }
//         console.log('重新计算');
//         var a = 1;
//         for (var i = 0, l = arguments.length; i < l; i++) {
//             a = a * arguments[i]
//         }
//         return cache [args] = a
//     }
// })()


// 继续优化（封装单个函数）

var muti = (function () {
    var cache = {}
    var calculate = function () {
        var a = 1;
        for (var i = 0, l = arguments.length; i < l; i++) {
            a = a * arguments[i]
        }
        return a
    }
    return function () {
        var args = [].join.call(arguments, ',')
        if (cache[args]) {
            return cache[args]
        }
        console.log('重新计算');

        return cache[args] = calculate.apply(null, arguments)
    }
})()


console.log(muti(1, 2, 3));
// 重新计算了
// 6
console.log(muti(1, 2, 3));
// 6

console.log(muti(1, 2, 4));
console.log(muti(1, 2, 4));


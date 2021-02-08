// 变量的作用域

// var fn = function () {
//     var a = 1;
//     console.log(a);
// }
//
// fn() // 1
//
// console.log(a); // ReferenceError: a is not defined


var a = 1
var fn1 = function () {
    var b = 2;
    var fn2 = function () {
        var c = 3
        console.log(b);
        console.log(a);
    }
    fn2()
    console.log(c);
}

fn1()
// 2
// 1
//  ReferenceError: c is not defined

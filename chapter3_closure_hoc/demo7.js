/**
 *
 3.1.4 闭包和面向对象设计
 过程与数据的结合是形容面向对象中的“对象”时经常使用的表达。对象以方法的形式包含
 了过程，而闭包则是在过程中以环境的形式包含了数据。通常用面向对象思想能实现的功能，用
 闭包也能实现。反之亦然。在 JavaScript 语言的祖先 Scheme 语言中，甚至都没有提供面向对象
 的原生设计，但可以使用闭包来实现一个完整的面向对象系统
 */

// var extent = function () {
//     var value = 0;
//     return {
//         call: function () {
//             value++;
//             console.log(value)
//         }
//     }
// }
//
//
// var ins = extent()
//
// ins.call()
// ins.call()
// ins.call()
// ins.call()


/**
 *如果换成面向对象的写法，就是：
 */

// var Extent = {
//     value: 0,
//     call: function () {
//         this.value++;
//         console.log(this.value);
//     }
// }
//
// Extent.call()
// Extent.call()
// Extent.call()
// Extent.call()

// 或：

// var Extent = function () {
//     this.value = 0
// }
// Extent.prototype.call = function () {
//     this.value++;
//     console.log(this.value);
// }
//
// let ins = new Extent()
// ins.call()
// ins.call()
// ins.call()
// ins.call()


// var extent = (function () {
//         var value = 0;
//         return {
//             call: function () {
//                 value++;
//                 console.log(value)
//             }
//         }
//     }
// )()
//
// extent.call()
// extent.call()
// extent.call()
// extent.call()
// extent.call()

// var extent = {
//     value: 0,
//     call: function () {
//         this.value++;
//         console.log(this.value);
//     }
// }
//
//
// extent.call()
// extent.call()
// extent.call()
// extent.call()


var extent = function () {
    this.value = 0;
}

extent.prototype.call = function () {
    this.value++;
    console.log(this.value);
}

var ins = new extent()
ins.call()
ins.call()
ins.call()
ins.call()

// When you're a child ,life is a big adventure
// I had to acknowledge the force of his argument
// I had to acknowledge the force of his argument
//I had to acknowledge the force of this argument
// Figure figure figure figure figure figure figure figure figure

/*
He is the principal of this college
He is the principal of this college
He is the principal of this college
He is the principal of this college
* Growing levels of pollution represent health hazard to the local population
During the earthquake ,all the students were evacuated from the main building
*
*nurture
* The teacher likes to ask open questions to nurture creativity in her students
The teacher likes to ask open questions to nurture creativity in her students
It's just the removal of a small lump, so you don't need
The war has intensified in the last few months
shore
a rocky/sandy shore
perform perform perform perform perform perform perform
She performs an important role in our organization
She performs an important role in our organization
She performs an important role in our organization
attraction  attraction attraction attraction attraction attraction attraction attraction
attraction attraction attraction attraction attraction attraction
They fell in love so quickly for they had a very strong attraction towards each other
They fell in love so quickly for they had a very strong attraction towards each other
The fell in love so quickly for they had a very strong attraction towards each other
transmute transmute transmute transmute transmute transmute transmute transmute transmute transmute
transmute transmute transmute transmute transmute transmute transmute transmute transmute transmute transmute
transmute transmute transmute transmute
They said they could transmute lead into gold
They said they could transmute lead into gold
They said they could transmute lead into gold
They said they could transmute lead into gold
They said they could transmute lead into gold
His latest book shows a synthesis of tradition al
His latest book shows a synthesis of traditional and modern values
* */



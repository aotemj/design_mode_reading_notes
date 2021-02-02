/**
 * 手动实现 bind
 */

// Function.prototype.bind = function (context) {
//     let _this = this
//     return function () {
//         return _this.apply(context, arguments)
//     }
// }
//
// let obj = {
//     name: 'sven'
// }
// let func = function (a, b, c, d) {
//     console.log(this.name)
//     console.log(a, b, c, d)
// }.bind(obj)
//
// func()

//
// Function.prototype.bind = function () {
//     let _this = this
//     let context = [].shift.apply(arguments)
//     let args = [].slice.apply(arguments)
//
//     return function () {
//         return _this.apply(context, [].concat.apply(args, [].slice.apply(arguments)))
//         // return _this.apply(context, [].concat.apply(args, [].slice.apply(arguments)))
//     }
// }
//
// let obj = {
//     name: 'sven'
// }
//
// let func = function (a, b, c, d) {
//     console.log(this.name)
//     console.log(a, b, c, d)
// }.bind(obj, 1, 2)
//
// func(3, 4)

Function.prototype.bind = function () {
    let _this = this
    let context = [].shift.apply(arguments)
    let args = [].slice.apply(arguments)

    return function () {
        return _this.apply(context, [].concat.apply(args, [].slice.apply(arguments)))
    }
}

let obj = {
    name: 'sven'
}

let func = function (a, b, c, d) {
    console.log([a, b, c, d])
}.bind(obj, 3, 4)

func(1, 2)

// inheritance
// His uncle left sizable inheritances to him


// commit
// Most crimes are committed by young men

// bound
// Mistakes are bound when you are dealing with so many issues.

// author
// who is you favourite author

// record
// medical/dental(牙科) records

// rather
// The instructions were rather complicated

// rather
// The instructions were rather complicated

// decode
// The government agents finally decode the information

// company
// The  National Bus Company

// behavior
// behaviour

// environment
// An unhappy home environment can effect a child's behaviour

// further
// My life is further complicated by having to work such long hours

// axis
// The earth turns on its axis once every 24 hours

// abstract
// The research shows that pre-school are capable of thinking in abstract terms

// usage
// Proper usage of linking words will make your essay more reader-friendly

// opportunity
// The reporter grasped a rare opportunity to interview the president

// opportunity
// The reporter grasped a rare opportunity to interview the president
// Insisting on excellence in everything wo do is time-consuming, wastes energy and leads to losing out on opportunities

// Portion
// A Significant portion of population speaks English
// Yes, there just needs to be consistency between labelling systems with

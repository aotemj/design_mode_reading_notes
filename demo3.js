/**
 * 丢失的this
 */

let obj = {
    name: 'sven',
    getName() {
        return this.name
    }
}

console.log(obj.getName()) // sven

let getName = obj.getName

console.log(getName()) // undefined

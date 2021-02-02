var A = function (name) {
    this.name = name
}

var B = function () {
    A.apply(this, arguments)
}

B.prototype.getName = function () {
    return this.name
}

let b = new B('sven')

console.log(b.getName());

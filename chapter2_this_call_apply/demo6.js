var obj1 = {
    name: 'sven',
}

var obj2 = {
    name: 'anne'
}

global.name = 'globalName'

var getName = function () {
    console.log(this.name);
}

getName() // globalName

getName.apply(obj1) // sven
getName.apply(obj2) // anne


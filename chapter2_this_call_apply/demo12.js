let a = 1

Array.prototype.push.apply(a, [1])

console.log(a); // 1

console.log(a.length) // undefined

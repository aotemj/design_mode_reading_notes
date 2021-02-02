let obj = {}

Array.prototype.push.apply(obj, ['content1'])

console.log(obj.length); // 1

console.log(obj[0]); // content1
console.log(obj) //{ '0': 'content1', length: 1 }

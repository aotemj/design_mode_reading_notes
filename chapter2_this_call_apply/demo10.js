(function () {
    // Array.prototype.push.call(arguments, 3)
    [].push.call(arguments, 3)
    console.log(arguments); // [Arguments] { '0': 1, '1': 2, '2': 3 }
})(1, 2)

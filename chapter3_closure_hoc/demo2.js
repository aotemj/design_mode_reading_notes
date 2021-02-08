var func = function () {
    let a = 1;

    return function () {
        a++;
        console.log(a);
    }
}

let fn = func()

fn()
fn()
fn()
fn()

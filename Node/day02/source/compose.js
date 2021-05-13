// const add = (x, y) => x + y;
// const square = z => z * z;


// const fn = (x, y) => square(add(x, y));
// console.log(fn(1, 2));

// // const compose = (fn1, fn2) => (...args) => fn2(fn1(...args));
// const compose = (...[first, ...other]) => (...args) => {
//     let result = first(...args);
//     other.forEach(e => {
//         result = e(result);
//     })
//     return result;
// }

// const fn1 = compose(add, square, square);
// console.log(fn1(1, 2));

async function fun1(next) {
    console.log('fun1 begin');
    await next();
    console.log('fun1 end');
}
async function fun2(next) {
    console.log('fun2 begin');
    await delay();
    await next();
    console.log('fun2 end');
}
async function fun3(next) {
    console.log('fun3');
}

async function delay(next) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, 4000);
    })
}

function compose(middlewares) {
    return function () {
        return dispatch(0);

        function dispatch(i) {
            let fn = middlewares[i]
            if (!fn) {
                return Promise.resolve()
            }
            return Promise.resolve(
                fn(function next() {
                    return dispatch(i + 1);
                })
            )
        }
    }
}
compose([fun1, fun2, fun3])();
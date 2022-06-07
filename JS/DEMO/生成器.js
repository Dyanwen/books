// /**
//  * 
//  * next()执行到yield暂停，并把yield之后的值返回
//  * 下次执行next(val)的时候，会将val作为上次的返回值
//  */
// function* foo() {
//     console.log("inside *foo", yield "B");
//     console.log("inside *foo", yield "C")
//     return "D";
// }
// function* bar() {
//     console.log("inside *bar", yield "A");
//     console.log("inside *bar", yield* foo())
//     console.log("inside *bar", yield "E")
//     return "F";
// }

// let it = bar();
// console.log('outside', it.next().value)
// /**
//  * outside a
//  */
// console.log('outside', it.next(1).value)
// /**
//  * inside *bar 1
//  * outside b
//  */
// console.log('outside', it.next(2).value)
// /**
//  * inside *foo 2
//  * outside c
//  */
// console.log('outside', it.next(3).value)
// /**
//  * inside *foo 3
//  * inside *bar d
//  * outside e
//  */
// console.log('outside', it.next(4).value)
// /**
//  * inside *bar 4
//  * outside f
//  */


// function* bar() {
//     console.log("inside *bar():", yield "A");
//     // yield委托给非生成器！
//     console.log("inside *bar():", yield* ["B", "C", "D"]);
//     console.log("inside *bar():", yield "E");

//     return "F";
// }

// var it = bar();

// console.log("outside:", it.next().value);
// // outside a

// console.log("outside:", it.next(1).value);
// // inside *bar(): 1
// // outside b

// console.log("outside:", it.next(2).value);
// // outside c


// console.log("outside:", it.next(3).value);
// // outside d


// console.log("outside:", it.next(4).value);
// // inside *bar():undefined
// // outside e

// console.log("outside:", it.next(5).value);
// // inside *bar():5
// // outside f

// function* foo() {
//     try {
//         yield "B";
//     }
//     catch (err) {
//         console.log("error caught inside *foo():", err);
//     }
//     yield "C";
//     throw "D";
// }

// function* bar() {
//     yield "A";
//     try {
//         yield* foo();
//     }
//     catch (err) {
//         console.log("error caught inside *bar():", err);
//     }
//     yield "E";
//     yield* baz();
//     // 注：不会到达这里！
//     yield "G";
// }

// function* baz() {
//     throw "F";
// }

// var it = bar();
// console.log("outside:", it.next().value);
// // outside a
// console.log("outside:", it.next(1).value);
// // outside b
// console.log("outside:", it.throw(2).value);
// // error caught inside *foo():2
// // outside c
// console.log("outside:", it.next(3).value);
// // "error caught inside *bar():", d
// // outside e
// try {
//     console.log("outside:", it.next(4).value);
// } catch (error) {
//     console.log("error caught outside:", error);
//     // error caught outside: F
// }


// function* foo(val) {
//     if (val > 1) {
//         val = yield *foo(val - 1);
//     }
//     return yield request("http://www.baidu.com?v=" + val);
// }
// function* bar() {
//     var r1 = yield *foo(3);
//     console.log(r1)
// }

// run(bar)

// let res = [];
// function* reqData(url) {
//     res.push(
//         yield request(url)
//     )
// }

// var it1 = reqData('www.baidu1.com');
// var it2 = reqData('www.baidu2.com');
// let q1 = it1.next()
// let q2 = it2.next()

// q1.then(res => {
//     it1.next(res);
//     return q2;
// }).then(res => {
//     it2.next(res);
// })

// let res = [];
// function* reqData(url) {
//     var data = yield request(url);
//     yield;
//     res.push(data);
// }
// var it1 = reqData('www.baidu1.com');
// var it2 = reqData('www.baidu2.com');
// let q1 = it1.next()
// let q2 = it2.next()

// q1.then(res => it1.next(res))
// q2.then(res => it2.next(res))

// Promise.all([q1, q2]).then(
//     () => {
//         it1.next()
//         it2.next()
//     }
// )

function foo(x, y, cb) {
    setTimeout(() => {
        cb(x + y)
    }, 100)
}
function chunkify(fn) {
    var args = [].slice.call(arguments, 1);
    return function (cb) {
        args.push(cb);
        return fn.apply(null, args);
    }
}
var fooChunk = chunkify(foo, 3, 4);
fooChunk(function (sum) {
    console.log(sum);
})
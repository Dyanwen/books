// var Fib = {
//     [Symbol.iterator]() {
//         var n1 = 1, n2 = 1;
//         return {
//             [Symbol.iterator]() {
//                 return this
//             },
//             next() {
//                 var current = n2;
//                 n2 = n1;
//                 n1 = n2 + current;
//                 return {
//                     value: n1,
//                     done: false
//                 }
//             },
//             return(v) {
//                 console.log("Fibonacci sequence abandoned.")
//                 return { value: v, done: true };
//             }
//         }
//     }
// }
// for (const v of Fib) {
//     console.log(v);
//     if (v > 50) break
// }

var tasks = {
    [Symbol.iterator]() {
        var steps = this.actions.slice();

        return {
            [Symbol.iterator]() {
                return this;
            },
            next(...agrs) {
                if (steps.length > 0) {
                    let res = steps.shift()(...agrs);
                    return {
                        value: res,
                        done: false
                    }

                } else {
                    return {
                        done: true
                    }
                }
            },
            return(v) {
                steps.length = 0;
                return {
                    value: v,
                    done: true
                }
            }
        }
    },
    actions: []
}

tasks.actions.push(function step1(x) {
    console.log('step1', x)
    return x * 2
}, function step2(x, y) {
    console.log('step2', x, y);
    return x + y * 2
}, function step3(x, y, z) {
    console.log('step3', x, y, z);
    return (x * y) + z
})
var it = tasks[Symbol.iterator]();
it.next(11);
it.next(22,33)
if (!Promise.observe) {
    Promise.observe = function (pr, cb) {
        pr.then(function fulfilled(msg) {
            Promise.resolve(msg).then(cb);
        }, function rejected(err) {
            Promise.resolve(err).then(cb);
        })
        return pr;
    }
}

Promise.race([
    Promise.observe(
        foo(),
        function cleanup(msg) {
            // 在foo()之后清理，即使它没有在超时之前完成
        }
    ),
    timeoutPromise(3000)  // 给它3秒钟
])

if (!Promise.first) {
    Promise.first = function (prs) {
        return new Promise(function (resolve, reject) {
            prs.forEach(pr => {
                Promise.resolve(pr).then(resolve);
            });
        })
    }
}

if (!Promise.map) {
    Promise.map = function (vals, cb) {
        return Promise.all(
            // 注：一般数组map(..)把值数组转换为 promise数组
            vals.map(function (val) {
                // 用val异步map之后决议的新promise替换val
                return new Promise(function (resolve) {
                    cb(val, resolve);
                });
            })

        )
    }
}

var p1 = Promise.resolve(21);
var p2 = Promise.resolve(42);
var p3 = Promise.reject("Oops");

// 把列表中的值加倍，即使是在Promise中
Promise.map([p1, p2, p3], function (pr, done) {
    // 保证这一条本身是一个Promise
    Promise.resolve(pr)
        .then(
            // 提取值作为v
            function (v) {
                // map完成的v到新值
                done(v * 2);
            },
            // 或者map到promise拒绝消息
            done
        );
})
.then(function (vals) {
    console.log(vals);          // [42,84,"Oops"]
})

Object.defineProperty(
    Number.prototype,
    Symbol.iterator,
    {
        writable: true,
        configurable: true,
        enumerable: false,
        value: function iterator() {
            var i, inc, done = false, top = +this;

            // 正向还是反向迭代？
            inc = 1 * (top < 0 ? -1 : 1);

            return {
                // 使得迭代器本身成为iterable!
                [Symbol.iterator]() { return this; },

                next() {
                    if (!done) {
                        // 初始迭代总是0
                        if (i == null) {
                            i = 0;
                        }
                        // 正向迭代
                        else if (top >= 0) {

                            i = Math.min(top, i + inc);
                        }
                        // 反向迭代
                        else {
                            i = Math.max(top, i + inc);
                        }

                        // 本次迭代后结束？
                        if (i == top) done = true;

                        return { value: i, done: false };
                    }
                    else {
                        return { done: true };
                    }
                }
            };
        }
    }
)




for (var i of -3) {
    console.log(i);
}

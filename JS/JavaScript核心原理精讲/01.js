/**
 * 1.instance可以准确的判断复杂引用数据类型,不能判断基本数据类型
 * 2.typeof 可以判断基本数据类型,但是在引用类型中,除了function类型之外,其他的都不能判断
 */
// const getInstance = (left, right) => {
//     if (typeof left !== 'object' || left === null) return false
//     let proto = Object.getPrototypeOf(left)
//     while (true) {
//         if (proto === null) return false
//         if (proto === right.prototype) return true
//         proto = Object.getPrototypeOf(proto)
//     }
// }

// function getType(n) {
//     const t = typeof n;
//     if (t !== 'object') {
//         return t;
//     }
//    // return Object.prototype.toString.call(n).replace(/^.{8}(\S+)\]$/, (_, $1) => $1.toLowerCase());
//     return Object.prototype.toString.call(n).replace(/^\[object (\S+)\]$/, '$1');
// }

// console.log(getType([]))

/**
 Number() 方法的强制转换规则:
 如果是布尔值，true 和 false 分别被转换为 1 和 0；
 如果是数字，返回自身；
 如果是 null，返回 0；
 如果是 undefined，返回 NaN；
 如果是字符串，遵循以下规则：如果字符串中只包含数字（或者是 0X / 0x 开头的十六进制数字字符串，允许包含正负号），则将其转换为十进制；如果字符串中包含有效的浮点格式，将其转换为浮点数值；如果是空字符串，将其转换为 0；如果不是以上格式的字符串，均返回 NaN；
 如果是 Symbol，抛出错误；
 如果是对象，并且部署了 [Symbol.toPrimitive] ，那么调用此方法，否则调用对象的 valueOf() 方法，然后依据前面的规则转换返回的值；如果转换的结果是 NaN ，则调用对象的 toString() 方法，再次依照前面的顺序转换返回对应的值（Object 转换规则会在下面细讲）
 */
console.log('123' == 123)  // true true
console.log('' == null)    // true false
console.log('' == 0)        // true true
console.log([] == 0)        // false true
console.log([] == '')      // false true
console.log([] == ![])      // false true
console.log(null == undefined) //  true true
console.log(Number(null))     // 0 0
console.log(Number(''))     // 0 0
console.log(parseInt(''));    // 0 NaN
console.log({} + 10)           // [object Object]10
let obj = {
    [Symbol.toPrimitive]() {
        return 200;
    },
    valueOf() {
        return 300;
    },
    toString() {
        return 'Hello';
    }
}
console.log(obj + 200); // Hello200 400


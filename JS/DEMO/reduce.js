// 1.经典累加器
let a1 = [1, 2, 3, 4, 5, 6];
let v1 = a1.reduce((preval, item, index, array) => {
    return preval += item;
}, 4)
// console.log(v1)

// 2.二位数组转一维
let a2 = [
    [1, 2], [3, 4, 5], [6, 7], [1, 2, 3]
]
let v2 = a2.reduce((pre, item, index, array) => {
    return pre.concat(item)
}, [])
// console.log(v2)

//3.多维数组扁平化
let a3 = [
    [1, 2], [[3, 3, 3, 3], 4, 5], [[6, 6, 6, 6], 7], [1, 2, 3]
]
let flatten = (arr) => {
    return arr.reduce((pre, item, index, array) => {
        return pre.concat(Array.isArray(item) ? flatten(item) : item)
    }, [])
}
// console.log(flatten(a3))

// 4.数组分块
const arr4 = [1, 2, 3, 4, 5, 6];
const chunk = (arr, size) => {
    return arr.reduce((res, cur) => (
        res[res.length - 1].length < size ? res[res.length - 1].push(cur) : res.push([cur]), res
    ), [[]])
}
// console.log(chunk(arr4, 3));

// 5. 字符统计
const countChar = text => {
    text = text.split("");
    return text.reduce((record, c) => (record[c] = (record[c] || 0) + 1, record), {})
}
const text = "划水水摸鱼鱼";
console.log(countChar(text));
// 这里必须是声明函数，不能是箭头函数
// 必须又返回值
// 如何返回多值
// 如何处理多个自定义loader
module.exports = function (source) {
    return source.replace('hello', this.query.name);

    // const result = source.replace('hello', this.query.name);
    // this.callback(null, result,)

    // const callback = this.async()
    // setTimeout(() => {
    //     const result = source.replace('hello', this.query.name);
    //     callback(null, result);
    // }, 2000);


}
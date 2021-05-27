module.exports = function (source) {
    return `const e = document.createElement('style');
    e.innerHTML = ${source};
    document.head.appendChild(e)`
}
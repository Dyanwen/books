const merge = require('deepmerge');

let tryTemplate = `
try {
    
} catch (e) {
    console.log(CatchError,e)
}
`

let catchConsole = (filePath, funcName, customLog) => `
    filePath:${filePath}
    funcName:${funcName}
    ${customLog}:`;

const defaultOptions = {
    customLog: 'Error',
    exclude: ['node_modules'],
    include: []
}

function matchesFile(list, filename) {
    return list.find(name => name && filename.includes(name))
}

function mergeOptions(options) {
    let { exclude, include } = options;
    if (exclude) options.exclude = toArray(exclude);
    if (include) options.include = toArray(include);
    return merge.all([defaultOptions, options])
}

function toArray(value) {
    return Array.isArray(value) ? value : [value];
}

module.exports = {
    tryTemplate,
    catchConsole,
    defaultOptions,
    mergeOptions,
    matchesFile,
    toArray
};
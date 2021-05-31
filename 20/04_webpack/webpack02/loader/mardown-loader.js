const marked = require("marked");
module.exports = source => {
    const html = marked(source);
    const code = `export default ${JSON.stringify(html)}`;
    return code;
}
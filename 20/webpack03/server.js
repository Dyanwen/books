const express = require("express");

const app = express();
const port = 3000;
app.get('/api/getUserInfo', (req, res) => {
    res.json({
        name: "逗点"
    })
})

app.listen(port, _ => {
    console.log(`listening at port ${port}`)
})

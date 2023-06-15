const express = require('express');
const bodyParser = require('body-parser');

let jsonParser = bodyParser.json()
let urlencodedParser = bodyParser.urlencoded({ extended: false })
const app = express();
const port = 3000;


app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.post('/', bodyParser.json(), (req, res) => {
    res.send(JSON.stringify({"user": "Alex"}))
    console.log(req.body)
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})


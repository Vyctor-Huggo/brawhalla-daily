require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const bodyParser = require("body-parser")


const app = express();
const port = process.env.port;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(cookieParser());


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

require("./routes/index")(app);

app.get("/teste", (req, res) => {
    res.render('test');
})

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
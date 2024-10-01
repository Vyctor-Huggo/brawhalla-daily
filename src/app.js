require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
const port = process.env.port;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/p', async (req, res) => {
    try {
        const response = await axios.get('https://brawlhalla.fly.dev/v1/legends/id?legend_id=3');
        const legend = response.data.data; // Acesse a chave 'data'
        res.render('test', { legend });
    } catch (error) {
        console.error(error); // Log de erros, se houver
        res.status(500).send('Error fetching data');
    }
})

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
require('dotenv').config();
const express = require('express');
const axios = require('axios');
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

function randomNum(min, max) {
    return Math.random() * (max - min) + min;
}

app.get('/p', async (req, res) => {
    const legendId = req.query.legend_id; // Obter o legend_id da query string

    if (!legendId) {
        return res.status(400).send('Nenhum legend_id fornecido.');
    }

    try {
        const response = await axios.get(`https://brawlhalla.fly.dev/v1/legends/id?legend_id=${legendId}`);
        const legend = response.data.data; // Dados do personagem
        res.render('test', { legend });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar dados do personagem.');
    }
});

app.post('/search-character', async (req, res) => {
    const searchTerm = req.body.searchTerm.toLowerCase(); // Termo de pesquisa do formulário

    try {
        const response = await axios.get('https://brawlhalla.fly.dev/v1/legends/all');
        const characters = response.data.data; // Array com todos os personagens

        // Filtrar o personagem correspondente ao termo de pesquisa
        const character = characters.find(c => 
            c.bio_name.toLowerCase() === searchTerm
        );

        if (character) {
            // Redirecionar para a rota `/p` com o legend_id do personagem
            res.redirect(`/p?legend_id=${character.legend_id}`);
        } else {
            res.status(404).send('Personagem não encontrado.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar personagens.');
    }
});

app.get('/', async (req, res) => {
    try {
        const response = await axios.get('https://brawlhalla.fly.dev/v1/legends/all');
        const characters = response.data.data; // Supondo que 'data' seja um array com os personagens
        res.render('ds', { characters });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar personagens.');
    }
});



app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
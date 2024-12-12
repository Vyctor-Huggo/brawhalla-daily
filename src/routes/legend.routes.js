const axios = require("axios");
const { createOrUpdate, get } = require("../controllers/legend.controller");
const { getRandomLegend } = require("../services/getRandomLegend");

exports.legendRoutes = async (app) => {
    app.get('/legend/:id', async (req, res) => {
        const legendId = req.params.id; // Obter o legend_id da query string
    
        if (!legendId) {
            return res.status(400).send('Nenhum legend_id fornecido.');
        }
    
        try {
            const response = await axios.get(`https://brawlhalla.fly.dev/v1/legends/id?legend_id=${legendId}`);
            const legend = response.data.data; // Dados do personagem
            res.render('legend', { legend });
        } catch (error) {
            console.error(error);
            res.status(500).send('Erro ao buscar dados do personagem.');
        }
    });

    app.get('/viewLegend', async (req, res) => {
        get(res).then(legend => {
            res.send(legend);
        });
    });

    app.post('/anotherLegend', async (req, res) => {
        var legend;
        getRandomLegend().then(l => {
            console.log(l);
            
            legend = {

                    "id": "1",
                    "name": l.bio_name,
                    "Weapons": [
                        l.weapon_one,
                        l.weapon_two
                    ],
                    "Strength": parseInt(l.strength),
                    "Dexterity": parseInt(l.dexterity),
                    "Defense": parseInt(l.defense),
                    "Speed": parseInt(l.speed),
                }
            req.body = legend;
            console.log(req.body);
            try {   
                createOrUpdate(req, res);
            } catch (error) {
                console.log(error);
            }
            
        });
    });
}
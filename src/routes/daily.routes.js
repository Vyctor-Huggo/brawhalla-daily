const { get } = require("../controllers/legend.controller");
const axios = require("axios");

exports.dailyRoutes = (app) => {
    app.get('/', async (req, res) => {
        try {
            const response = await axios.get('https://brawlhalla.fly.dev/v1/legends/all');
            const characters = response.data.data;
            res.render('search', { characters });
        } catch (error) {
            console.error(error);
            res.status(500).send('Erro ao buscar personagens.');
        }
    });

    app.get('/seila', async (req, res) => {
        try {
            const response = await axios.get('https://brawlhalla.fly.dev/v1/legends/all');
            const characters = response.data.data;
            res.render('test', { characters });
        } catch (error) {
            console.error(error);
            res.status(500).send('Erro ao buscar personagens.');
        }
    });

    app.post('/response-analysis', async (req, res) => {
        const searchTerm = req.body.searchTerm.toLowerCase(); // Termo de pesquisa do formulário
    
        try {
            const response = await axios.get('https://brawlhalla.fly.dev/v1/legends/all');
            const characters = response.data.data; // Array com todos os personagens
    
            // Filtrar o personagem correspondente ao termo de pesquisa
            const character = characters.find(c => 
                c.bio_name.toLowerCase() === searchTerm
            );
    
            if (character) {
                get(res).then(legend => {
                    console.log(legend[0]);
                    var bool_Strength = (character.strength != legend[0].Strength ? (character.strength > legend[0].Strength ? -1 : 1) : 0)
                    var bool_Dexterity = (character.dexterity != legend[0].Dexterity ? (character.Dexterity > legend[0].Dexterity ? -1 : 1) : 0)
                    var bool_Defense = (character.defense != legend[0].Defense ? (character.Defense > legend[0].Defense ? -1 : 1) : 0)
                    var bool_Speed = (character.speed != legend[0].Speed ? (character.Speed > legend[0].Speed ? -1 : 1) : 0)
                    var bool_First_Weapon = (character.weapon_one == legend[0].Weapon_one || character.weapon_one == legend[0].Weapon_two  ? 1 : 0)
                    var bool_Second_Weapon = (character.weapon_two == legend[0].Weapon_two || character.weapon_two == legend[0].Weapon_one  ? 1 : 0)
        
                    const comparisonResult = {
                        "Strength": bool_Strength,
                        "Dexterity": bool_Dexterity,
                        "Defense": bool_Defense,
                        "Speed": bool_Speed,
                        "WeaponOne": bool_First_Weapon,
                        "WeaponTwo": bool_Second_Weapon
                    }
                    
                    res.render('test', { characters, comparisonResult });
                })
                
            } else {
                res.status(404).send('Personagem não encontrado.');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Erro ao buscar personagens.');
        }
    });
};
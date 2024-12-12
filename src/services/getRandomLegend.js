const axios = require("axios");

exports.getRandomLegend = async () => {
    const id = Math.random() * (66 - 3) + 3;

    const response = await axios.get(`https://brawlhalla.fly.dev/v1/legends/id?legend_id=${id}`);
    const character = response.data.data;
    return character;
}
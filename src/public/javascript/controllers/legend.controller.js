const { newOrUpdateLegend, getLegend } = require("../repositories/legend.repository")

exports.createOrUpdate = async (req, res) => {
    try {
        const legend = await newOrUpdateLegend(req.body)
        res.status(200).send(legend);
    } catch (e) {
        res.status(400).send(e);
    }
}

exports.get = async (res) => {
    try {
        const legend = await getLegend()
        res.status(200);
        return legend;
    } catch (e) {
        res.status(400).send(e);
    }
}
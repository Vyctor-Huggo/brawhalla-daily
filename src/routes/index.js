const { dailyRoutes } = require("./daily.routes");
const { legendRoutes } = require("./legend.routes");

module.exports = (app) => {
    dailyRoutes(app);
    legendRoutes(app);
};
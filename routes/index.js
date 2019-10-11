module.exports = function(app) {
    require("./apiRoutes")(app);
    require("./htmlRoutes")(app);
};
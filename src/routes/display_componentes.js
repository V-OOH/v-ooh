var express = require("express");
var router = express.Router();

var displayComponenteController =
    require("../controllers/display_componentesController");

router.get("/dashboard/:idDisplay", function (req, res) {
    displayComponenteController.buscarDashboard(req, res);
});

module.exports = router;
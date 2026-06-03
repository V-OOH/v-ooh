var express = require("express");
var router = express.Router();

var displayComponenteController =
    require("../controllers/display_componenteController");

router.get("/dashboard/:idDisplay", function (req, res) {
    displayComponenteController.buscarDashboard(req, res);
});

module.exports = router;
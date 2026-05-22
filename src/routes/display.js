var express = require("express");
var router = express.Router();

var displayController = require("../controllers/displayController");

router.post("/cadastrarDisplay", function (req, res) {
    displayController.cadastrarDisplay(req, res);
});

router.post("/cadastrarComp", function (req, res) {
    displayController.cadastrarComp(req, res);
});

router.post("/cadastrarEnd", function (req, res) {
    displayController.cadastrarEnd(req, res);
});

router.post("/buscarDisplays", function (req, res) {
    displayController.buscarDisplays(req, res);
});

module.exports = router;
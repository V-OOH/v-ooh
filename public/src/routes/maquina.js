var express = require("express");
var router = express.Router();

var maquinaController = require("../controllers/maquinaController");

router.post("/cadastrar", function (req, res) {
    maquinaController.cadastrar(req, res);
})
router.post("/buscar", function (req, res) {
    maquinaController.buscar(req, res);
});

module.exports = router;
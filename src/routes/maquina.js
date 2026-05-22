var express = require("express");
var router = express.Router();

var maquinaController = require("../controllers/maquinaController");

router.post("/cadastrar", function (req, res) {
    maquinaController.cadastrar(req, res);
})
router.post("/buscar", function (req, res) {
    maquinaController.buscar(req, res);
});
router.post("/buscarZona", function (req, res) {
    maquinaController.buscarZona(req, res);
});
router.post("/listarZona", function (req, res) {
    maquinaController.listarZona(req, res);
});

module.exports = router;
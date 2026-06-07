var express = require("express")
var router = express.Router();

var incidenteController = require("../controllers/incidenteController")

router.get("/dados-s3/:idEmpresa", function (req, res) {
    incidenteController.buscarDadosS3(req, res);
});

router.get("/meta-disponibilidade/:idEmpresa", function (req, res) {
    incidenteController.buscarMetaDisponibilidade(req, res);
});

module.exports = router;
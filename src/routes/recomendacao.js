var express = require("express");
var router = express.Router();

var recomendacaoController = require('../controllers/incidenteController');

router.get("/recomendacaoIA/:idEmpresa", function (req,res){
    recomendacaoController.recomendacaoIA(req,res);
});

module.exports = router;
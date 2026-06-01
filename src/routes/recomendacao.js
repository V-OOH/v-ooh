var express = require("express");
var router = express.Router();

var recomendacaoIA = require('../controllers/recomendacaoController');

router.get("", function (req,res){
    recomendacaoIA.Controller()
});
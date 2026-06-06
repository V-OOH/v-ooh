let express = require("express");
let router = express.Router();
let operacaoController = require("../controllers/operacaoController");

router.get(`/dados/operacao`, (req, res) => {
  operacaoController.buscarDados(req, res);
});

module.exports = router;

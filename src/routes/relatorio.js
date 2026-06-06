const express = require("express");
const router  = express.Router();
const { downloadRelatorio } = require("../controllers/relatorioController");

console.log("[Relatorio] Router carregado");

router.get("/:arquivo", (req, res, next) => {
    console.log("[Relatorio] Rota chamada:", req.params.arquivo);
    next();
}, downloadRelatorio);

module.exports = router;
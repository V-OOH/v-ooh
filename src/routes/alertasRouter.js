const express = require("express");
const router = express.Router();
const alertaController = require("../controllers/alertaController");

router.get("/dados-dashboard", (req, res) => {
    alertaController.buscarDados(req, res);
});

module.exports = router;
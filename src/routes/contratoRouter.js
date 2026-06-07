const express = require("express");
const router = express.Router();
const contratoController = require("../controllers/contratoController");

router.post("/meta-operacao", function (req, res) {
  contratoController.buscarMetas(req, res);
});

module.exports = router;

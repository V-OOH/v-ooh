var express = require("express");
var router = express.Router();
var componenteController = require('../controllers/componenteController')

router.get("/buscar", function (req, res) {
    componenteController.buscar(req, res);
});

module.exports = router;
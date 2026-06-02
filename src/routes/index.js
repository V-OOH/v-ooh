var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
    res.render("index");
});

var redeRouter = require('./rede')
router.use('/rede', redeRouter)

module.exports = router; 
var express        = require('express')
var router         = express.Router()
var redeController = require('../controllers/redeController')

router.post('/buscarDadosRede', function (req, res) {
    redeController.buscarDadosRede(req, res)
})


module.exports = router
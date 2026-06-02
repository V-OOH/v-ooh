const redeModel = require('../models/redeModel')

function buscarDadosRede(req, res) {
    const idEmpresa = req.body.idEmpresa

    if (idEmpresa == undefined) {
        return res.status(400).send('idEmpresa está undefined!')
    }

    redeModel.buscarDadosRede(idEmpresa)
        .then(function (dados) {
            res.status(200).json(dados)
        })
        .catch(function (erro) {
            console.log(erro)
            res.status(500).json('Erro ao buscar dados de rede')
        })
}

module.exports = { buscarDadosRede }
var componenteModel = require("../models/componenteModel");


async function cadastrar(req, res) {
    var nome = req.body.nomeServer
    var descricao = req.body.descricaoServer
    var unidadeMedida = req.body.unidadeMedidaServer

    if (!nome) {
        return res.status(400).json({ erro: "O campo nome está undefined!" })
    } else if (!descricao) {
        return res.status(400).json({ erro: "O campo descricao está undefined!" })
    } else if (!unidadeMedida) {
        return res.status(400).json({ erro: "O campo unidadeMedida está undefined!" })
    } else {
        try {

            var respostaBd = await componenteModel.cadastrar(nome, descricao, unidadeMedida)

            console.log("REsposta do bd", respostaBd.serverStatus);

            return res.status(200).json(respostaBd);
        } catch (error) {
            return res.status(400).json({ error: "Erro ao cadastrar" })
        }
    }
}

async function buscar(req, res) {

    console.log("Buscar componente");

    var respostaBd = await componenteModel.buscar()

    if (!respostaBd) {
        return res.status(400).json({ error: "Erro ao buscar componente" })
    } else {
        return res.status(200).json(respostaBd)
    }

}
module.exports = {
    cadastrar,
    buscar
}
var componenteModel = require("../models/componenteModel");

async function buscar(req, res) {
    var fkMaquina = req.body.idMaquina;
    componenteModel
        .buscar(fkMaquina)
        .then(function (resultadoBuscar) {
            if (resultadoBuscar.length > 0) {
                console.log("TUDO CERTO")
                return res.status(200).json(resultadoBuscar)

            } else {
                throw new Error("Erro Ao Buscar Componentes");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log(
            "\nHouve um erro ao buscar maquinas! Erro: ",
            erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        });
  }


module.exports = {
    buscar
}
let contratoModel = require("../models/contratoModel");

/**
 * Busca as metas de SLA (MTTR) e Disponibilidade
 *
 * @param {*} req
 * @param {*} res
 */
function buscarMetas(req, res) {
  let idEmpresa = req.body.idEmpresa;

  contratoModel
    .buscarMetaDisponibilidade(idEmpresa)
    .then((resultado) => {
      if (resultado.length > 0) {
        console.log("Dados buscados");
        return res.status(200).json(resultado);
      } else {
        throw new Error("Erro ao buscar informações");
      }
    })
    .catch((erro) => {
      console.error(`Ocorreu um erro: ${erro}`);
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  buscarMetas,
};

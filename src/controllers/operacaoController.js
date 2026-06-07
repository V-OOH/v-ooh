function buscarDados(req, res) {
  const AWS_URL = "URL";

  fetch(AWS_URL)
    .then((resposta) => {
      if (!resposta.ok) {
        console.error("Ocorreu um erro na requisição");
        throw new Error("Ocorreu um erro: " + resposta.error);
      }

      return resposta.json();
    })
    .then((dados) => {
      console.log("Dados: ", dados);
    })
    .catch((erro) => {
      console.error("Erro: ", erro);
    });

  module.exports = { buscarDados };
}

function listarZonas(req, res) {
  var operacaoModel = require("../models/operacaoModel");
  operacaoModel.buscarZonas()
      .then(function (resultado) {
          if (resultado.length > 0) {
              res.status(200).json(resultado);
          } else {
              res.status(240).send("Nenhum resultado encontrado!");
          }
      }).catch(function (erro) {
          console.log(erro);
          res.status(500).json(erro.sqlMessage);
      });
}

module.exports = {
  buscarDados,
  listarZonas
};

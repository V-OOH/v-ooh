const AWS = require("aws-sdk");

const config = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  sessionToken: process.env.AWS_SESSION_TOKEN,
  region: process.env.AWS_REGION,
};

const s3 = new AWS.S3(config);

async function buscarDados(req, res) {
  try {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `client/operacao.json`,
    };

    const arquivo = await s3.getObject(params).promise();
    const dados = JSON.parse(arquivo.Body.toString("utf-8"));

    res.status(200).json(dados);
  } catch (erro) {
    console.error("Ocorreu um erro ao buscar os dados: ", erro);

    res.status(500).json({
      erro: "Erro ao buscar dados no S3",
    });
  }
}

function listarZonas(req, res) {
  var operacaoModel = require("../models/operacaoModel");
  operacaoModel
    .buscarZonas()
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(240).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  buscarDados,
  listarZonas,
};

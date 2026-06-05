const AWS = require("aws-sdk");
const liaModel = require("../models/liaModel");
const recomendacaoModel = require("../models/recomendacaoModel");


const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN,
    region: process.env.AWS_REGION
})

async function buscarDadosS3(req, res) {

    try{
        const idEmpresa = req.params.idEmpresa;

        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `client/dashIncidente_Empresa2.json`
        };

        const arquivo = await s3.getObject(params).promise();
        const dados = JSON.parse(arquivo.Body.toString("utf-8"));

        res.status(200).json(dados);

    } catch(erro) {
        console.error("Erro ao buscar dados no S3:", erro);

        res.status(500).json({
            erro: "Erro ao buscar dados no S3"
        });
    }
}

function pegarUltimaLeitura(dados) {
    const dias = Object.keys(dados);
    const ultimoDia = dias[dias.length - 1];

    const horas = Object.keys(dados[ultimoDia]);
    const ultimaHora = horas[horas.length - 1];

    return dados[ultimoDia][ultimaHora];
}

async function recomendacaoIA(req, res) {
    try {
        const idEmpresa = req.params.idEmpresa;

        const recomendacao = await recomendacaoModel.buscarRecomendacao(idEmpresa);

        if (recomendacao.length > 0) {
            console.log("Recomendação encontrada no banco");

            return res.status(200).json({
                alerta: recomendacao[0].recomendacao,
                origem: "recomendacao"
            });
        }

        console.log("Banco vazio. Chamando Gemini...");

        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `client/dashIncidente_Empresa${idEmpresa}.json`
        };
        
        const arquivo = await s3.getObject(params).promise();
        const dados = JSON.parse(arquivo.Body.toString("utf-8"));

        const ultimaLeitura = pegarUltimaLeitura(dados);

        const respostaIA = await liaModel.recomendacaoIncidente(ultimaLeitura);

        await recomendacaoModel.salvarRecomendacao(idEmpresa, respostaIA);

        res.status(200).json({
            alerta: respostaIA,
            origem: "gemini"
        });

    } catch (erro) {
        console.error("Erro ao gerar recomendação IA:", erro);

        res.status(500).json({
            erro: "Erro ao gerar recomendação IA"
        });
    }
}

module.exports = {
    buscarDadosS3,
    recomendacaoIA
};
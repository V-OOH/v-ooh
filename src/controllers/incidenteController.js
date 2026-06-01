const AWS = require("aws-sdk");


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

module.exports = {
    buscarDadosS3
};
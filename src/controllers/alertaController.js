const AWS = require("aws-sdk");

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN,
    region: process.env.AWS_REGION,
});

async function buscarDados(req, res) {
    try {
        const hoje = new Date();
        const dia = String(hoje.getDate()).padStart(2, "0");
        const mes = String(hoje.getMonth() + 1).padStart(2, "0");
        const ano = hoje.getFullYear();
        const key = `client/dados_dashboard_alertas_empresa_2_${dia}_${mes}_${ano}.json`;

        console.log("Buscando chave:", key);

        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: key,
        };

        const arquivo = await s3.getObject(params).promise();
        const dados = JSON.parse(arquivo.Body.toString("utf-8"));

        res.status(200).json(dados);
    } catch (erro) {
        console.error("Ocorreu um erro ao buscar os dados:", erro);
        res.status(500).json({ erro: "Erro ao buscar dados no S3" });
    }
}

module.exports = {
    buscarDados,
};
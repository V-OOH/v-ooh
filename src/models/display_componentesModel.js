const AWS = require('aws-sdk');
const s3 = new AWS.S3({ region: 'us-east-2' }); 

function buscarDashboard(idDisplay) {
    return new Promise((resolve, reject) => {
        // Define o que vai ser buscado no S3
        const params = {
            Bucket: "BUCKET_S3",
            Key: `displays/${idDisplay}.json`
        };

        // Buscando o arquivo diretamente no bucket S3
        s3.getObject(params, function (erro, dados) {
            if (erro) {
                // Passa o erro para o bloco catch de quem chamou a Promise
                return reject(erro);
            }

            try {
                const jsonS3 = JSON.parse(dados.Body.toString('utf-8'));
                resolve(jsonS3);
            } catch (erroParse) {
                reject({ code: 'JsonParseError', message: 'Erro ao converter o arquivo do S3 para JSON', erro: erroParse });
            }
        });
    });
}

module.exports = {
    buscarDashboard
};
var AWS = require('aws-sdk');

// Configura o cliente do S3. 
var s3 = new AWS.S3({ region: 'us-east-2' }); 

function buscarDashboard(req, res) {
    var idDisplay = req.params.idDisplay;

    if (idDisplay == undefined) {
        return res.status(400).send("Seu idDisplay está undefined!");
    }

    // Define o alvo de busca no S3
    var params = {
        Bucket: "BUCKET_S3",
        Key: `displays/${idDisplay}.json`
    };

    //  Buscando o arquivo no S3
     s3.getObject(params, function (erro, dados) {
        if (erro) {
            console.log("Erro ao buscar no S3:", erro);
            
            // Se o arquivo não existir (NoSuchKey), retorna 404
            if (erro.code === 'NoSuchKey') {
                return res.status(404).json({ 
                    mensagem: `Nenhum dado encontrado hoje para o display ${idDisplay}.` 
                });
            }
            return res.status(500).json(erro);
        }

        var jsonS3 = JSON.parse(dados.Body.toString('utf-8'));

        res.status(200).json(jsonS3);
    });
}

module.exports = {
    buscarDashboard
};
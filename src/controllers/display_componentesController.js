var displayComponenteModel = require("../models/display_componentesModel"); 

function buscarDashboard(req, res) {
    var idDisplay = req.params.idDisplay;

     console.log("CHEGOU NO CONTROLLER!");

    if (idDisplay == undefined) {
        return res.status(400).send("Seu idDisplay está undefined!");
    }

    // Chama a função do Model passando o id recebido pela rota
    displayComponenteModel.buscarDashboard(idDisplay)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log("Erro ao buscar dados no Model/S3:", erro);
            
            // Trata o erro de arquivo não encontrado vindo do S3
            if (erro.code === 'NoSuchKey') {
                return res.status(404).json({ 
                    mensagem: `Nenhum dado encontrado hoje para o display ${idDisplay}.` 
                });
            }
            
            return res.status(500).json({
                mensagem: "Erro interno ao processar a requisição.",
                detalhes: erro.message || erro
            });
        });
}

module.exports = {
    buscarDashboard
};
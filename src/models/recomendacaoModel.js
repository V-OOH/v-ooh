const database = require("../database/config");

function buscarRecomendacao(idEmpresa) {
    const instrucao = `
        SELECT recomendacao
        FROM recomendacaoIA
        WHERE fkEmpresa = ${idEmpresa}
        AND dataRecomendacao >= DATE_SUB(NOW(), INTERVAL 1 MINUTE)
        ORDER BY dataRecomendacao DESC
        LIMIT 1;
    `;

    return database.executar(instrucao);
}

function salvarRecomendacao(idEmpresa, recomendacao) {
    var recomendacaoTratada = recomendacao.replaceAll("'", "''");
    
    const instrucao = `
        INSERT INTO recomendacaoIA (fkEmpresa, recomendacao)
        VALUES (${idEmpresa}, '${recomendacaoTratada}');
    `;

    return database.executar(instrucao);
}

module.exports = {
    buscarRecomendacao,
    salvarRecomendacao
};
var database = require("../database/config")
function verificarToken(token) {
    var instrucaoSql = `
        SELECT * FROM empresa WHERE token = '${token}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar(
    cnpj,
    razaoSocial,
    telefoneContato,
    email,
    token,
    cep,
    numero
) {
    var instrucaoSql = `
        INSERT INTO empresa (cnpj, razaoSocial, contato, email, token, cep, numero)
        VALUES (
            '${cnpj}','${razaoSocial}','${telefoneContato}', '${email}', '${token}', '${cep}', '${numero}'
        );
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    cadastrar,
    verificarToken
};
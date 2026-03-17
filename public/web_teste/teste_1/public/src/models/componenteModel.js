var database = require("../database/config")


function cadastrar(nome, descricao, medida) {
    var instrucaoSql = `
            INSERT INTO componente(nome, descricao, medida) VALUES 
            ('${nome}', '${descricao}', '${medida}')
        `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscar() {
    var instrucaoSql = `
            SELECT * FROM componente;
        `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
    
}

module.exports = {
    cadastrar,
    buscar
};

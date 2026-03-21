var database = require("../database/config")

function cadastrar(fkEmpresa, nomeMaquina) {
    var instrucaoSql = `
        INSERT INTO maquina (fkEmpresa, nomeMaquina) VALUES ('${fkEmpresa}', '${nomeMaquina}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscar(fkEmpresa) {
    var instrucaoSql = `
            SELECT * FROM maquina WHERE fkEmpresa = ${fkEmpresa};
        `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
    
}

module.exports = {

    buscar
};

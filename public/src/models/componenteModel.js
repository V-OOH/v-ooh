var database = require("../database/config")



function buscar(idMaquina) {
    var instrucaoSql = `
            SELECT * FROM maquina_componente WHERE fkMaquina = ${idMaquina};
        `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
    
}
function buscar_componentes() {
    var instrucaoSql = `
            SELECT * FROM componente;
        `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
    
}

module.exports = {
    buscar_componentes,
    buscar
};

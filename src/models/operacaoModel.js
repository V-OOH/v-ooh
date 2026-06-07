var database = require("../database/config");

function buscarDadosZona(idZona) {
    var instrucaoSql = "SELECT nome FROM zona WHERE idZona = " + idZona;
    return database.executar(instrucaoSql);
}

function buscarZonas() {
    var instrucaoSql = "SELECT idZona, nome FROM zona";
    return database.executar(instrucaoSql);
}

module.exports = { buscarDadosZona, buscarZonas };

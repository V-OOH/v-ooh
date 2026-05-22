var database = require("../database/config")

function buscarinfo(idUsuario) {
    var instrucaoSql = `
            SELECT *, DATE_FORMAT(data_hora_atualizacao, '%Y-%m-%dT%H:%i:%s') as dataAtualizacao FROM usuario WHERE id = ${idUsuario};
        `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
    
}

function buscarempresa(fkEmpresa) {
    var instrucaoSql = `
            SELECT nome_empresa,cnpj FROM cadastroEmpresa WHERE id = ${fkEmpresa};
        `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
    
}

function buscarendereco(fkEmpresa) {
    var instrucaoSql = `
            SELECT 
            e.id,
            e.cep,
            e.logradouro,
            e.numero,
            e.bairro,
            e.cidade,
            e.uf,
            e.complemento
        FROM endereco e
        INNER JOIN empresa emp ON emp.fk_endereco = e.id
        WHERE emp.id = ${fkEmpresa};
        `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
    
}

function editarendereco(fkEmpresa, idEndereco, cep, logradouro, numero, complemento, bairro, cidade, uf) {
    var instrucaoSql = `     
         UPDATE endereco SET cep = '${cep}',logradouro = '${logradouro}',numero = ${numero},complemento = '${complemento}',bairro = '${bairro}',cidade = '${cidade}', uf = '${uf}' WHERE idEndereco = ${idEndereco} and fkEmpresa =' ${fkEmpresa}'; 
        `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
    
}

module.exports = {
    buscarinfo,
    buscarempresa,
    buscarendereco,
    editarendereco
};
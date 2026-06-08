var database = require("../database/config")


function cadastrarDisplay(fkEmpresa, nome, id, so, ip, zona, mac) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", fkEmpresa, nome, id, so, ip);

    var instrucaoSql = `
    INSERT INTO display(fkEmpresa,fkZona, nome, numeroIdentificacao, sistemaOperacional, enderecoIp, mac) VALUES ('${fkEmpresa}', '${zona}','${nome}','${id}','${so}','${ip}', '${mac}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrarComp(Componentes, fkEmpresa, fkServidor) {

    var promises = [];

    for (var i = 0; i < Componentes.length; i++) {

        var instrucaoSql = `
        INSERT INTO display_componentes (fkDisplay, fkEmpresa, fkComponente)
        VALUES (${fkServidor}, ${fkEmpresa}, ${Componentes[i]});
        `;

        promises.push(database.executar(instrucaoSql));
    }

    return Promise.all(promises);
}

function cadastrarEnd(fkEmpresa, fkServidor, cep, logradouro, numero, complemento, bairro, cidade, uf) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", fkEmpresa, fkServidor, cep, logradouro, numero, complemento, bairro, cidade, uf);

    var instrucaoSql = `
    INSERT INTO endereco (fkEmpresa, fkDisplay, cep, logradouro, numero, complemento, bairro, cidade, uf
    ) VALUES ('${fkEmpresa}', '${fkServidor}','${cep}','${logradouro}','${numero}','${complemento}','${bairro}','${cidade}','${uf}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarDisplays(fkEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarUsuario():", fkEmpresa);

    var instrucaoSql = `
SELECT 
    d.idDisplay AS id,
    d.enderecoIP AS ip,
    d.mac AS mac,
    d.nome,
    d.sistemaOperacional AS so,
    e.logradouro,
    e.numero,
    e.bairro,
    e.cidade,
    e.uf,
    e.cep,
    e.complemento,
    COUNT(*) OVER() AS totalDisplays
FROM display d
LEFT JOIN endereco e ON e.fkDisplay = d.idDisplay
WHERE d.fkEmpresa = ${fkEmpresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrarDisplay,
    cadastrarComp,
    cadastrarEnd,
    buscarDisplays
};


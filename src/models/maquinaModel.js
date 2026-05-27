var database = require("../database/config");

function listarDisplays(idEmpresa) {
  let instrucaoSql = `SELECT * FROM display WHERE fkEmpresa = ${idEmpresa}`;

  console.log("Executando a instrução SQL: ", instrucaoSql);

  return database.executar(instrucaoSql);
}

function buscarZona(idEmpresa) {
  let instrucaoSql = `SELECT 
    z.idZona,
    z.nome AS nome_zona,
    z.descricao AS descricao_zona,
    COUNT(d.idDisplay) AS quantidade_displays
FROM zona AS z
LEFT JOIN display AS d 
    ON z.idZona = d.fkZona AND d.fkEmpresa = z.fkEmpresa
WHERE z.fkEmpresa = ${idEmpresa}
GROUP BY z.idZona, z.nome, z.descricao;`;

  console.log("Executando a instrução SQL: ", instrucaoSql);

  return database.executar(instrucaoSql);
}

function listarZona(idEmpresa) {
  let instrucaoSql = `SELECT 
    z.idZona,
    z.nome AS nome,
    GROUP_CONCAT(DISTINCT CONCAT(e.logradouro, ', ', e.numero, ', ', e.cidade) SEPARATOR '; ') AS enderecos_brutos
FROM zona z
INNER JOIN display d 
    ON d.fkZona = z.idZona
INNER JOIN endereco e 
    ON e.fkDisplay = d.idDisplay AND e.fkEmpresa = d.fkEmpresa
WHERE d.fkEmpresa = ${idEmpresa}
GROUP BY z.idZona, z.nome;`;

  console.log("Executando a instrução SQL: ", instrucaoSql);

  return database.executar(instrucaoSql);
}

module.exports = {
  listarDisplays,
  buscarZona,
  listarZona
};

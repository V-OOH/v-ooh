var database = require("../database/config");

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

function listarDisplays(idEmpresa) {
  let instrucaoSql = `SELECT * FROM display WHERE fkEmpresa = ${idEmpresa}`;

  console.log("Executando a instrução SQL: ", instrucaoSql);

  return database.executar(instrucaoSql);
}

function buscarZona(idEmpresa) {
  let instrucaoSql = `SELECT 
    z.nome AS nome_zona,
    z.descricao AS descricao_zona,
    COUNT(d.id) AS quantidade_displays
FROM zona AS z
INNER JOIN display AS d 
    ON z.id = d.fk_zona
WHERE d.fk_empresa = ${idEmpresa}
GROUP BY z.id, z.nome, z.descricao;`;

  console.log("Executando a instrução SQL: ", instrucaoSql);

  return database.executar(instrucaoSql);
}

function listarZona(idEmpresa) {
  let instrucaoSql = `SELECT 
    z.nome AS nome,
    GROUP_CONCAT(DISTINCT CONCAT(e.logradouro, ', ', e.numero, ', ', e.cidade) SEPARATOR ';') AS enderecos_brutos
FROM zona z
JOIN display d ON d.fk_zona = z.id
JOIN endereco e ON d.fk_endereco = e.id
WHERE d.fk_empresa = ${idEmpresa}
GROUP BY z.id, z.nome;`;

  console.log("Executando a instrução SQL: ", instrucaoSql);

  return database.executar(instrucaoSql);
}

module.exports = {
  buscar,
  listarDisplays,
  buscarZona,
  listarZona
};

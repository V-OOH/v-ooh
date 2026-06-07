var database = require("../database/config");

function buscarinfo(idUsuario) {
  var instrucaoSql = `
            SELECT *, DATE_FORMAT(dataAtualizacao , '%Y-%m-%dT%H:%i:%s') as dataAtualizacao FROM usuario WHERE usuario.idUsuario = ${idUsuario};
        `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarempresa(fkEmpresa) {
  var instrucaoSql = `
    SELECT
    nomeEmpresa,
    CONCAT(
            SUBSTRING(cnpj, 1, 2), '.',
            SUBSTRING(cnpj, 3, 3), '.',
            SUBSTRING(cnpj, 6, 3), '/',
            SUBSTRING(cnpj, 9, 4), '-',
            SUBSTRING(cnpj, 13, 2)
    )  AS cnpj
    FROM cadastroEmpresa WHERE cadastroEmpresa.idcadastroEmpresa = ${fkEmpresa};
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarendereco(fkEmpresa) {
  var sql = `
    SELECT
	CONCAT(
	SUBSTRING(e.cep, 1, 5),
	"-",
	SUBSTRING(e.cep, 6, 8)
	) AS cep,
	e.logradouro,
	e.numero,
	IFNULL(e.complemento, "N/A") AS complemento,
	e.bairro,
	e.cidade,
	e.uf
    FROM endereco e JOIN cadastroEmpresa ce
    ON e.fkEmpresa = ce.idcadastroEmpresa AND e.fkDisplay IS NULL;`;

  console.log("Executando a instrução SQL: \n" + sql);
  return database.executar(sql);
}

function editarendereco(
  fkEmpresa,
  idEndereco,
  cep,
  logradouro,
  numero,
  complemento,
  bairro,
  cidade,
  uf,
) {
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
  editarendereco,
};

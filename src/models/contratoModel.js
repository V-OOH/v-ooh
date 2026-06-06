let database = require("../database/config");

/**
 * Busca a meta de disponibilidade da empresa
 *
 *
 * @param {*} fkEmpresa
 */
function buscarMetaDisponibilidade(fkEmpresa) {
  console.log(`Buscando a meta contratual da empresa de ID ${fkEmpresa}`);

  let sql = `
    SELECT metaDisponibilidade, sla FROM contrato WHERE fkEmpresa = ${fkEmpresa};
    `;

  console.log(`Executando a instrução SQL: \n ${sql}`);

  return database.executar(sql);
}

module.exports = {
  buscarMetaDisponibilidade,
};

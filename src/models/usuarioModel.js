// const { cadastrarGestor } = require("../controllers/usuarioController");
var database = require("../database/config");

function autenticar(email, senha) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
    email,
    senha,
  );
  var instrucaoSql = `
        SELECT idUsuario, nome, email, fkEmpresa as empresaId, tipoUsuario FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrar(email, codigo) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
    email,
    codigo,
  );
  var instrucaoSql = `
        SELECT idUsuario, codigoAcesso, email, fkEmpresa as empresaId FROM usuario WHERE email = '${email}' AND codigoAcesso = '${codigo}';
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function finalizarCadastro(nome, senha, id) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
    nome,
    senha,
    id,
  );
  var instrucaoSql = `
        UPDATE usuario SET nome = '${nome}', senha = '${senha}', codigoAcesso = NULL WHERE idUsuario = ${id};
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrarFuncionario(
  fkEmpresa,
  idSuperior,
  nome,
  email,
  dataNascimento,
  cpf,
  senha,
  rg,
) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
    fkEmpresa,
    idSuperior,
    nome,
    email,
    dataNascimento,
    cpf,
    senha,
    rg,
  );

  var instrucaoSql = `
    INSERT INTO usuario(fkEmpresa, fkSuperior, nome, email, dataNascimento, cpf, senha, statusUsuario, tipoUsuario, documentoIdetificacao) VALUES ('${fkEmpresa}','${idSuperior}','${nome}','${email}','${dataNascimento}','${cpf}','${senha}','Ativo','Funcionario','${rg}');
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrarGestor(fkEmpresa, emailUser, dtNasc, cpf, rg) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
    fkEmpresa,
    emailUser,
    dtNasc,
    cpf,
  );

  var instrucaoSql = `
    INSERT INTO usuario(fkEmpresa, email, dataNascimento, cpf, statusUsuario, tipoUsuario, documentoIdetificacao) VALUES ('${fkEmpresa}','${emailUser}','${dtNasc}','${cpf}','Ativo','Gestor','${rg}');
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarUsuarios(fkEmpresa) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarUsuario():",
    fkEmpresa,
  );

  var instrucaoSql = `
    SELECT * FROM usuario WHERE fkEmpresa = ${fkEmpresa} and tipoUsuario = 'Funcionario' and senha IS NOT NULL;
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarNumUsuarios(fkEmpresa) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarUsuario():",
    fkEmpresa,
  );

  var instrucaoSql = `
    SELECT COUNT(idUsuario) AS total_usuarios FROM usuario WHERE fkEmpresa = ${fkEmpresa} and tipoUsuario = 'Funcionario' and senha IS NOT NULL;
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

// Salva o caminho da foto de perfil do usuário
function updateFotoPerfil(idUsuario, caminhoFotoPerfil) {
  if (idUsuario == undefined || caminhoFotoPerfil == undefined) {
    return;
  }

  var sql = `UPDATE usuario SET fotoPerfil = '${caminhoFotoPerfil}' WHERE idUsuario = ${idUsuario};`;

  console.log("Salvando foto de perfil de usuário");
  console.log("Executando SQL: ", sql);

  return database.executar(sql);
}

// Busca o caminho da foto do usuário
function buscarFotoPerfil(idUsuario) {
  if (idUsuario == undefined) {
    return;
  }

  let sql = `SELECT fotoPerfil FROM usuario WHERE idUsuario = ${idUsuario};`;

  console.log("Buscando a foto de perfil do usuário de ID: ", idUsuario);

  return database.executar(sql);
}

module.exports = {
  autenticar,
  cadastrar,
  finalizarCadastro,
  cadastrarFuncionario,
  cadastrarGestor,
  buscarUsuarios,
  buscarNumUsuarios,
  updateFotoPerfil,
  buscarFotoPerfil,
};

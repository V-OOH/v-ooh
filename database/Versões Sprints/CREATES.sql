/**
 * Script de criação de tabelas
 *
 * Banco de Dados: VOOH
 *
 * */

-- Criar o banco de dados
CREATE DATABASE vooh;

-- Usar o banco de dados
USE vooh;


-- Empresa
/*
 * Campos:
 *
 * - ID da empresa
 * - Nome do responsável
 * - Nome da empresa
 * - CNPJ da empresa
 * - Data e hora de cadastro
 * - Data e hora de atualização
  * - Status da empresa
 * */
 
CREATE TABLE cadastroEmpresa (
	idcadastroEmpresa INT PRIMARY KEY AUTO_INCREMENT,
	nomeResponsavel VARCHAR(50) NOT NULL,
    nomeEmpresa VARCHAR(50) DEFAULT NULL,
	cnpj VARCHAR(14) NOT NULL UNIQUE,
    dataCadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
    dataAtualizacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    statusCliente VARCHAR(10),
	urlWEBHOOK VARCHAR(255),
    jiraUrl VARCHAR(255),
    jiraEmail VARCHAR(100),
    jiraToken VARCHAR(255)
);

-- Contrato
/*
 * Campos:
 *
 * - ID do contrato
 * - Foreign Key Empresa
 * - Periodo Inicial
 * - Periodo Final
 * - Meta de Disponibilidade
 * - SLA
 * - Ultima Atualização
 * */

 CREATE TABLE contrato (
	idContrato INT PRIMARY KEY AUTO_INCREMENT,
    fkEmpresa INT,
    periodo_inicial DATETIME,
    periodo_final DATETIME,
    metaDisponibilidade DOUBLE,
    sla DOUBLE,
    ultima_referencia DATETIME DEFAULT CURRENT_TIMESTAMP,
		CONSTRAINT fkcontrato_empresa
			FOREIGN KEY (fkEmpresa)
				REFERENCES CadastroEmpresa (idcadastroEmpresa)
 );

-- Usuário
/*
 * Campos:
 *
 * - ID do usuário
 * - Código de acesso
 * - Nome do usuário
 * - E-mail do usuário
 * - Data de nascimento do usuário
 * - CPF do usuário
 * - Documento de identificação do usuário - Substituto do CPF
 * - Tipo de usuário
 * - Senha de acesso do usuário
 * - Hash da senha de acesso - Desejável de implementação
 * - Status do usuário
 * - Data e hora de cadastro
 * - Data e hora de atualização
 * - FK da empresa
 * - FK do superior do usuário
 * */

CREATE TABLE usuario(
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    codigoAcesso VARCHAR(45),
    fkEmpresa INT NOT NULL,
    fkSuperior INT,
    nome VARCHAR(50),
    email VARCHAR(100) NOT NULL UNIQUE,
    dataNascimento DATE NOT NULL,
    cpf VARCHAR(11) NOT NULL UNIQUE,
    senha VARCHAR(20),
    statusUsuario VARCHAR(25),
	dataCadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
    dataAtualizacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    tipoUsuario CHAR(25),
    documentoIdetificacao VARCHAR(20),
		CONSTRAINT chkCliente 
			CHECK (statusUsuario IN ('Ativo', 'Inativo')),
		CONSTRAINT chk_usuario 
			CHECK (tipoUsuario IN ('Gestor', 'Funcionario', 'Suporte')),
		CONSTRAINT fkCadastroEmpresa 
			FOREIGN KEY (fkEmpresa) 
				REFERENCES cadastroEmpresa(idcadastroEmpresa),
		CONSTRAINT fkusuarioSuperior
			FOREIGN KEY (fkSuperior) 
				REFERENCES usuario(idUsuario)
);

-- Contato
/*
 * Campos:
 *
 * - ID do contato
 * - Código de país (DDI)
 * - Código de região (DDD)
 * - Telefone fixo
 * - Telefone celular
 * - E-mail
 * - FK da empresa
 * */

CREATE TABLE contato (
    idContato INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    fkEmpresa INT NOT NULL,
    telefoneFixo CHAR(12) NOT NULL UNIQUE,
    telefoneCelular CHAR(12) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
		CONSTRAINT fkEmpresa_contato
			FOREIGN KEY (fkEmpresa) 
				REFERENCES cadastroEmpresa(idcadastroEmpresa)
);

-- Zona
/**
 * Campos:
 *
 * - ID da Zona
 * - Nome da zona
 * - Descrição
 * */

CREATE TABLE zona (
	idZona INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    descricao VARCHAR(45)
);

-- Display
/*
 * Campos:
 *
 * - ID do display
 * - Nome do display
 * - Identificação
 * - Sistema Operacional
 * - Endereço de IPV4
 * - Endereço de MAC
 * - FK da empresa
 * - FK da zona
 * - FK do endereço
 * */

CREATE TABLE display (
	idDisplay INT NOT NULL AUTO_INCREMENT,
    fkEmpresa INT NOT NULL,
		CONSTRAINT chave_compostaServidor
			PRIMARY KEY(idDisplay, fkEmpresa),
	fkZona INT,
	nome VARCHAR(45),
    numeroIdentificacao VARCHAR(45),
    sistemaOperacional VARCHAR(45),
    enderecoIP VARCHAR(100),
		CONSTRAINT fkEmpresa_display
			FOREIGN KEY (fkEmpresa)
				REFERENCES cadastroEmpresa(idcadastroEmpresa),
		CONSTRAINT fkzona_display
			FOREIGN KEY (fkZona)
				REFERENCES zona(idZona)
);

CREATE TABLE endereco (
	idEndereco INT PRIMARY KEY AUTO_INCREMENT,
    fkEmpresa INT NOT NULL,
    fkDisplay INT UNIQUE,
	cep VARCHAR(14) NOT NULL,
	logradouro VARCHAR(40) NOT NULL,
	numero INT NOT NULL,
	complemento VARCHAR(40),
	bairro VARCHAR(40) NOT NULL,
    cidade VARCHAR(40) NOT NULL,
    uf CHAR(2) NOT NULL,
		CONSTRAINT fkEmpresa_endereco
			FOREIGN KEY (fkEmpresa) 
				REFERENCES cadastroEmpresa(idcadastroEmpresa),
	CONSTRAINT fkServidor_endereco
			FOREIGN KEY (fkDisplay) 
				REFERENCES display (idDisplay)             
);

-- Componente
/*
 * Campos:
 *
 * - ID do componente
 * - Nome do componente
 * - Tipo do componente
 * - Unidade de medida do componente
 * */
 
CREATE TABLE componentes (
	idComponente INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    tipo VARCHAR(45),
    medida VARCHAR(45) NOT NULL,
    biblioteca VARCHAR(45) NOT NULL,
    parametro VARCHAR(45)
);

-- Associativa - Display-Componente
/*
 * Campos:
 *
 * - FK do display
 * - FK do componente
 * - FK da empresa
 * - Mínimo
 * - Máximo
 * */

CREATE TABLE display_componentes (
    fkDisplay INT NOT NULL,
    fkEmpresa INT NOT NULL,
    fkComponente INT NOT NULL,
        CONSTRAINT chaveComposta_servidorComponente
            PRIMARY KEY (fkDisplay, fkEmpresa, fkComponente),
    limite_min INT , 
    limite_max INT ,
        CONSTRAINT fkServidor_servidorComponente
            FOREIGN KEY (fkDisplay)
                REFERENCES display(idDisplay),
        CONSTRAINT fkEmpresa_servidorComponente
            FOREIGN KEY (fkEmpresa)
                REFERENCES cadastroEmpresa(idcadastroEmpresa),
        CONSTRAINT fkComponente_servidorComponente
            FOREIGN KEY (fkComponente)
                REFERENCES componentes(idComponente)
);


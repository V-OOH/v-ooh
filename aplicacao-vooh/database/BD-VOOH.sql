CREATE DATABASE VOOH;
USE VOOH;

-- empresa
CREATE TABLE empresa (
    idEmpresa INT AUTO_INCREMENT PRIMARY KEY,
    cnpj VARCHAR(18) NOT NULL,
    razaoSocial VARCHAR(100) NOT NULL,
    token CHAR(64) NOT NULL,
    email VARCHAR(100) NOT NULL,
    cep CHAR(8) NOT NULL,
    numero VARCHAR(10) NOT NULL,
    contato VARCHAR(20) NOT NULL
)  AUTO_INCREMENT=1000;

-- User
CREATE TABLE usuario (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    fkEmpresa INT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) NOT NULL,
    email VARCHAR(100) NOT NULL,
    senha VARCHAR(100) NOT NULL,
    CONSTRAINT FK_empresa
		FOREIGN KEY (fkEmpresa) 
			REFERENCES empresa(idEmpresa)
)auto_increment=100;

-- mauina
CREATE TABLE maquina (
    idMaquina INT AUTO_INCREMENT PRIMARY KEY,
    fkEmpresa INT NOT NULL,
    nomeMaquina VARCHAR(100) NOT NULL,
    FOREIGN KEY (fkEmpresa) 
		REFERENCES empresa(idEmpresa)
);

-- componentes q podem ser cadastrados dps
CREATE TABLE componente (
    idComponente INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    descricao VARCHAR(100) NOT NULL,
    medida VARCHAR(50)NOT NULL
);

-- relação maquina x comp - usando a dica do brandao
CREATE TABLE maquina_componente (
    fkMaquina INT NOT NULL,
    fkComponente INT NOT NULL,
    limite DOUBLE NOT NULL,
    FOREIGN KEY (fkMaquina) 
		REFERENCES maquina(idMaquina),
    FOREIGN KEY (fkComponente) 
		REFERENCES componente(idComponente),
	PRIMARY KEY (fkMaquina, fkComponente)
);



INSERT INTO componente (nome, medida, descricao) VALUES
('CPU', '%', 'Uso do processador'),
('RAM', '%', 'Uso da memória RAM'),
('DISCO', '%', 'Uso do disco');
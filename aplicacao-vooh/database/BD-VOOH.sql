CREATE DATABASE VOOH;
USE VOOH;

-- drop database VOOH;

-- empresa
CREATE TABLE empresa (
    idEmpresa INT AUTO_INCREMENT PRIMARY KEY,
    cnpj VARCHAR(18),
    razaoSocial VARCHAR(100),
    token CHAR(64),
    email VARCHAR(100),
    cep CHAR(8),
    numero VARCHAR(10),
    contato VARCHAR(20)
)  AUTO_INCREMENT=1000;

-- User
CREATE TABLE usuario (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    fkEmpresa INT,
    nome VARCHAR(100),
    cpf VARCHAR(14),
    email VARCHAR(100),
    senha VARCHAR(100),
    CONSTRAINT FK_empresa
		FOREIGN KEY (fkEmpresa) 
			REFERENCES empresa(idEmpresa)
)auto_increment=100;

-- mauina
CREATE TABLE maquina (
    idMaquina INT AUTO_INCREMENT PRIMARY KEY,
    fkEmpresa INT,
    nomeMaquina VARCHAR(100),
    FOREIGN KEY (fkEmpresa) 
		REFERENCES empresa(idEmpresa)
);

-- componentes q podem ser cadastrados dps
CREATE TABLE componente (
    idComponente INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50),
    descricao VARCHAR(100),
    medida varchar(50)
);

-- relação maquina x comp - usando a dica do brandao
CREATE TABLE maquina_componente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fkMaquina INT,
    fkComponente INT,
    limite DOUBLE,
    FOREIGN KEY (fkMaquina) 
		REFERENCES maquina(idMaquina),
    FOREIGN KEY (fkComponente) 
		REFERENCES componente(idComponente)
);



INSERT INTO componente (nome, medida, descricao) VALUES
('CPU', '%', 'Uso do processador'),
('RAM', '%', 'Uso da memória RAM'),
('DISCO', '%', 'Uso do disco');
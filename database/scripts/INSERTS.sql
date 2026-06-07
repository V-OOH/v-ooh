USE vooh;
select * from display;
-- 1. Insert de empresas
INSERT INTO cadastroEmpresa 
(nomeResponsavel, nomeEmpresa, cnpj, statusCliente)
VALUES 
('Carlos Silva', 'Tech Solutions', '12345678000199', 'Ativo'),
('Marley Santos', 'VOOH', '12335678000199', 'Ativo');

-- 2. Insert de contato (Depende de empresa)
INSERT INTO contato 
(fkEmpresa, telefoneFixo, telefoneCelular, email)
VALUES 
(2, '011133334444', '011999998888', 'contato@digitalcorp.com');

-- 3. Insert de Zonas (Precisa existir antes do Display)
INSERT INTO zona (idZona, nome, descricao) 
VALUES 
(1, 'Laranja', 'Displays localizados na zona sul');

-- 4. Insert display (Depende de empresa e zona)
INSERT INTO display 
(fkEmpresa, fkZona, nome, numeroIdentificacao, sistemaOperacional, enderecoIP, mac)
VALUES 
(2, 1, 'Servidor Principal Laranja', 'SRV-002', 'Ubuntu 23.04','192.168.1.1', 'a4:63:a1:6e:67:09'),
(2, 1, 'Servidor Principal Laranja', 'SRV-002', 'Ubuntu 23.04','192.168.1.1', 'E0-2B-E9-6D-2E-C3');

select * from zona;
-- 5. Insert endereço (Depende de empresa e display)
INSERT INTO endereco 
(fkEmpresa, fkDisplay, cep, logradouro, numero, complemento, bairro, cidade, uf)
VALUES 
(2, 1, '01310100', 'Avenida Paulista', 1000, 'Sala 42', 'Bela Vista', 'São Paulo', 'SP');

INSERT INTO endereco 
(fkEmpresa, fkDisplay, cep, logradouro, numero, complemento, bairro, cidade, uf)
VALUES 
(2, 2, '01310100', 'Avenida Paulista', 1000, 'Sala 42', 'Bela Vista', 'São Paulo', 'SP');

-- 6. Insert de usuario (Ajustado o segundo registro que estava desalinhado e faltando campos)
INSERT INTO usuario
(fkEmpresa, codigoAcesso, fkSuperior, nome, email, dataNascimento, cpf, senha, statusUsuario, tipoUsuario, documentoIdetificacao)
VALUES
(1, 'ACESSO123', NULL, 'Carlos Silva', 'carlos@techsolutions.com', '1985-06-15', '12345678901', 'senha123', 'Ativo', 'Gestor', 'RG1234567'),
(1, '337', 1, 'Valete', 'valete@techsolutions.com', '2002-06-15', '12345678902', 'senha456', 'Ativo', 'Funcionario', 'RG1234568'),
(2, NULL, NULL, 'Guilherme Ornaghi', 'guilherme@vooh.com', '2006-07-16', '12345672222', 'senha123', 'Ativo', 'Suporte', 'RG1254678'),
(2, 'SUP001', NULL, 'Pedro Lima', 'pedro@digitalcorp.com', '1995-08-10', '11122233344', 'senha456', 'Ativo', 'Suporte', 'RG1122334');

INSERT INTO usuario
(fkEmpresa, codigoAcesso, fkSuperior, nome, email, dataNascimento, cpf, senha, statusUsuario, tipoUsuario, documentoIdetificacao)
VALUES
(2, 232, NULL, 'Guilherme Souto', 'souto@vooh.com', '2006-06-07', '123123213', 'senha123', 'Ativo', 'Gestor', 'RG1254678');

-- 7. Insert de componentes
INSERT INTO componentes (idComponente, nome, tipo, medida, biblioteca, parametro)
VALUES 
(1, 'cpu', 'processador', 'GHZ', 'psutil', '.cpu'),
(2, 'ram', 'armazenamento', 'GB', 'psutil', '.memory'),
(3, 'disco', 'armazenamento', 'TB', 'psutil', '.disk');

-- 8. Insert Componente_Servidor (Associativa)
INSERT INTO display_componentes 
(fkDisplay, fkEmpresa, fkComponente, limite_min, limite_max)
VALUES 
(1, 2, 1, 10, 90),  -- CPU para o Display 1 da Empresa 2
(1, 2, 2, 20, 85),  -- RAM para o Display 1 da Empresa 2
(1, 2, 3, 5, 80);   -- Disco para o Display 1 da Empresa 2*


-- Inserts dos displays usados no mock do dashIncidente_Empresa2_7dias.json
-- Atenção: pressupõe que cadastroEmpresa.idcadastroEmpresa = 2 e que as zonas 1, 2, 3 e 4 já existem.

INSERT INTO display (idDisplay, fkEmpresa, fkZona, nome, numeroIdentificacao, sistemaOperacional, enderecoIP, mac) VALUES
(3, 2, 1, 'Display Paulista 01', 'DSP-PAU-001', 'Ubuntu', '10.0.2.11', 'asdaweawdas'),
(4, 2, 1, 'Display Paulista 02', 'DSP-PAU-002', 'Ubuntu', '10.0.2.12', 'nu8afd82340fj'),
(5, 2, 1, 'Display Faria Lima 01', 'DSP-FL-001', 'Ubuntu', '10.0.2.13', 'B8:27:EB:45:12:9A'),
(6, 2, 1, 'Display Pinheiros 01', 'DSP-PIN-001', 'Windows IoT', '10.0.2.14', 'D4:3D:7E:21:AC:10'),
(7, 2, 1, 'Display Tatuapé 01', 'DSP-TAT-001', 'Ubuntu', '10.0.2.15', '7C:D1:C3:88:54:22'),
(8, 2, 1, 'Display São Miguel 01', 'DSP-SM-001', 'Ubuntu', '10.0.2.16', 'F0:18:98:AA:11:BC');


INSERT INTO endereco (fkEmpresa, fkDisplay, cep, logradouro, numero, complemento, bairro, cidade, uf) VALUES
(2, 3, '01310-100', 'Avenida Paulista', 1000, 'Próximo ao metrô Trianon-Masp', 'Bela Vista', 'São Paulo', 'SP'),
(2, 4, '01310-200', 'Avenida Paulista', 1578, 'Conjunto Nacional', 'Bela Vista', 'São Paulo', 'SP'),
(2, 5, '04538-133', 'Av. Brigadeiro Faria Lima', 3477, 'Próximo ao shopping', 'Itaim Bibi', 'São Paulo', 'SP'),
(2, 6, '05422-001', 'Rua dos Pinheiros', 870, 'Entrada principal', 'Pinheiros', 'São Paulo', 'SP'),
(2, 7, '03066-000', 'Rua Tuiuti', 1200, 'Próximo ao shopping', 'Tatuapé', 'São Paulo', 'SP'),
(2, 8, '08010-090', 'Av. Marechal Tito', 3500, 'Terminal urbano', 'São Miguel Paulista', 'São Paulo', 'SP');


select * from contrato;

INSERT INTO contrato (fkEmpresa, metaDisponibilidade)
VALUES (
    2,
    99.0
);

select * from recomendacaoIA;

ALTER TABLE usuario ADD COLUMN fotoPerfil varchar(255);
show tables;
select * from usuario;
select * from contrato

USE vooh;

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
(fkEmpresa, fkZona, nome, numeroIdentificacao, sistemaOperacional, enderecoIP)
VALUES 
(2, 1, 'Servidor Principal Laranja', 'SRV-002', 'Ubuntu 23.04', '192.168.1.10');

-- 5. Insert endereço (Depende de empresa e display)
INSERT INTO endereco 
(fkEmpresa, fkDisplay, cep, logradouro, numero, complemento, bairro, cidade, uf)
VALUES 
(2, 1, '01310100', 'Avenida Paulista', 1000, 'Sala 42', 'Bela Vista', 'São Paulo', 'SP');

-- 6. Insert de usuario (Ajustado o segundo registro que estava desalinhado e faltando campos)
INSERT INTO usuario
(fkEmpresa, codigoAcesso, fkSuperior, nome, email, dataNascimento, cpf, senha, statusUsuario, tipoUsuario, documentoIdetificacao)
VALUES
(1, 'ACESSO123', NULL, 'Carlos Silva', 'carlos@techsolutions.com', '1985-06-15', '12345678901', 'senha123', 'Ativo', 'Gestor', 'RG1234567'),
(1, '337', 1, 'Valete', 'valete@techsolutions.com', '2002-06-15', '12345678902', 'senha456', 'Ativo', 'Funcionario', 'RG1234568'),
(2, NULL, NULL, 'Guilherme Ornaghi', 'guilherme@vooh.com', '2006-07-16', '12345672222', 'senha123', 'Ativo', 'Suporte', 'RG1254678'),
(2, 'SUP001', NULL, 'Pedro Lima', 'pedro@digitalcorp.com', '1995-08-10', '11122233344', 'senha456', 'Ativo', 'Suporte', 'RG1122334');

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
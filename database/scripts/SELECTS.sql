USE vooh;

/*
	Select para o arquivo
*/

-- Select para realizar a buscar da empresa pelo Mac do display
SELECT e.id, e.nome_empresa, e.urlWEBHOOK 
FROM empresa e 
JOIN display d 
	ON d.fk_empresa = e.id
WHERE d.mac = ?;

-- Select para buscar parametros por empresa
SELECT fk_display, fk_componente, fk_empresa, minimo, maximo 
FROM componente_display 
WHERE fk_empresa = ?;

-- Select para Load Alertas
SELECT d.id AS idDisplay,
	d.fk_empresa AS fkEmpresa,
    c.nome AS nome_componente,
    cd.minimo,
    cd.maximo
FROM display d
LEFT JOIN componente_display cd
	ON d.id = cd.fk_display
LEFT JOIN componente c 
	ON cd.fk_componente = c.id
WHERE d.mac = "";

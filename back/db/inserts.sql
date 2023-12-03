use mydb;

insert into empresa(id, nome) values('1','Grupo World Beauty');

INSERT INTO cpf(valor, dataEmissao) VALUES('11112222333', '1970-01-01 00:00:00.000');
INSERT INTO cpf(valor, dataEmissao) VALUES('11223344556', '1970-01-01 00:00:00.000');
INSERT INTO cpf(valor, dataEmissao) VALUES('12341234123', '1970-01-01 00:00:00.000');
INSERT INTO cpf(valor, dataEmissao) VALUES('12344321555', '1970-01-01 00:00:00.000');
INSERT INTO cpf(valor, dataEmissao) VALUES('12345678901', '1970-01-01 00:00:00.000');
INSERT INTO cpf(valor, dataEmissao) VALUES('12435465768', '2023-11-20 23:07:31.696');
INSERT INTO cpf(valor, dataEmissao) VALUES('1295836284', '1970-01-01 00:00:00.000');
INSERT INTO cpf(valor, dataEmissao) VALUES('13557907423', '1970-01-01 00:00:00.000');
INSERT INTO cpf(valor, dataEmissao) VALUES('22223333444', '1970-01-01 00:00:00.000');
INSERT INTO cpf(valor, dataEmissao) VALUES('23242424232', '1970-01-01 00:00:00.000');
INSERT INTO cpf(valor, dataEmissao) VALUES('33332222111', '1970-01-01 00:00:00.000');
INSERT INTO cpf(valor, dataEmissao) VALUES('38213948603', '1970-01-01 00:00:00.000');
INSERT INTO cpf(valor, dataEmissao) VALUES('43214321432', '1970-01-01 00:00:00.000');
INSERT INTO cpf(valor, dataEmissao) VALUES('44443333222', '1970-01-01 00:00:00.000');
INSERT INTO cpf(valor, dataEmissao) VALUES('44445555666', '1970-01-01 00:00:00.000');
INSERT INTO cpf(valor, dataEmissao) VALUES('4859282135', '1970-01-01 00:00:00.000');
INSERT INTO cpf(valor, dataEmissao) VALUES('55554444333', '1970-01-01 00:00:00.000');
INSERT INTO cpf(valor, dataEmissao) VALUES('55555555555', '1970-01-01 00:00:00.000');
INSERT INTO cpf(valor, dataEmissao) VALUES('66665555777', '1970-01-01 00:00:00.000');
INSERT INTO cpf(valor, dataEmissao) VALUES('66667777888', '1970-01-01 00:00:00.000');
INSERT INTO cpf(valor, dataEmissao) VALUES('77776666555', '1970-01-01 00:00:00.000');
INSERT INTO cpf(valor, dataEmissao) VALUES('77778878999', '1970-01-01 00:00:00.000');
INSERT INTO cpf(valor, dataEmissao) VALUES('78907890789', '1970-01-01 00:00:00.000');
INSERT INTO cpf(valor, dataEmissao) VALUES('88887777666', '1970-01-01 00:00:00.000');
INSERT INTO cpf(valor, dataEmissao) VALUES('89436126490', '1970-01-01 00:00:00.000');
INSERT INTO cpf(valor, dataEmissao) VALUES('93471364134', '1970-01-01 00:00:00.000');
INSERT INTO cpf(valor, dataEmissao) VALUES('93723613130', '1970-01-01 00:00:00.000');
INSERT INTO cpf(valor, dataEmissao) VALUES('98765432100', '1970-01-01 00:00:00.000');
INSERT INTO cpf(valor, dataEmissao) VALUES('98765432101', '1970-01-01 00:00:00.000');
INSERT INTO cpf(valor, dataEmissao) VALUES('99889988998', '1970-01-01 00:00:00.000');

INSERT INTO cliente (id, nome, nomeSocial, genero, cpfValor, telefoneId, dataCadastro, empresaId) VALUES ('1', 'Ana Clara', 'Ana', 'Feminino', '11112222333', '0', '2023-11-20 02:56:45.345', '1');
INSERT INTO cliente (id, nome, nomeSocial, genero, cpfValor, telefoneId, dataCadastro, empresaId) VALUES ('2', 'Aaron Warner', 'Aaron', 'Masculino', '11223344556', '0', '2023-11-20 02:58:01.681', '1');
INSERT INTO cliente (id, nome, nomeSocial, genero, cpfValor, telefoneId, dataCadastro, empresaId) VALUES ('3', 'Audrey Duarte', 'Audrey', 'Feminino', '12341234123', '0', '2023-11-20 02:59:43.162', '1');
INSERT INTO cliente (id, nome, nomeSocial, genero, cpfValor, telefoneId, dataCadastro, empresaId) VALUES ('4', 'Nathan Donelson', 'Nathan', 'Masculino', '12344321555', '0', '2023-11-20 03:00:56.408', '1');
INSERT INTO cliente (id, nome, nomeSocial, genero, cpfValor, telefoneId, dataCadastro, empresaId) VALUES ('5', 'Maria Oliveira', 'Maria', 'Feminino', '12345678901', '0', '2023-11-20 03:02:09.111', '1');
INSERT INTO cliente (id, nome, nomeSocial, genero, cpfValor, telefoneId, dataCadastro, empresaId) VALUES ('6', 'Carlos Pereira', 'Carlos', 'Masculino', '12435465768', '0', '2023-11-20 03:02:59.425', '1');
INSERT INTO cliente (id, nome, nomeSocial, genero, cpfValor, telefoneId, dataCadastro, empresaId) VALUES ('7', 'Laura Souza', 'Laura', 'Feminino', '1295836284', '0', '2023-11-20 03:03:59.844', '1');
INSERT INTO cliente (id, nome, nomeSocial, genero, cpfValor, telefoneId, dataCadastro, empresaId) VALUES ('8', 'Juliette Ferraz', 'Juliette', 'Feminino', '13557907423', '0', '2023-11-20 03:03:59.844', '1');
INSERT INTO cliente (id, nome, nomeSocial, genero, cpfValor, telefoneId, dataCadastro, empresaId) VALUES ('9', 'Juliana Carvalho', 'Juliana', 'Feminino', '22223333444', '0', '2023-11-20 03:06:09.896', '1');
INSERT INTO cliente (id, nome, nomeSocial, genero, cpfValor, telefoneId, dataCadastro, empresaId) VALUES ('10', 'Lucas Fantichelli', 'Lucas', 'Masculino', '23242424232', '0', '2023-11-20 03:07:14.222', '1');
INSERT INTO cliente (id, nome, nomeSocial, genero, cpfValor, telefoneId, dataCadastro, empresaId) VALUES ('11', 'Fernanda Pereira', 'Fernanda', 'Feminino', '33332222111', '0', '2023-11-20 03:08:01.320', '1');
INSERT INTO cliente (id, nome, nomeSocial, genero, cpfValor, telefoneId, dataCadastro, empresaId) VALUES ('12', 'Rafaela Simões', 'Rafaela', 'Feminino', '38213948603', '0', '2023-11-20 03:08:54.846', '1');
INSERT INTO cliente (id, nome, nomeSocial, genero, cpfValor, telefoneId, dataCadastro, empresaId) VALUES ('13', 'Gustavo Santana', 'Gustavo', 'Masculino', '43214321432', '0', '2023-11-20 03:10:03.782', '1');
INSERT INTO cliente (id, nome, nomeSocial, genero, cpfValor, telefoneId, dataCadastro, empresaId) VALUES ('14', 'Amanda Silva', 'Amanda', 'Feminino', '44443333222', '0', '2023-11-20 03:11:27.884', '1');
INSERT INTO cliente (id, nome, nomeSocial, genero, cpfValor, telefoneId, dataCadastro, empresaId) VALUES ('15', 'Daniel Barbosa', 'Daniel', 'Masculino', '44445555666', '0', '2023-11-20 03:13:39.601', '1');
INSERT INTO cliente (id, nome, nomeSocial, genero, cpfValor, telefoneId, dataCadastro, empresaId) VALUES ('16', 'Mariana Albuquerque', 'Mariana', 'Feminino', '4859282135', '0', '2023-11-20 03:14:55.929', '1');
INSERT INTO cliente (id, nome, nomeSocial, genero, cpfValor, telefoneId, dataCadastro, empresaId) VALUES ('17', 'Luciana Marques', 'Luciana', 'Feminino', '55554444333', '0', '2023-11-20 03:16:00.216', '1');
INSERT INTO cliente (id, nome, nomeSocial, genero, cpfValor, telefoneId, dataCadastro, empresaId) VALUES ('18', 'Luiz Sanchez', 'Luiz', 'Masculino', '55555555555', '0', '2023-11-20 03:16:57.260', '1');
INSERT INTO cliente (id, nome, nomeSocial, genero, cpfValor, telefoneId, dataCadastro, empresaId) VALUES ('19', 'Camila Lima', 'Camila', 'Feminino', '66665555777', '0', '2023-11-20 03:18:14.769', '1');
INSERT INTO cliente (id, nome, nomeSocial, genero, cpfValor, telefoneId, dataCadastro, empresaId) VALUES ('20', 'Matheus Medeiros', 'Matheus', 'Masculino', '66667777888', '0', '2023-11-20 03:19:50.167', '1');
INSERT INTO cliente (id, nome, nomeSocial, genero, cpfValor, telefoneId, dataCadastro, empresaId) VALUES ('21', 'Beatriz Cascardo', 'Beatriz', 'Feminino', '77776666555', '0', '2023-11-20 03:20:45.123', '1');
INSERT INTO cliente (id, nome, nomeSocial, genero, cpfValor, telefoneId, dataCadastro, empresaId) VALUES ('22', 'Enzo Marquesini', 'Enzo', 'Masculino', '77778878999', '0', '2023-11-20 03:22:30.821', '1');
INSERT INTO cliente (id, nome, nomeSocial, genero, cpfValor, telefoneId, dataCadastro, empresaId) VALUES ('23', 'Larissa Shiga', 'Larissa', 'Feminino', '78907890789', '0', '2023-11-20 03:24:31.502', '1');
INSERT INTO cliente (id, nome, nomeSocial, genero, cpfValor, telefoneId, dataCadastro, empresaId) VALUES ('24', 'Miguel Fontana', 'Miguel', 'Masculino', '88887777666', '0', '2023-11-20 03:25:44.074', '1');
INSERT INTO cliente (id, nome, nomeSocial, genero, cpfValor, telefoneId, dataCadastro, empresaId) VALUES ('25', 'Isabela Karini', 'Isabela', 'Feminino', '89436126490', '0', '2023-11-20 03:26:58.503', '1');
INSERT INTO cliente (id, nome, nomeSocial, genero, cpfValor, telefoneId, dataCadastro, empresaId) VALUES ('26', 'Nina Vilas Boas', 'Nina', 'Feminino', '93471364134', '0', '2023-11-20 03:28:13.193', '1');
INSERT INTO cliente (id, nome, nomeSocial, genero, cpfValor, telefoneId, dataCadastro, empresaId) VALUES ('27', 'Carolina Alves', 'Carolina', 'Feminino', '93723613130', '0', '2023-11-20 03:30:04.104', '1');
INSERT INTO cliente (id, nome, nomeSocial, genero, cpfValor, telefoneId, dataCadastro, empresaId) VALUES ('28', 'Guilherme Castilho', 'Guilherme', 'Masculino', '98765432100', '0', '2023-11-20 03:32:11.612', '1');
INSERT INTO cliente (id, nome, nomeSocial, genero, cpfValor, telefoneId, dataCadastro, empresaId) VALUES ('29', 'Julia Almeida', 'Julia', 'Feminino', '98765432101', '0', '2023-11-20 03:33:33.333', '1');
INSERT INTO cliente (id, nome, nomeSocial, genero, cpfValor, telefoneId, dataCadastro, empresaId) VALUES ('30', 'Ricardo Lucena', 'Ricardo', 'Masculino', '99889988998', '0', '2023-11-20 03:35:45.409', '1');

INSERT INTO telefone(id, ddd, numero, clienteId) VALUES('1', '12', '132983202', 1);
INSERT INTO telefone(id, ddd, numero, clienteId) VALUES('2', '34', '987654321', 2);
INSERT INTO telefone(id, ddd, numero, clienteId) VALUES('3', '82', '010294052', 2);
INSERT INTO telefone(id, ddd, numero, clienteId) VALUES('4', '11', '999888777', 3);
INSERT INTO telefone(id, ddd, numero, clienteId) VALUES('5', '21', '123456789', 4);
INSERT INTO telefone(id, ddd, numero, clienteId) VALUES('6', '21', '987654321', 4);
INSERT INTO telefone(id, ddd, numero, clienteId) VALUES('7', '31', '777888999', 5);
INSERT INTO telefone(id, ddd, numero, clienteId) VALUES('8', '81', '987654320', 6);
INSERT INTO telefone(id, ddd, numero, clienteId) VALUES('9', '41', '413576879', 7);
INSERT INTO telefone(id, ddd, numero, clienteId) VALUES('10', '51', '241352465', 8);
INSERT INTO telefone(id, ddd, numero, clienteId) VALUES('11', '13', '049213314', 9);
INSERT INTO telefone(id, ddd, numero, clienteId) VALUES('12', '71', '820231843', 10);
INSERT INTO telefone(id, ddd, numero, clienteId) VALUES('13', '61', '132465768', 11);
INSERT INTO telefone(id, ddd, numero, clienteId) VALUES('14', '32', '314658869', 12);
INSERT INTO telefone(id, ddd, numero, clienteId) VALUES('15', '48', '351105693', 13);
INSERT INTO telefone(id, ddd, numero, clienteId) VALUES('16', '58', '967452315', 14);
INSERT INTO telefone(id, ddd, numero, clienteId) VALUES('17', '68', '481246430', 15);
INSERT INTO telefone(id, ddd, numero, clienteId) VALUES('18', '78', '381310324', 16);
INSERT INTO telefone(id, ddd, numero, clienteId) VALUES('19', '88', '317328743', 17);
INSERT INTO telefone(id, ddd, numero, clienteId) VALUES('20', '98', '941473567', 18);
INSERT INTO telefone(id, ddd, numero, clienteId) VALUES('21', '28', '827423610', 19);
INSERT INTO telefone(id, ddd, numero, clienteId) VALUES('22', '38', '397131623', 20);
INSERT INTO telefone(id, ddd, numero, clienteId) VALUES('23', '11', '127236128', 21);
INSERT INTO telefone(id, ddd, numero, clienteId) VALUES('24', '21', '732316397', 22);
INSERT INTO telefone(id, ddd, numero, clienteId) VALUES('25', '31', '232613594', 23);
INSERT INTO telefone(id, ddd, numero, clienteId) VALUES('26', '41', '923531526', 24);
INSERT INTO telefone(id, ddd, numero, clienteId) VALUES('27', '51', '246231739', 25);
INSERT INTO telefone(id, ddd, numero, clienteId) VALUES('28', '61', '249742635', 26);
INSERT INTO telefone(id, ddd, numero, clienteId) VALUES('29', '71', '394723135', 27);
INSERT INTO telefone(id, ddd, numero, clienteId) VALUES('30', '81', '236731329', 28);
INSERT INTO telefone(id, ddd, numero, clienteId) VALUES('31', '91', '302831261', 29);
INSERT INTO telefone(id, ddd, numero, clienteId) VALUES('32', '98', '453423138', 30);

INSERT INTO rg (valor, dataEmissao, clienteId) VALUES 
('0123456789012', '1970-01-01 00:00:00.000', 11),
('0234567890123', '1970-01-01 00:00:00.000', 22),
('1234567890123', '1970-01-01 00:00:00.000', 2),
('1240241483671', '1970-01-01 00:00:00.000', 25),
('1242534766879', '1970-01-01 00:00:00.000', 2),
('1243546576869', '1970-01-01 00:00:00.000', 1),
('1380183344568', '1970-01-01 00:00:00.000', 18),
('1491471248653', '1970-01-01 00:00:00.000', 26),
('1768795244689', '1970-01-01 00:00:00.000', 12),
('2031284926124', '1970-01-01 00:00:00.000', 29),
('2345675901230', '1970-01-01 00:00:00.000', 13),
('2345678901234', '1970-01-01 00:00:00.000', 3),
('3014144755327', '1970-01-01 00:00:00.000', 14),
('3023713125908', '1970-01-01 00:00:00.000', 21),
('3193241460871', '1970-01-01 00:00:00.000', 20),
('3456789012345', '1970-01-01 00:00:00.000', 4),
('3827391631397', '1970-01-01 00:00:00.000', 24),
('3843042371304', '1970-01-01 00:00:00.000', 16),
('4014711734542', '1970-01-01 00:00:00.000', 28),
('4143545983571', '1970-01-01 00:00:00.000', 15),
('4567890123456', '1970-01-01 00:00:00.000', 5),
('5678901234567', '1970-01-01 00:00:00.000', 6),
('5789012345678', '1970-01-01 00:00:00.000', 27),
('6789012345678', '1970-01-01 00:00:00.000', 7),
('7890123456789', '1970-01-01 00:00:00.000', 8),
('8901234567890', '1970-01-01 00:00:00.000', 9),
('8901272531937', '1970-01-01 00:00:00.000', 19),
('9012345678900', '1970-01-01 00:00:00.000', 30),
('9012345678901', '1970-01-01 00:00:00.000', 10),
('9372937138365', '1970-01-01 00:00:00.000', 23),
('9383726130487', '1970-01-01 00:00:00.000', 17);


INSERT INTO produto(id, nome, preco, empresaId, descricao, quantidadeEstoque) VALUES('1', 'Perfume Feminino', 50, '1', 'Fragrância floral suave', 15);
INSERT INTO produto(id, nome, preco, empresaId, descricao, quantidadeEstoque) VALUES('2', 'Perfume Masculino', 45, '1', 'Fragrância amadeirada intensa', 12);
INSERT INTO produto(id, nome, preco, empresaId, descricao, quantidadeEstoque) VALUES('3', 'Batom Matte', 15, '1', 'Batom de longa duração', 25);
INSERT INTO produto(id, nome, preco, empresaId, descricao, quantidadeEstoque) VALUES('4', 'Base Líquida', 30, '1', 'Base de longa duração', 18);
INSERT INTO produto(id, nome, preco, empresaId, descricao, quantidadeEstoque) VALUES('5', 'Pó Compacto', 18, '1', 'Pó para finalização da maquiagem', 20);
INSERT INTO produto(id, nome, preco, empresaId, descricao, quantidadeEstoque) VALUES('6', 'Sombra em Pó', 12, '1', 'Sombra altamente pigmentada', 30);
INSERT INTO produto(id, nome, preco, empresaId, descricao, quantidadeEstoque) VALUES('7', 'Creme Anti-Idade', 12, '1', 'Sombra altamente pigmentada', 30);
INSERT INTO produto(id, nome, preco, empresaId, descricao, quantidadeEstoque) VALUES('8', 'Esmalte Duradouro', 8, '1', 'Esmalte de longa duração', 40);
INSERT INTO produto(id, nome, preco, empresaId, descricao, quantidadeEstoque) VALUES('9', 'Loção Corporal', 20, '1', 'Hidratante corporal', 25);
INSERT INTO produto(id, nome, preco, empresaId, descricao, quantidadeEstoque) VALUES('10', 'Creme para Mãos', 10, '1', 'Hidratação intensa para as mãos', 30);
INSERT INTO produto(id, nome, preco, empresaId, descricao, quantidadeEstoque) VALUES('11', 'Sabonete Facial', 15, '1', 'Sabonete para limpeza facial', 20);
INSERT INTO produto(id, nome, preco, empresaId, descricao, quantidadeEstoque) VALUES('12', 'Sabonete Líquido', 12, '1', 'Sabonete líquido hidratante', 25);
INSERT INTO produto(id, nome, preco, empresaId, descricao, quantidadeEstoque) VALUES('13', 'Gel de Limpeza', 18, '1', 'Gel de limpeza facial', 20);
INSERT INTO produto(id, nome, preco, empresaId, descricao, quantidadeEstoque) VALUES('14', 'Creme para os Olhos', 25, '1', 'Creme para redução de olheiras', 15);
INSERT INTO produto(id, nome, preco, empresaId, descricao, quantidadeEstoque) VALUES('15', 'Perfume Unissex', 40, '1', 'Fragrância suave para ambos os sexos', 10);
INSERT INTO produto(id, nome, preco, empresaId, descricao, quantidadeEstoque) VALUES('16', 'Kit Maquiagem Completo', 80, '1', 'Paleta de maquiagem com diversos produtos', 5);
INSERT INTO produto(id, nome, preco, empresaId, descricao, quantidadeEstoque) VALUES('17', 'Sérum Rejuvenescedor Radiante', 89, '1', 'Ajuda a reduzir a aparência de linhas finas e promove um brilho natural', 50);
INSERT INTO produto(id, nome, preco, empresaId, descricao, quantidadeEstoque) VALUES('18', 'Paleta de Sombras', 65, '1', 'Paleta de sombras com longa duração e alta pigmentação', 35);
INSERT INTO produto(id, nome, preco, empresaId, descricao, quantidadeEstoque) VALUES('19', 'Creme Revitalizante', 120, '1', 'Creme para reduzir sinais de fadiga e restaurar a luminosidade natural', 25);
INSERT INTO produto(id, nome, preco, empresaId, descricao, quantidadeEstoque) VALUES('20', 'Kit Pincéis Profissionais', 99, '1', 'Conjunto de pincéis de alta qualidade para maquiagem profissional', 40);

INSERT INTO servico(id, name, price, empresaId, descricao) VALUES('1', 'Análise de Pele Personalizada', 150, '1', 'Uma consulta individualizada com um dermatologista');
INSERT INTO servico(id, name, price, empresaId, descricao) VALUES('2', 'Maquiagem para Eventos', 250, '1', 'Serviço de maquiagem profissional para ocasiões especiais como casamentos, formaturas ou eventos importantes');
INSERT INTO servico(id, name, price, empresaId, descricao) VALUES('3', 'Tratamento Facial Relaxante', 180, '1', 'Tratamento que utiliza produtos de alta qualidade para nutrir a pele e proporcionar relaxamento');

INSERT INTO produtosconsumidos(id, clienteId, produtoId) VALUES('1', '1', 1);
INSERT INTO produtosconsumidos(id, clienteId, produtoId) VALUES('2', '1', 3);
INSERT INTO produtosconsumidos(id, clienteId, produtoId) VALUES('3', '1', 6);
INSERT INTO produtosconsumidos(id, clienteId, produtoId) VALUES('4', '2', 2);
INSERT INTO produtosconsumidos(id, clienteId, produtoId) VALUES('5', '3', 8);
INSERT INTO produtosconsumidos(id, clienteId, produtoId) VALUES('6', '3', 2);
INSERT INTO produtosconsumidos(id, clienteId, produtoId) VALUES('7', '3', 3);
INSERT INTO produtosconsumidos(id, clienteId, produtoId) VALUES('8', '3', 10);
INSERT INTO produtosconsumidos(id, clienteId, produtoId) VALUES('9', '4', 20);
INSERT INTO produtosconsumidos(id, clienteId, produtoId) VALUES('10', '4', 19);
INSERT INTO produtosconsumidos(id, clienteId, produtoId) VALUES('11', '5', 18);
INSERT INTO produtosconsumidos(id, clienteId, produtoId) VALUES('12', '5', 17);
INSERT INTO produtosconsumidos(id, clienteId, produtoId) VALUES('13', '4', 10);
INSERT INTO produtosconsumidos(id, clienteId, produtoId) VALUES('14', '4', 9);
INSERT INTO produtosconsumidos(id, clienteId, produtoId) VALUES('15', '4', 4);
INSERT INTO produtosconsumidos(id, clienteId, produtoId) VALUES('16', '6', 5);
INSERT INTO produtosconsumidos(id, clienteId, produtoId) VALUES('17', '6', 4);
INSERT INTO produtosconsumidos(id, clienteId, produtoId) VALUES('18', '7', 6);
INSERT INTO produtosconsumidos(id, clienteId, produtoId) VALUES('19', '7', 3);
INSERT INTO produtosconsumidos(id, clienteId, produtoId) VALUES('20', '7', 1);
INSERT INTO produtosconsumidos(id, clienteId, produtoId) VALUES('21', '8', 14);
INSERT INTO produtosconsumidos(id, clienteId, produtoId) VALUES('22', '8', 15);
INSERT INTO produtosconsumidos(id, clienteId, produtoId) VALUES('23', '9', 16);
INSERT INTO produtosconsumidos(id, clienteId, produtoId) VALUES('24', '9', 19);
INSERT INTO produtosconsumidos(id, clienteId, produtoId) VALUES('25', '9', 18);
INSERT INTO produtosconsumidos(id, clienteId, produtoId) VALUES('26', '9', 17);
INSERT INTO produtosconsumidos(id, clienteId, produtoId) VALUES('27', '10', 3);
INSERT INTO produtosconsumidos(id, clienteId, produtoId) VALUES('28', '11', 11);
INSERT INTO produtosconsumidos(id, clienteId, produtoId) VALUES('29', '12', 2);
INSERT INTO produtosconsumidos(id, clienteId, produtoId) VALUES('30', '13', 13);
INSERT INTO produtosconsumidos(id, clienteId, produtoId) VALUES('31', '13', 4);
INSERT INTO produtosconsumidos(id, clienteId, produtoId) VALUES('32', '14', 5);
INSERT INTO produtosconsumidos(id, clienteId, produtoId) VALUES('33', '15', 6);
INSERT INTO produtosconsumidos(id, clienteId, produtoId) VALUES('34', '15', 17);
INSERT INTO produtosconsumidos(id, clienteId, produtoId) VALUES('35', '16', 5);
INSERT INTO produtosconsumidos(id, clienteId, produtoId) VALUES('36', '16', 14);
INSERT INTO produtosconsumidos(id, clienteId, produtoId) VALUES('37', '16', 13);
INSERT INTO produtosconsumidos(id, clienteId, produtoId) VALUES('38', '16', 2);
INSERT INTO produtosconsumidos(id, clienteId, produtoId) VALUES('39', '16', 12);
INSERT INTO produtosconsumidos(id, clienteId, produtoId) VALUES('40', '17', 18);
INSERT INTO produtosconsumidos(id, clienteId, produtoId) VALUES('41', '17', 17);
INSERT INTO produtosconsumidos(id, clienteId, produtoId) VALUES('42', '17', 16);
INSERT INTO produtosconsumidos(id, clienteId, produtoId) VALUES('43', '18', 7);
INSERT INTO produtosconsumidos(id, clienteId, produtoId) VALUES('44', '18', 8);
INSERT INTO produtosconsumidos(id, clienteId, produtoId) VALUES('45', '18', 9);
INSERT INTO produtosconsumidos(id, clienteId, produtoId) VALUES('46', '22', 9);
INSERT INTO produtosconsumidos(id, clienteId, produtoId) VALUES('47', '22', 1);
INSERT INTO produtosconsumidos(id, clienteId, produtoId) VALUES('48', '22', 2);
INSERT INTO produtosconsumidos(id, clienteId, produtoId) VALUES('49', '23', 3);
INSERT INTO produtosconsumidos(id, clienteId, produtoId) VALUES('50', '24', 13);
INSERT INTO produtosconsumidos(id, clienteId, produtoId) VALUES('51', '24', 4);
INSERT INTO produtosconsumidos(id, clienteId, produtoId) VALUES('52', '27', 14);
INSERT INTO produtosconsumidos(id, clienteId, produtoId) VALUES('53', '27', 5);
INSERT INTO produtosconsumidos(id, clienteId, produtoId) VALUES('54', '27', 16);
INSERT INTO produtosconsumidos(id, clienteId, produtoId) VALUES('55', '28', 8);
INSERT INTO produtosconsumidos(id, clienteId, produtoId) VALUES('56', '30', 8);

INSERT INTO servicosconsumidos(id, clienteId, servicoId) VALUES('1', '19', 1);
INSERT INTO servicosconsumidos(id, clienteId, servicoId) VALUES('2', '20', 2);
INSERT INTO servicosconsumidos(id, clienteId, servicoId) VALUES('3', '21', 3);
INSERT INTO servicosconsumidos(id, clienteId, servicoId) VALUES('4', '25', 2);
INSERT INTO servicosconsumidos(id, clienteId, servicoId) VALUES('5', '26', 3);
INSERT INTO servicosconsumidos(id, clienteId, servicoId) VALUES('6', '29', 1);
INSERT INTO servicosconsumidos(id, clienteId, servicoId) VALUES('7', '19', 3);
INSERT INTO servicosconsumidos(id, clienteId, servicoId) VALUES('8', '21', 2);
INSERT INTO servicosconsumidos(id, clienteId, servicoId) VALUES('9', '26', 2);
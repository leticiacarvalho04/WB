import Cliente from "../modelo/clientes/cliente";
import CPF from "../modelo/clientes/cpf";
import { Genero } from "../modelo/clientes/genero";
import RG from "../modelo/clientes/rg";
import Telefone from "../modelo/clientes/telefone";
import Empresa from "../modelo/empresa";
import ListarMaisConsumidos from "../negocio/listagens/listagemMaisConsumidos";
import listaDeProdutos from "./insertProduto";

// Suponha que você já tenha uma lista de clientes
const listaDeClientes: Array<Cliente> = [];
const empresa = new Empresa

const cpf1 = new CPF("12345678901", new Date(2000, 10, 1));
const rg1 = new RG('1243546576869',new Date(2004,2,19))
const cliente1 = new Cliente("Ana Clara", "Clara", cpf1,Genero.Feminino,rg1);
const telefone = new Telefone('12','13298320248')
const produto1 = listaDeProdutos[0]; // adicionando o produto consumido ao cliente
const produto2 = listaDeProdutos[2]
const produto3 = listaDeProdutos[5]
cliente1.adicionarProdutoConsumido(produto1);
cliente1.adicionarProdutoConsumido(produto2)
cliente1.adicionarProdutoConsumido(produto3)
cliente1.getRgs.push(rg1);
cliente1.adicionarTelefone(telefone)
//cliente1.adicionarServicosConsumidos(empresa.getServicos[0]);

const cpf2 = new CPF('1295836284', new Date(2002, 12, 8));
const rg2 = new RG('1234567890123', new Date(2002, 12, 8));
const telefone2 = new Telefone('34', '987654321');
const cliente2 = new Cliente('Park Sunghoon', 'Sunghoon', cpf2,Genero.Masculino,rg2);
const produto4 = listaDeProdutos[1];
cliente2.adicionarProdutoConsumido(produto4)
cliente2.getRgs.push(rg2);
cliente2.adicionarTelefone(telefone2);

const cpf3 = new CPF('4859282135', new Date(1975, 5, 15));
const rg3 = new RG('2345678901234', new Date(1975, 5, 15));
const telefone3_1 = new Telefone('11', '999888777');
const cliente3 = new Cliente('Audrey Duarte', 'Audrey', cpf3,Genero.Feminino,rg3);
const produto5 = listaDeProdutos[7]
const produto8 = listaDeProdutos[1]
const produto9 = listaDeProdutos[2]
const produto10 = listaDeProdutos[9]
cliente3.adicionarProdutoConsumido(produto5)
cliente3.adicionarProdutoConsumido(produto8)
cliente3.adicionarProdutoConsumido(produto9)
cliente3.adicionarProdutoConsumido(produto10)
cliente3.getRgs.push(rg3);
cliente3.adicionarTelefone(telefone3_1);

const cpf4 = new CPF('98765432100', new Date(1988, 7, 22));
const rg4 = new RG('3456789012345', new Date(1988, 7, 22));
const telefone4_1 = new Telefone('21', '987654321');
const telefone4_2 = new Telefone('21', '123456789');
const cliente4 = new Cliente('João Silva', 'João', cpf4,Genero.Masculino,rg4);
const produto6 = listaDeProdutos[30];
const produto7 = listaDeProdutos[29];
cliente4.adicionarProdutoConsumido(produto6)
cliente4.adicionarProdutoConsumido(produto7)
cliente4.getRgs.push(rg4);
cliente4.adicionarTelefone(telefone4_1);
cliente4.adicionarTelefone(telefone4_2);

const cpf5 = new CPF('55555555555', new Date(1999, 3, 30));
const rg5 = new RG('4567890123456', new Date(1999, 3, 30));
const telefone5_1 = new Telefone('31', '999888777');
const telefone5_2 = new Telefone('31', '777888999');
const cliente5 = new Cliente('Maria Oliveira', 'Maria', cpf5,Genero.Feminino,rg5);
const produto11 = listaDeProdutos[28];
const produto12 = listaDeProdutos[27];
const produto13 = listaDeProdutos[20];
const produto14 = listaDeProdutos[19];
const produto15 = listaDeProdutos[14];
cliente5.adicionarProdutoConsumido(produto11);
cliente5.adicionarProdutoConsumido(produto12)
cliente5.adicionarProdutoConsumido(produto13)
cliente5.adicionarProdutoConsumido(produto14)
cliente5.adicionarProdutoConsumido(produto15)
cliente5.adicionarTelefone(telefone5_1);
cliente5.adicionarTelefone(telefone5_2);
cliente5.getRgs.push(rg5);

const cpf6 = new CPF('11112222333', new Date(1973, 9, 17));
const rg6 = new RG('5678901234567', new Date(1973, 9, 17));
const telefone6_1 = new Telefone('81', '987654321');
const telefone6_2 = new Telefone('81', '123456789');
const cliente6 = new Cliente('Carlos Pereira', 'Carlos', cpf6,Genero.Masculino,rg6);
const produto16 = listaDeProdutos[25];
const produto17 = listaDeProdutos[24];
cliente6.adicionarProdutoConsumido(produto16)
cliente6.adicionarProdutoConsumido(produto17)
cliente6.adicionarTelefone(telefone6_1);
cliente6.adicionarTelefone(telefone6_2);
cliente6.getRgs.push(rg6);

const cpf7 = new CPF('77778888999', new Date(2005, 1, 5));
const rg7 = new RG('6789012345678', new Date(2005, 1, 5));
const telefone7_1 = new Telefone('41', '987654321');
const telefone7_2 = new Telefone('41', '123456789');
const cliente7 = new Cliente('Laura Souza', 'Laura', cpf7,Genero.Feminino,rg7);
const produto18 = listaDeProdutos[26];
const produto19 = listaDeProdutos[23];
const produto20 = listaDeProdutos[21];
cliente7.adicionarProdutoConsumido(produto18)
cliente7.adicionarProdutoConsumido(produto19)
cliente7.adicionarProdutoConsumido(produto20)
cliente7.adicionarTelefone(telefone7_1);
cliente7.adicionarTelefone(telefone7_2);
cliente7.getRgs.push(rg7);

const cpf8 = new CPF('88887777666', new Date(1990, 11, 25));
const rg8 = new RG('7890123456789', new Date(1990, 11, 25));
const telefone8_1 = new Telefone('51', '999888777');
const telefone8_2 = new Telefone('51', '777888999');
const cliente8 = new Cliente('Pedro Santos', 'Pedro', cpf8,Genero.Masculino,rg8);
const produto26 = listaDeProdutos[24];
const produto27 = listaDeProdutos[25];
cliente8.adicionarProdutoConsumido(produto26);
cliente8.adicionarProdutoConsumido(produto27);
cliente8.adicionarTelefone(telefone8_1);
cliente8.adicionarTelefone(telefone8_2);
cliente8.getRgs.push(rg8);

const cpf9 = new CPF('22223333444', new Date(1985, 4, 8));
const rg9 = new RG('8901234567890', new Date(1985, 4, 8));
const cliente9 = new Cliente('Juliana Oliveira', 'Juliana', cpf9,Genero.Feminino,rg9);
const produto28 = listaDeProdutos[26];
const produto29 = listaDeProdutos[27];
const produto30 = listaDeProdutos[28];
const produto31 = listaDeProdutos[29];
cliente9.adicionarProdutoConsumido(produto28);
cliente9.adicionarProdutoConsumido(produto29)
cliente9.adicionarProdutoConsumido(produto30)
cliente9.adicionarProdutoConsumido(produto31)
cliente9.getRgs.push(rg9);

const cpf10 = new CPF('33332222111', new Date(2000, 2, 12));
const rg10 = new RG('9012345678901', new Date(2000, 2, 12));
const telefone9_1 = new Telefone('71', '987654321');
const telefone9_2 = new Telefone('71', '123456789');
const cliente10 = new Cliente('Lucas Silva', 'Lucas', cpf10,Genero.Masculino,rg10);
const produto32 = listaDeProdutos[30];
cliente10.adicionarProdutoConsumido(produto32);
cliente9.adicionarTelefone(telefone9_1);
cliente9.adicionarTelefone(telefone9_2);
cliente10.getRgs.push(rg10);

const cpf11 = new CPF('44443333222', new Date(1977, 8, 3));
const rg11 = new RG('0123456789012', new Date(1977, 8, 3));
const telefone11_1 = new Telefone('61', '987654321');
const telefone11_2 = new Telefone('61', '123456789');
const cliente11 = new Cliente('Fernanda Pereira', 'Fernanda', cpf11,Genero.Feminino,rg11);
const produto33 = listaDeProdutos[11];
cliente11.adicionarProdutoConsumido(produto33);
cliente11.adicionarTelefone(telefone11_1);
cliente11.adicionarTelefone(telefone11_2);
cliente11.getRgs.push(rg11);

const cpf12 = new CPF('99998888777', new Date(1993, 6, 18));
const rg12 = new RG('1234567890123', new Date(2002, 12, 8));
const telefone12_1 = new Telefone('32', '999888777');
const telefone12_2 = new Telefone('32', '777888999');
const cliente12 = new Cliente('Rafaela Oliveira', 'Rafaela', cpf12,Genero.Feminino,rg12);
const produto34 = listaDeProdutos[22];
cliente10.adicionarProdutoConsumido(produto34);
cliente12.adicionarTelefone(telefone12_1);
cliente12.adicionarTelefone(telefone12_2);
cliente12.getRgs.push(rg12);

const cpf13 = new CPF('77776666555', new Date(2001, 10, 30));
const rg13 = new RG('2345678901234', new Date(1975, 5, 15));
const telefone13_1 = new Telefone('48', '987654321');
const telefone13_2 = new Telefone('48', '123456789');
const cliente13 = new Cliente('Gustavo Souza', 'Gustavo', cpf13,Genero.Masculino,rg13);
const produto35 = listaDeProdutos[23];
const produto36 = listaDeProdutos[24];
cliente13.adicionarProdutoConsumido(produto35);
cliente13.adicionarProdutoConsumido(produto36);
cliente13.adicionarTelefone(telefone13_1);
cliente13.adicionarTelefone(telefone13_2);
cliente13.getRgs.push(rg13);

const cpf14 = new CPF('55554444333', new Date(1982, 2, 9));
const rg14 = new RG('3456789012345', new Date(1988, 7, 22));
const telefone14_1 = new Telefone('58', '999888777');
const telefone14_2 = new Telefone('58', '777888999');
const cliente14 = new Cliente('Amanda Silva', 'Amanda', cpf14,Genero.Feminino,rg14);
const produto37 = listaDeProdutos[5];
cliente14.adicionarProdutoConsumido(produto37);
cliente14.adicionarTelefone(telefone14_1);
cliente14.adicionarTelefone(telefone14_2);
cliente14.getRgs.push(rg14);

const cpf15 = new CPF('11112222333', new Date(1995, 7, 21));
const rg15 = new RG('4567890123456', new Date(1999, 3, 30));
const telefone15 = new Telefone('68', '987654321');
const cliente15 = new Cliente('Daniel Pereira', 'Daniel', cpf15,Genero.Masculino,rg15);
const produto38 = listaDeProdutos[6];
const produto39 = listaDeProdutos[7];
cliente15.adicionarProdutoConsumido(produto38)
cliente15.adicionarProdutoConsumido(produto39)
cliente15.adicionarTelefone(telefone15);
cliente15.getRgs.push(rg15);

const cpf16 = new CPF('88889999888', new Date(1979, 1, 14));
const rg16 = new RG('5678901234567', new Date(1973, 9, 17));
const telefone16 = new Telefone('78', '999888777');
const cliente16 = new Cliente('Mariana Santos', 'Mariana', cpf16,Genero.Feminino,rg16);
const produto40 = listaDeProdutos[25];
const produto41 = listaDeProdutos[24];
const produto42 = listaDeProdutos[23];
const produto43 = listaDeProdutos[22];
const produto44 = listaDeProdutos[21];
cliente16.adicionarProdutoConsumido(produto40);
cliente16.adicionarProdutoConsumido(produto42)
cliente16.adicionarProdutoConsumido(produto43)
cliente16.adicionarProdutoConsumido(produto44)
cliente16.adicionarProdutoConsumido(produto41)
cliente16.adicionarTelefone(telefone16);
cliente16.getRgs.push(rg16);

const cpf17 = new CPF('66665555777', new Date(1998, 5, 7));
const rg17 = new RG('6789012345678', new Date(2005, 1, 5));
const telefone17 = new Telefone('88', '987654321');
const cliente17 = new Cliente('Luciana Oliveira', 'Luciana', cpf17,Genero.Masculino,rg17);
const produto45 = listaDeProdutos[18];
const produto46 = listaDeProdutos[17];
const produto47 = listaDeProdutos[16];
cliente17.adicionarProdutoConsumido(produto45);
cliente17.adicionarProdutoConsumido(produto46)
cliente17.adicionarProdutoConsumido(produto47)
cliente17.adicionarTelefone(telefone17);
cliente17.getRgs.push(rg17);

const cpf18 = new CPF('12341234123', new Date(1992, 3, 15));
const rg18 = new RG('7890123456789', new Date(1990, 11, 25));
const telefone18 = new Telefone('98', '777888999');
const cliente18 = new Cliente('Luiz Oliveira', 'Luiz', cpf18,Genero.Masculino,rg18);
const produto48 = listaDeProdutos[27];
const produto49 = listaDeProdutos[8];
const produto50 = listaDeProdutos[19];
cliente18.adicionarProdutoConsumido(produto48);
cliente18.adicionarProdutoConsumido(produto49)
cliente18.adicionarProdutoConsumido(produto50)
cliente18.adicionarTelefone(telefone18);
cliente18.getRgs.push(rg18);

const cpf19 = new CPF('78907890789', new Date(1987, 11, 7));
const rg19 = new RG('8901234567890', new Date(1985, 4, 8));
const telefone19 = new Telefone('28', '123456789');
const cliente19 = new Cliente('Camila Souza', 'Camila', cpf19,Genero.Feminino,rg19);
cliente19.adicionarTelefone(telefone19);
cliente19.getRgs.push(rg19);

const cpf20 = new CPF('55556666777', new Date(1996, 2, 28));
const rg20 = new RG('9012345678901', new Date(2000, 2, 12));
const telefone20_1 = new Telefone('38', '999888777');
const telefone20_2 = new Telefone('38', '777888999');
const cliente20 = new Cliente('Mateus Silva', 'Mateus', cpf20,Genero.Masculino,rg20);
cliente20.adicionarTelefone(telefone20_1);
cliente20.adicionarTelefone(telefone20_2);
cliente20.getRgs.push(rg20);

const cpf21 = new CPF('43214321432', new Date(1980, 9, 22));
const rg21 = new RG('0123456789012', new Date(1977, 8, 3));
const telefone21_1 = new Telefone('11', '987654321');
const telefone21_2 = new Telefone('11', '123456789');
const cliente21 = new Cliente('Beatriz Pereira', 'Beatriz', cpf21,Genero.Feminino,rg21);
cliente21.adicionarTelefone(telefone21_1);
cliente21.adicionarTelefone(telefone21_2);
cliente21.getRgs.push(rg21);

const cpf22 = new CPF('99889988998', new Date(2004, 5, 10));
const rg22 = new RG('1234567890123', new Date(2002, 12, 8));
const telefone22_1 = new Telefone('21', '999888777');
const telefone22_2 = new Telefone('21', '777888999');
const cliente22 = new Cliente('Enzo Oliveira', 'Enzo', cpf22,Genero.Masculino,rg22);
const produto60 = listaDeProdutos[9];
const produto61 = listaDeProdutos[0];
const produto62 = listaDeProdutos[1];
cliente22.adicionarProdutoConsumido(produto60);
cliente22.adicionarProdutoConsumido(produto61)
cliente22.adicionarProdutoConsumido(produto62)
cliente22.adicionarTelefone(telefone22_1);
cliente22.adicionarTelefone(telefone22_2);
cliente22.getRgs.push(rg22);

const cpf23 = new CPF('77778888999', new Date(1973, 8, 2));
const rg23 = new RG('2345678901234', new Date(1975, 5, 15));
const telefone23_1 = new Telefone('31', '987654321');
const telefone23_2 = new Telefone('31', '123456789');
const cliente23 = new Cliente('Larissa Silva', 'Larissa', cpf23,Genero.Feminino,rg23);
cliente23.adicionarTelefone(telefone23_1);
cliente23.adicionarTelefone(telefone23_2);
const produto63 = listaDeProdutos[2];
cliente23.adicionarProdutoConsumido(produto63);
cliente23.getRgs.push(rg23);

const cpf24 = new CPF('44445555666', new Date(1989, 12, 11));
const rg24 = new RG('3456789012345', new Date(1988, 7, 22));
const telefone24_1 = new Telefone('41', '999888777');
const telefone24_2 = new Telefone('41', '777888999');
const cliente24 = new Cliente('Lucas Pereira', 'Lucas', cpf24,Genero.Masculino,rg24);
const produto64 = listaDeProdutos[23];
const produto65 = listaDeProdutos[4];
cliente24.adicionarProdutoConsumido(produto64)
cliente24.adicionarProdutoConsumido(produto65)
cliente24.adicionarTelefone(telefone24_1);
cliente24.adicionarTelefone(telefone24_2);
cliente24.getRgs.push(rg24);

const cpf25 = new CPF('66667777888', new Date(2003, 4, 6));
const rg25 = new RG('4567890123456', new Date(1999, 3, 30));
const telefone25_1 = new Telefone('51', '987654321');
const telefone25_2 = new Telefone('51', '123456789');
const cliente25 = new Cliente('Isabela Oliveira', 'Isabela', cpf25,Genero.Feminino,rg25);
cliente25.adicionarTelefone(telefone25_1);
cliente25.adicionarTelefone(telefone25_2);
cliente25.getRgs.push(rg25);

const cpf26 = new CPF('11223344556', new Date(1976, 10, 17));
const rg26 = new RG('5678901234567', new Date(1973, 9, 17));
const telefone26_1 = new Telefone('61', '999888777');
const telefone26_2 = new Telefone('61', '777888999');
const cliente26 = new Cliente('Carlos Souza', 'Carlos', cpf26,Genero.Masculino,rg26);
cliente26.adicionarTelefone(telefone26_1);
cliente26.adicionarTelefone(telefone26_2);
cliente26.getRgs.push(rg26);

const cpf27 = new CPF('98765432100', new Date(1998, 1, 31));
const rg27 = new RG('6789012345678', new Date(2005, 1, 5));
const telefone27_1 = new Telefone('71', '987654321');
const telefone27_2 = new Telefone('71', '123456789');
const cliente27 = new Cliente('Carolina Silva', 'Carolina', cpf27,Genero.Feminino,rg27);
const produto66 = listaDeProdutos[14];
const produto67 = listaDeProdutos[5];
const produto68 = listaDeProdutos[26];
cliente27.adicionarProdutoConsumido(produto66);
cliente27.adicionarProdutoConsumido(produto67)
cliente27.adicionarProdutoConsumido(produto68)
cliente27.adicionarTelefone(telefone27_1);
cliente27.adicionarTelefone(telefone27_2);
cliente27.getRgs.push(rg27);

const cpf28 = new CPF('77776666555', new Date(1984, 7, 25));
const rg28 = new RG('7890123456789', new Date(1990, 11, 25));
const telefone28_1 = new Telefone('81', '999888777');
const telefone28_2 = new Telefone('81', '777888999');
const cliente28 = new Cliente('Guilherme Oliveira', 'Guilherme', cpf28,Genero.Masculino,rg28);
const produto69 = listaDeProdutos[28];
cliente28.adicionarProdutoConsumido(produto69)
cliente28.adicionarTelefone(telefone28_1);
cliente28.adicionarTelefone(telefone28_2);
cliente28.getRgs.push(rg28);

const cpf29 = new CPF('55554444333', new Date(1991, 3, 19));
const rg29 = new RG('8901234567890', new Date(1985, 4, 8));
const telefone29_1 = new Telefone('91', '987654321');
const telefone29_2 = new Telefone('91', '123456789');
const cliente29 = new Cliente('Julia Silva', 'Julia', cpf29,Genero.Feminino,rg29);
cliente29.adicionarTelefone(telefone29_1);
cliente29.adicionarTelefone(telefone29_2);
cliente29.getRgs.push(rg29);

const cpf30 = new CPF('12344321555', new Date(1972, 6, 13));
const rg30 = new RG('9012345678901', new Date(2000, 2, 12));
const telefone30_1 = new Telefone('98', '999888777');
const telefone30_2 = new Telefone('98', '777888999');
const cliente30 = new Cliente('Ricardo Pereira', 'Ricardo', cpf30,Genero.Masculino,rg30);
const produto70 = listaDeProdutos[8];
cliente30.adicionarProdutoConsumido(produto70)
cliente30.adicionarTelefone(telefone30_1);
cliente30.adicionarTelefone(telefone30_2);
cliente30.getRgs.push(rg30);

// Adicione os clientes à lista
listaDeClientes.push(cliente1, cliente2, cliente3, cliente4, cliente5, cliente6, cliente7, cliente8, cliente9, cliente10, cliente11, cliente12, cliente13, cliente14,
    cliente15, cliente16, cliente17, cliente18, cliente19, cliente20, cliente21, cliente22, cliente23, cliente24,
    cliente25, cliente26, cliente27, cliente28, cliente29, cliente30);

export default listaDeClientes;
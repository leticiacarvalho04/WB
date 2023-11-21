create database mydb;
use mydb;

CREATE TABLE Empresa (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(255)
);

CREATE TABLE Cliente (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(255),
  nomeSocial VARCHAR(255),
  genero VARCHAR(255),
  cpfValor VARCHAR(255) UNIQUE,
  telefoneId INT,
  dataCadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  empresaId INT,
  FOREIGN KEY (cpfValor) REFERENCES CPF(valor),
  FOREIGN KEY (telefoneId) REFERENCES telefone(id),
  FOREIGN KEY (empresaId) REFERENCES Empresa(id)
);

CREATE TABLE telefone (
  id INT PRIMARY KEY AUTO_INCREMENT,
  ddd VARCHAR(255),
  numero VARCHAR(255),
  clienteId INT,
  FOREIGN KEY (clienteId) REFERENCES Cliente(id)
);

CREATE TABLE RG (
  valor VARCHAR(255) PRIMARY KEY,
  dataEmissao date,
  clienteId INT,
  FOREIGN KEY (clienteId) REFERENCES Cliente(id)
);

CREATE TABLE CPF (
  valor VARCHAR(255) PRIMARY KEY,
  dataEmissao date
);

CREATE TABLE Produto (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(255) UNIQUE,
  descricao VARCHAR(255),
  preco INT DEFAULT 30,
  quantidadeEstoque INT DEFAULT 0,
  empresaId INT,
  FOREIGN KEY (empresaId) REFERENCES Empresa(id)
);

CREATE TABLE produtosConsumidos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  clienteId INT,
  produtoId INT,
  FOREIGN KEY (clienteId) REFERENCES Cliente(id),
  FOREIGN KEY (produtoId) REFERENCES Produto(id)
);

CREATE TABLE Servico (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) UNIQUE,
  price INT,
  descricao VARCHAR(255),
  empresaId INT,
  FOREIGN KEY (empresaId) REFERENCES Empresa(id)
);

CREATE TABLE servicosConsumidos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  clienteId INT,
  servicoId INT,
  FOREIGN KEY (clienteId) REFERENCES Cliente(id),
  FOREIGN KEY (servicoId) REFERENCES Servico(id)
);

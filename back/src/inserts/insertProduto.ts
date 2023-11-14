import Produto from "../modelo/produto-servico/produto";

const listaDeProdutos = [];

const produto1 = new Produto('Perfume Feminino', 'Fragrância floral suave', 50.00, 15);
const produto2 = new Produto('Perfume Masculino', 'Fragrância amadeirada intensa', 45.00, 12);
const produto3 = new Produto('Batom Matte', 'Batom de longa duração', 15.00, 25);
const produto4 = new Produto('Base Líquida', 'Base de alta cobertura', 30.00, 18);
const produto5 = new Produto('Pó Compacto', 'Pó para finalização da maquiagem', 18.00, 20);
const produto6 = new Produto('Sombra em Pó', 'Sombra altamente pigmentada', 12.00, 30);
const produto7 = new Produto('Creme Anti-Idade', 'Creme para redução de rugas', 35.00, 10);
const produto8 = new Produto('Esmalte Duradouro', 'Esmalte de longa duração', 8.00, 40);
const produto9 = new Produto('Loção Corporal', 'Hidratante corporal', 20.00, 25);
const produto10 = new Produto('Creme para as Mãos', 'Hidratação intensa para mãos', 10.00, 30);
const produto11 = new Produto('Escova de Dentes Elétrica', 'Escova elétrica com sensor de pressão', 40.00, 8);
const produto12 = new Produto('Fio Dental', 'Fio dental com flúor', 5.00, 50);
const produto13 = new Produto('Creme Dental Branqueador', 'Creme dental para dentes mais brancos', 7.00, 40);
const produto14 = new Produto('Sabonete Facial', 'Sabonete para limpeza facial', 15.00, 20);
const produto15 = new Produto('Desodorante Roll-On', 'Desodorante antitranspirante', 10.00, 30);
const produto16 = new Produto('Sabonete Líquido', 'Sabonete líquido hidratante', 12.00, 25);
const produto17 = new Produto('Gel de Limpeza', 'Gel de limpeza facial', 18.00, 20);
const produto18 = new Produto('Creme para os Olhos', 'Creme para redução de olheiras', 25.00, 15);
const produto19 = new Produto('Perfume Unissex', 'Fragrância suave para ambos os sexos', 40.00, 10);
const produto20 = new Produto('Kit Maquiagem Completo', 'Paleta de maquiagem com diversos produtos', 80.00, 5);

listaDeProdutos.push(
  produto1, produto2, produto3, produto4, produto5, produto6, produto7,
  produto8, produto9, produto10, produto11, produto12, produto13, produto14,
  produto15, produto16, produto17, produto18, produto19, produto20
);

export default listaDeProdutos;
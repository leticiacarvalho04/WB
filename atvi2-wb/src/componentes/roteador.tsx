import { BrowserRouter, Routes, Route } from "react-router-dom";
import BarraNavegacao from "./barraNavegacao";
import FormularioCadastroCliente from "./clientes/formularioCadastroCliente";
import ListaCliente from "./home";
import FormularioCadastroProduto from "./produtos_servicos/formCadastroProdutoServico";
import ProdutoDetails from "./produtos_servicos/atualizarDeletarProduto";
import Servicos from "./produtos_servicos/atualizarDeletarServico";
import Compra from "./compra";
import Home from "./home";
import Clientes from "./clientes/clientes";

export function AppRoutes() {
    return (
        <BrowserRouter>
            <div>
                <BarraNavegacao tema="purple darken-2 deep-purple lighten-2" botoes={[
                    { nome: 'Home', rota: '/'},
                    { nome: 'Clientes', rota: "/clientes" },
                    { nome: 'Produtos', rota: "/produtos" },
                    { nome: 'Serviços', rota:'/servicos'},
                    { nome: 'Cadastro de Clientes', rota: "/cadastrocliente" },
                    { nome: 'Cadastro de Produtos & Serviços', rota: "/cadastroprodserv" },
                    { nome: 'Compra cliente', rota:'/compraCliente'}
                ]} seletorView={() => {}} />
                <Routes>
                    <Route path="/" element={<Home tema="purple darken-2" />} />
                    <Route path="/clientes" element={<Clientes />} />
                    <Route path="/produtos" element={<ProdutoDetails tema="purple darken-2" id={""} />} />
                    <Route path="/servicos" element={<Servicos id={""} tema={""} />} />
                    <Route path="/cadastroprodserv" element={<FormularioCadastroProduto tema="purple darken-2" />} />
                    <Route path="/cadastrocliente" element={<FormularioCadastroCliente tema="purple darken-2" />} />
                    <Route path="/compraCliente" element={<Compra id={""} cpf={""} tema={""} />}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}
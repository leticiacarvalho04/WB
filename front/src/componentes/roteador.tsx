import { BrowserRouter, Routes, Route } from "react-router-dom";
import BarraNavegacao from "./barraNavegacao";
import FormularioCadastroCliente from "./clientes/formularioCadastroCliente";
import FormularioCadastroProduto from "./produtos_servicos/formCadastroProdutoServico";
import ProdutoDetails from "./produtos_servicos/atualizarDeletarProduto";
import Servicos from "./produtos_servicos/atualizarDeletarServico";
import Compra from "./compra";
import Home from "./home";
import Clientes from "./clientes/clientes";
import React from "react";
import FormularioAtualizacaoCliente from "./clientes/formularioAtualizar";
import Listagem from "./listagem";
import FormularioAtualizacaoProduto from "./produtos_servicos/formAtualizaProduto";
import FormularioAtualizacaoServicos from "./produtos_servicos/formAtualizaServico";
import ClienteDetails from "./clientes/atualizarDeletarCli";

export function AppRoutes() {
    return (
        <BrowserRouter>
            <div>
                <BarraNavegacao tema="purple darken-2 deep-purple lighten-2" botoes={[
                    { nome: 'Home', rota: '/'},
                    { nome: 'Clientes', rota: "/clientes" },
                    { nome: 'Atualizar/Deletar Cliente', rota: '/atualizaDeletaCli'},
                    { nome: 'Produtos', rota: "/produtos" },
                    { nome: 'Serviços', rota:'/servicos'},
                    { nome: 'Cadastro de Clientes', rota: "/cadastrocliente" },
                    { nome: 'Cadastro de Produtos & Serviços', rota: "/cadastroprodserv" },
                    { nome: 'Compra cliente', rota:'/compraCliente'},
                    { nome: 'Listagem', rota:'/listagem'}
                ]} seletorView={() => {}} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/clientes" element={<Clientes />} />
                    <Route path="/atualizaDeletaCli" element={<ClienteDetails />} />
                    <Route path="/produtos" element={<ProdutoDetails />} />
                    <Route path="/servicos" element={<Servicos />} />
                    <Route path="/cadastroprodserv" element={<FormularioCadastroProduto />} />
                    <Route path="/cadastrocliente" element={<FormularioCadastroCliente />} />
                    <Route path="/compraCliente" element={<Compra />}/>
                    <Route path="/listagem" element={<Listagem />}/>
                    <Route path="/atualizacaoCliente/cpf/:cpf" element={<FormularioAtualizacaoCliente />} />
                    <Route path="/atualizacaoProduto/id/:id" element={<FormularioAtualizacaoProduto />} />
                    <Route path="/atualizacaoServico/id/:id" element={<FormularioAtualizacaoServicos />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}
import { Component } from "react";
import 'materialize-css/dist/css/materialize.min.css';
import './home.css'

type Props = {
    tema: string;
};

export default class Home extends Component<Props> {
    componentDidMount() {
        const tabs = document.querySelectorAll('.tabs');
        M.Tabs.init(tabs);
    }
    render() {
        let estilo = `collection-item active ${this.props.tema}`;
        return (
            <>
            <div className="cards-container">
            <div className="row center-align">
                <div className="">
                    <div className="card medium">
                        <div className="card-content">
                            <span className="card-title">Clientes Mais Consumidores</span>
                            <ul className="collection">
                                <li className="collection-item">Maria Oliveira</li>
                                <li className="collection-item">Mariana Santos</li>
                                <li className="collection-item">Audrey Duarte</li>
                                <li className="collection-item">Juliana Oliveira</li>
                                <li className="collection-item">Ana Clara</li>
                            </ul>
                            <p><a href="#">Visualizar a lista completa</a></p>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="card">
                        <div className="card-content">
                            <span className="card-title">Clientes que Mais Gastaram</span>
                            <ul className="collection">
                                <li className="collection-item">Enzo Oliveira: R$ 105.00</li>
                                <li className="collection-item">Luiz Oliveira: R$ 100.00</li>
                                <li className="collection-item">Maria Oliveira: R$ 90.00</li>
                                <li className="collection-item">Luciana Oliveira: R$ 83.00</li>
                                <li className="collection-item">Audrey Duarte: R$ 78.00</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row center-align">
                    <div className="">
                        <div className="card medium">
                            <div className="card-content">
                                <div className="row">
                                    <span className="card-title">Produtos e serviços Mais Consumidos</span>
                                    <div className="card-tabs">
                                        <ul className="tabs tabs-fixed-width">
                                            <li className="tab"><a href="#produtos">Produtos</a></li>
                                            <li className="tab"><a href="#servicos">Serviços</a></li>
                                        </ul>
                                    </div>
                                
                                    <div id="produtos">
                                        <ul className="collection">
                                            <li className="collection-item">Perfume Feminino: 2 unidades</li>
                                            <li className="collection-item">Batom Matte: 3 unidades</li>
                                            <li className="collection-item">Sombra em Pó: 3 unidades</li>
                                            <li className="collection-item">Perfume Masculino: 3 unidades</li>
                                            <li className="collection-item">Esmalte Duradouro: 2 unidades</li>
                                        </ul>
                                        <p><a href="#">Visualizar a lista completa</a></p>
                                    </div>
                                    <div id="servicos">
                                        <ul className="collection">
                                            <li className="collection-item">Corte de Cabelo: R$ 40,00</li>
                                            <li className="collection-item">Manicure: R$ 70,00</li>
                                            <li className="collection-item">Pedicure: R$ 90,00</li>
                                            <li className="collection-item">Limpeza de Pele: R$ 120,00</li>
                                        </ul>
                                        <p><a href="#">Visualizar a lista completa</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="card medium">
                                <div className="card-content">
                                    <div className="row">
                                        <span className="card-title">Produtos Mais Consumidos por Gênero</span>
                                        <div className="card-tabs">
                                            <ul className="tabs tabs-fixed-width">
                                                <li className="tab"><a href="#feminino">Feminino</a></li>
                                                <li className="tab"><a href="#masculino">Masculino</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="card-content">
                                        {/* Tab Feminino */}
                                        <div id="feminino">
                                            <ul className="collection">
                                                <li className="collection-item">Perfume Feminino: 1 unidade</li>
                                                <li className="collection-item">Batom Matte: 3 unidades</li>
                                                <li className="collection-item">Sombra em Pó: 3 unidades</li>
                                                <li className="collection-item">Esmalte Duradouro: 1 unidade</li>
                                                
                                            </ul>
                                            <p><a href="#">Visualizar a lista completa</a></p>
                                        </div>
                                        {/* Tab Masculino */}
                                        <div id="masculino">
                                            <ul className="collection">
                                                <li className="collection-item">Perfume Masculino: 2 unidades</li>
                                                <li className="collection-item">Creme Anti-Idade: 1 unidade</li>
                                                <li className="collection-item">Esmalte Duradouro: 1 unidade</li>
                                                <li className="collection-item">Perfume Unissex: 1 unidade</li>
                                            </ul>
                                            <p><a href="#">Visualizar a lista completa</a></p>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </>
        );
    }
}

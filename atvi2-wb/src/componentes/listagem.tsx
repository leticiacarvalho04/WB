import { Component } from "react";

type Props = {
    id: string,
    tema: string;
};

interface Produto {
    id: string;
    nome: string;
    preco: number;
}

interface Servico {
    id: string;
    nome: string;
    preco: number;
}

interface State {
    activeTab: string;
    id: string,
    nome: string;
    tema: string;
}

const servicos: Servico[] = [
    { id: '1', nome: 'Corte de cabelo', preco: 50.0 },
    { id: '2', nome: 'Manicure', preco: 20.0 },
    { id: '3', nome: 'Pedicure', preco: 25.0 },
    // adicione mais serviços conforme necessário
];

const produtos: Produto[] = [
    { id: '1', nome: 'Perfume feminino', preco: 100.0 },
    { id: '2', nome: 'Batom matte', preco: 15.0 },
    { id: '3', nome: 'Perfume masculino', preco: 120.0 },
    // adicione mais produtos conforme necessário
];

export class Listagem extends Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.state = {
            activeTab: 'produto',
            id: props.id,
            nome: '',
            tema: props.tema,
        };
    }

    handleTabClick = (tabName: string) => {
        this.setState({
            activeTab: tabName
        });
    }

    componentDidMount() {
        const tabs = document.querySelectorAll('.tabs');
        M.Tabs.init(tabs);
    }

    renderLista = (itens: { id: string, nome: string, preco: number }[]) => (
        <ul>
            {itens.map(item => (
                <li key={item.id}>
                    {`${item.id} - ${item.nome} - ${item.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`}
                </li>
            ))}
        </ul>
    );

    render() {
        return (
            <div className="row center-align">
                <div className="col s12">
                    <ul className="tabs">
                        <li className="tab col s6" onClick={() => this.handleTabClick('produto')}>
                            <a className={this.state.activeTab === 'produto' ? 'active' : ''} href="#produtoTab">Listagem Produto</a>
                        </li>
                        <li className="tab col s6" onClick={() => this.handleTabClick('servico')}>
                            <a className={this.state.activeTab === 'servico' ? 'active' : ''} href="#servicoTab">Listagem Serviço</a>
                        </li>
                    </ul>
                </div>
                <div id="produtoTab" className={`col s12 ${this.state.activeTab === 'produto' ? 'active' : ''}`}>
                    <div className="card">
                        <div className="card-content">
                            <span className="card-title">Listar Produto</span>
                            {this.renderLista(produtos)}
                        </div>
                    </div>
                </div>
                <div id="servicoTab" className={`col s12 ${this.state.activeTab === 'servico' ? 'active' : ''}`}>
                    <div className="card">
                        <div className="card-content">
                            <span className="card-title">Listar serviços</span>
                            {this.renderLista(servicos)}
                        </div>
                        <div className="row" style={{ marginBottom: '20px' }}></div>
                    </div>
                </div>
            </div>
        );
    }
}
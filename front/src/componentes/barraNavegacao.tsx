/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from "react";
import {Navigate} from "react-router-dom"
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'

type obj = {
    nome?: string;
    rota?: any;
}

type props = {
    tema: string,
    botoes: obj[],
    seletorView: Function
}

export default class BarraNavegacao extends Component<props> {
    constructor(props: props | Readonly<props>) {
        super(props)
        this.gerarListaBotoes = this.gerarListaBotoes.bind(this)
    }

    componentDidMount() {
        document.addEventListener('DOMContentLoaded', function () {
            let elems = document.querySelectorAll('.sidenav');
            M.Sidenav.init(elems)
        });
    }

    gerarListaBotoes() {
        if (this.props.botoes.length <= 0) {
            return <></>
        } else {
            let lista = this.props.botoes.map(botao =>
                <li><a href={botao.rota}>{botao.nome}</a></li>
            )
            return lista
        }
    }

    render() {
        let estilo = `${this.props.tema}`
        return (
            <>
                <nav className={estilo}>
                    <div className="nav-wrapper">
                        <a className="brand-logo">WB</a>
                        <a data-target="mobile-menu" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                        <ul className="right hide-on-med-and-down">
                            {this.gerarListaBotoes()}
                        </ul>
                    </div>
                </nav>
                <ul className="sidenav" id="mobile-menu">
                    {this.gerarListaBotoes()}
                </ul>
            </>
        )
    }
}
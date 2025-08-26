import { Botao } from "../../components/botao/Botao"
import { Link } from "react-router-dom"
import "./Home.css"

const Home = () => {
    return (
        <>
            <div className="inicio">
                <h1 className="titulozinho">BEM VINDO A GALERIA ONLINE</h1>
                <Link className="link-botao" to="/galeila">Entrar</Link>
            </div>
        </>
    )
}

export default Home;

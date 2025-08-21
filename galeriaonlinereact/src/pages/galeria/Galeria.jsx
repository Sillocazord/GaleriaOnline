import "./Galeria.css"
import icon from "../../assets/img/upload.svg"
import { Botao } from "../../components/botao/Botao"
import { Card } from "../../components/card/Card"
export const Galeria = () => {
    return (
        <>
            <h1 className="tituloGaleria">Galeria Online</h1>
            {/* FORMULARIO */}
            <form className="formulario" onSubmit="">
                <div className="campoNome">
                    <label>Nome</label>
                    <input type="text" className="inputNome" />
                </div>

                <div className="campoImagem">
                    <label className="arquivoLabel">
                    <i><img src={icon} alt="Icone de upload de imagem"/></i>
                    </label>
                    <input type="file" className="arquivoInput"/>
                </div>
                <Botao nomeBotao="Cadastrar"/>
            </form>
            <div className="campoCards">
                <Card
                tituloCard="Jetstream Sam 4k Ray Tracing"/>
                <Card
                tituloCard="Jetstream Sam 4k Ray Tracing"/>
                <Card
                tituloCard="Jetstream Sam 4k Ray Tracing"/>
                <Card
                tituloCard="Jetstream Sam 4k Ray Tracing"/>
                <Card
                tituloCard="Jetstream Sam 4k Ray Tracing"/>
                <Card
                tituloCard="Jetstream Sam 4k Ray Tracing"/>
                <Card
                tituloCard="Jetstream Sam 4k Ray Tracing"/>
                <Card
                tituloCard="Jetstream Sam 4k Ray Tracing"/>
            </div>
        </>
    )
}
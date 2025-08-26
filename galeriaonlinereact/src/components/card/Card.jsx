import "./Card.css"
// import imgCard from "../../assets/img/chad.svg"
import imgPen from "../../assets/img/pen.svg"
import imgTrash from "../../assets/img/trash.svg"
export const Card = ({tituloCard, imgCard, funcaoEditar, funcaoExcluir}) => {
    return(
        <>
        <div className="cardDaImagem">
            <p>{tituloCard}</p>
            <img className="imgDoCard" src={imgCard} alt="Imagem relacionada ao card."/>
            <div className="icons">
                <img onClick={funcaoEditar} src={imgPen} alt="Icone de uma caneta para realizar alteração" />
                <img onClick={funcaoExcluir} src={imgTrash} alt="Icone de uma lixeira para realizar exclusão" />
            </div>
        </div>
        </>
    )
}
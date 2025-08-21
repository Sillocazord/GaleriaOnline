import "./Card.css"
import imgCard from "../../assets/img/Sam.jpg"
import imgPen from "../../assets/img/pen.svg"
import imgTrash from "../../assets/img/trash.svg"
export const Card = ({tituloCard}) => {
    return(
        <>
        <div className="cardDaImagem">
            <p>{tituloCard}</p>
            <img className="imgDoCard" src={imgCard} alt="Imagem relacionada ao card."/>
            <div className="icons">
                <img src={imgPen} alt="Icone de uma caneta para realizar alteração" />
                <img src={imgTrash} alt="Icone de uma lixeira para realizar exclusão" />
            </div>
        </div>
        </>
    )
}
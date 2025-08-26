import "./Galeria.css"
import icon from "../../assets/img/upload.svg"
import { Botao } from "../../components/botao/Botao"
import { Card } from "../../components/card/Card"
import { useEffect, useState } from "react"
import api from "../../Services/services"
export const Galeria = () => {

    const [cards, setCards] = useState([]);
    const [imagem, setImagem] = useState(null);
    const [nomeImagem, setNomeImagem] = useState("");

    async function listarCards() {
        try {
            const resposta = await api.get("Imagem");
            // console.log(resposta.data);

            setCards(resposta.data)
        } catch (error) {
            console.log(error)
            alert("erro ao listar")
        }
    };

    async function cadastrarCards(e) {
        e.preventDefault();
        if (imagem && nomeImagem) {
            try {
                //FormData é uma interface JavaScript que permite construir um conjunto de pares chave/valor representando os dados de um formulário HTML.
                const formData = new FormData();
                //apend: anexar/acrescentar/adicionar
                formData.append("Nome", nomeImagem)
                formData.append("Arquivo", imagem)

                await api.post("Imagem/upload", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });

            } catch (error) {

                alert("Não foi possível realizar o cadastro!")
                console.error(error);
            }

        } else {

            alert("Preencha os campos de Nome e Imagem!")

        }
    }

    async function excluirCard(id) {
        try {
            await api.delete(`Imagem/${id}`)
            alert("EXCLUIO😭")
            listarCards();
        } catch (error) {
            alert("Erro ao excluir o card")
            console.log(error);
        }
    }

    async function editarCard(id, nomeAntigo) {

        const novoNome = prompt("Digite o novo nome da imagem", nomeAntigo);

        const inputArquivo = document.createElement("input");
        inputArquivo.type = "file";
        inputArquivo.accept = "image/*";
        inputArquivo.style = "display: none"
        // <input type = "file" accept="image/*"><input>
        // Decide oque acontece quando um usuario selecionar o arquivo
        inputArquivo.onchange = async (e) => {
            const novoArquivo = e.target.files[0];
            const formData = new FormData();
            // adicionar o novo nome no FormData
            formData.append("Nome", novoNome);
            formData.append("Arquivo", novoArquivo);

            if (formData) {
                try {
                    await api.put(`Imagem/${id}`, formData, {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    })
                    alert("Clipado com sucesso")
                    listarCards();
                } catch (error) {
                    console.log(error);
                    alert("Não foi possível alterar o card")
                }
            }
        };
        inputArquivo.click();
    }

    useEffect(() => {
        listarCards();
    });

    return (
        <>
            <h1 className="tituloGaleria">Galeria Online</h1>
            {/* FORMULARIO */}
            <form className="formulario" onSubmit={cadastrarCards}>
                <div className="campoNome">
                    <label>Nome</label>
                    <input type="text" className="inputNome" onChange={(e) => setNomeImagem(e.target.value)} value={nomeImagem} />
                </div>

                <div className="campoImagem">
                    <label className="arquivoLabel">
                        <i><img src={icon} alt="Icone de upload de imagem" /></i>
                        <input type="file" className="arquivoInput" onChange={(e) => setImagem(e.target.files[0])} />
                    </label>
                </div>
                <Botao nomeBotao="Cadastrar" />
            </form>
            <div className="campoCards">
                {cards.length > 0 ?
                    (cards.map((e) => (
                        <Card
                            key={e.id}
                            tituloCard={e.nome}
                            imgCard={`https://localhost:7116/${e.caminho.replace("wwwroot/", "")}`}
                            funcaoEditar={() => editarCard(e.id, e.nome)}
                            funcaoExcluir={() => excluirCard(e.id)}
                        />
                    ))
                    ) : <p>Nenhum card registrado.</p>
                }
            </div>
        </>
    )
}
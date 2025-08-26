import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home/home";
import { Galeria } from "../pages/galeria/Galeria";


const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/galeila" element={<Galeria/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas

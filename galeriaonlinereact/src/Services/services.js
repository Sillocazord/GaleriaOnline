import axios from "axios";
const apiPorta = "7116"
// apiLocal recebe o endereço da API
const apiLocal = `https://localhost:${apiPorta}/api/`;

const api = axios.create({
    baseURL: apiLocal
});

export default api;
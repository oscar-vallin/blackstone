import axios from 'axios';

const url = 'http://localhost:4000';
const clientAxios = axios.create({
    baseURL: url,
});

export default clientAxios;
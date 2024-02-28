import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

export const viaCep = axios.create({
    baseURL: 'https://viacep.com.br/ws/',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

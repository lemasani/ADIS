import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://adis.azurewebsites.net/',
});

export default instance;
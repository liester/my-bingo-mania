import {BASE_API_URL} from "./constants";
import axios from 'axios';
const instance = axios.create({
    baseURL: BASE_API_URL,
    timeout: 5000,
});

export default instance

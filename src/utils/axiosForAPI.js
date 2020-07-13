import axios from 'axios';
const storedJWT = localStorage.getItem('jwt');
const axiosForAPI = axios.create({
    headers: {
        Authorization: `Bearer ${storedJWT}`
    }
})

export default axiosForAPI;
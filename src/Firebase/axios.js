import axios from 'axios';

const instance = axios.create({
        baseURL: 'https://senorma-64974-default-rtdb.firebaseio.com/'
    
});


export default instance;
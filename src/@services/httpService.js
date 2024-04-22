import axios from 'axios'
import {useNavigate} from 'react-router-dom'

export const url = 'https://getspring.finance/'

const secureInstance = axios.create({
    baseURL: 'https://qipbzv4fxl.execute-api.us-east-1.amazonaws.com/sandbox/',
    headers: {
        "Content-type" : "application/json",
        'Accept': 'application/json',
    }
})

const guestInstance = axios.create({
    baseURL: 'https://qipbzv4fxl.execute-api.us-east-1.amazonaws.com/sandbox/',
})

secureInstance.interceptors.request.use(
    config => {
        const accessToken = JSON.parse(localStorage.getItem('token'));
        if(accessToken) {
            config.headers['Authorization'] = `Bearer-Token ${accessToken}`;
        }
        return config;  
      },
      error => {
          return Promise.reject(error);
      }
);

secureInstance.interceptors.response.use(
    response => {
        if (response.status === 401) {
            window.location = '/';
        }
        return response;
    },
    error => {
        //handle unauthorized error
        if (error.response.status === 401) {
            window.location = '/';
        }
        if (error.response.status === 422) {
            return Promise.reject(error);
        }
        return Promise.reject(error);
    }
);

const axiosInstance = {
    secureInstance,
    guestInstance
}

export default axiosInstance
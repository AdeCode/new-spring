import axios from 'axios'
import {useNavigate} from 'react-router-dom'


const secureInstance = axios.create({
    baseURL: 'https://qipbzv4fxl.execute-api.us-east-1.amazonaws.com/sandbox',
    headers: {
        "Content-type" : "application/json",
        'Accept': 'application/json',
    }
})

const guestInstance = axios.create({
    baseURL: 'https://qipbzv4fxl.execute-api.us-east-1.amazonaws.com/sandbox',
})

secureInstance.interceptors.request.use(
    config => {
        const accessToken = JSON.parse(localStorage.getItem('token'));
        if(accessToken) {
            config.headers['Authorization'] = `Bearer-Token ${accessToken}`;
            // config.headers['bearer-token'] = `${accessToken}`;
        }
        return config;  
      },
      error => {
          return Promise.reject(error);
      }
);

secureInstance.interceptors.response.use(
    //response
    response => {
        // console.log(response)
        if (response.status === 401) {
            window.location = '/';
        }
        return response;
    },
    error => {
        // console.log(error)
        //handle unauthorize error
        if (error.response.status === 401) {
            window.location = '/';
            //return Promise.reject(error);
        }
        if (error.response.status === 422) {
            console.log('Can not process request');
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
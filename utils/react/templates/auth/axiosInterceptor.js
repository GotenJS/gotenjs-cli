module.exports = axiosInterceptor = () => (
    `const config = require("../config/config");
const axios = require("axios");

const addInterceptor = () => {
    axios.interceptors.request.use(
        configRequest => {
            const token = localStorage.getItem("token")
            if (configRequest.url !== config.default.login && token) {
                configRequest.headers.token = token
            }
            return configRequest;
        },
        error => {
            // Do something with request error
            return Promise.reject(error);
        }
    );
};

module.exports = addInterceptor;
`
);
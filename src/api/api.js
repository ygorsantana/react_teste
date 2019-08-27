import OpenAPIClientAxios from "openapi-client-axios";

function initApi() {
    const api = new OpenAPIClientAxios(
        {
            // definition: 'http://192.168.0.70:8000/openapi',
            definition: 'http://192.168.0.70:8000/swagger.json',
            axiosConfigDefaults: {
                baseURL: 'http://192.168.0.70:8000/',
            }
        }
    );
    api.init()
    return api
}

function initApiLogged() {
    const api = new OpenAPIClientAxios(
        {
            // definition: 'http://192.168.0.70:8000/openapi',
            definition: 'http://192.168.0.70:8000/swagger.json',
            axiosConfigDefaults: {
                baseURL: 'http://192.168.0.70:8000/',
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`
                }
            }
        }
    );
    api.init()
    return api
}

export const apiLogin = initApi();
export const api = initApiLogged();

import {apiLogin} from "../../api/api";

export const loginRequest = () => ({
    type: 'LOGIN_REQUEST'
});

export const loginFulfill = (data) => ({
    type: 'LOGIN_FULFILL',
    token: data
});

export const loginRejected = (data) => ({
    type: 'LOGIN_REJECTED',
    error: data
});

export const logoutRequest = (data) => ({
    type: 'LOGOUT_REQUEST',
    token: null
});

export const login = (data, history, oldPath) => {
    const request = apiLogin.getClient().then((client) => {
            return client.auth_token_login_create(null, {
                username: data.username,
                password: data.password
            });
        }
    );
    return (dispatch) => {
        dispatch(loginRequest());
        return request.then(res => {
            setTimeout(() => {
                dispatch(loginFulfill(res.data));
                history.push(oldPath);
            }, 500);
            localStorage.setItem("token", res.data.auth_token);
        }).catch(err => {
            dispatch(
                loginRejected(
                    err.response.data["non_field_errors"] ?
                        "Usuário e/ou senha inválidos." :
                        "Erro inesperado."
                )
            )
        })
    };
};

export const logout = () => {
    return (dispatch) => {
        dispatch(logoutRequest())
    }
};
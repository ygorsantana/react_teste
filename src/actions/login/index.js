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

export const logoutRequest = () => ({
    type: 'LOGOUT_REQUEST',
    token: null
});

export const login = (data, history, oldPath) => {
    const request = apiLogin.getClient().then((client) => {
            return client.auth_token_login_create(null, {
                email: data.username,
                password: data.password
            });
        }
    );
    return (dispatch) => {
        dispatch(loginRequest());
        return request.then(res => {
            if (res) {
                setTimeout(() => {
                    dispatch(loginFulfill(res.data));
                    history.push(oldPath);
                }, 500);
                localStorage.setItem("token", res.data.auth_token);
            }
        }).catch(err => {
            if (err.response) {
                dispatch(
                    loginRejected(
                        err.response.data["non_field_errors"] ?
                            "Usuário e/ou senha inválidos." :
                            "Erro inesperado."
                    )
                )
            } else {
                dispatch(
                    loginRejected(
                        "Erro inesperado."
                    )
                )
            }
        })
    };
};

export const logout = () => {
    window.localStorage.clear();
    return (dispatch) => {
        dispatch(logoutRequest());
        // window.localStorage.removeItem('persist:root');
    }
};
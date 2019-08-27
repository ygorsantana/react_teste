const initialState = {
    token: "",
    loading: false,
    error: null,
};
export const auth = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_REQUEST':
            return {
                ...state,
                loading: true
            };
        case 'LOGIN_FULFILL':
            return {
                ...state,
                token: action.token,
                loading: false,
                error: null
            };
        case 'LOGIN_REJECTED':
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case 'LOGOUT_REQUEST':
            return {
                ...state,
                token: action.token
            };
        default:
            return state;
    }
};
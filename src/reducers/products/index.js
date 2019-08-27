const initialState = {
    products: [],
    product: {},
    loading: false,
    error: null,
};
export const products = (state = initialState, action) => {
    switch (action.type) {
        case 'PRODUCTS_REQUEST':
            return {
                ...state,
                loading: true
            };
        case 'PRODUCTS_FULFILL':
            return {
                ...state,
                products: action.products,
                loading: false,
                error: null
            };
        case 'PRODUCTS_REJECTED':
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case 'PRODUCT_REQUEST':
            return {
                ...state,
                loading: true,
            };
        case 'PRODUCT_FULFILL':
            return {
                ...state,
                product: action.product,
                loading: false,
                error: null
            };
        default:
            return state;
    }
};
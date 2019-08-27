import {api} from "../../api/api";

// ======== Products ========
export const productsRequest = () => ({
    type: 'PRODUCTS_REQUEST'
});

export const productsFulfill = (data) => ({
    type: 'PRODUCTS_FULFILL',
    products: data
});

export const productsRejected = (err) => ({
    type: 'PRODUCTS_REJECTED',
    error: err
});

export const productsUpdate = (data) => ({
    type: 'PRODUCTS_UPDATE',
    error: data
});

export const getProducts = () => {
    const token = window.localStorage.getItem('token');
    const request = api(token).getClient().then((client) => {
            return client.products_list();
        }
    );
    return (dispatch) => {
        dispatch(productsRequest());
        return request.then(res => {
            dispatch(productsFulfill(res.data));
        }).catch((err) => {
            console.log(err);
            dispatch(productsRejected(err));
        })
    };
};
// ==========================

// ======== Product =========
export const productRequest = () => ({
    type: 'PRODUCT_REQUEST'
});

export const productFulfill = (data) => ({
    type: 'PRODUCT_FULFILL',
    product: data
});

export const getProduct = (uuid) => {
    const token = window.localStorage.getItem('token');
    const request = api(token).getClient().then((client) => {
            return client.products_read(uuid);
        }
    );
    return (dispatch) => {
        dispatch(productRequest());
        return request.then(res => {
            dispatch(productFulfill(res.data));
        })
    };
};
// ==========================

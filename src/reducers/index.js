import {auth} from './login';
import {products} from './products';
import {combineReducers} from 'redux';

export const Reducers = combineReducers({
    auth,
    products,
});
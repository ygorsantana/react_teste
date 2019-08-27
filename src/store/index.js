import {applyMiddleware, createStore} from 'redux';
import {Reducers} from '../reducers';
import {createTransform, persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import thunk from 'redux-thunk';
import logger from 'redux-logger'

let blacklistTransform = (stateKey, stateValue) => createTransform(
    (inboundState, key) => {
        if (key !== stateKey) return inboundState;
        else return {
            ...inboundState,
            [stateValue]: undefined,
        }
    }
);

const persistConfig = {
    key: 'root',
    storage,
    transforms: [blacklistTransform("auth", "error")],
};

const persistedReducer = persistReducer(persistConfig, Reducers);

const store = () => {
    let store = createStore(persistedReducer, applyMiddleware(thunk, logger));
    let persistor = persistStore(store);
    return {store, persistor}
};

let storePersistor;
storePersistor = store();
export default storePersistor;
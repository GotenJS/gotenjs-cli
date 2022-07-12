module.exports = reduxStore = () => (
    `import axios from 'axios'
import thunkMiddleware from 'redux-thunk'
import { persistStore, persistCombineReducers } from 'redux-persist'
import { routerMiddleware, routerReducer } from 'react-router-redux'
import { createStore, compose, applyMiddleware } from 'redux'
import storage from 'redux-persist/lib/storage'

import appReducer from './reducers/appReducer'
import { appOperations } from '../duck'
//<import-module-reducers>
//</import-module-reducers>

import history from '../history'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const config = {
  key: 'primary',
  storage
}

const reducers = persistCombineReducers(config, {
    appStore: appReducer,
    routerReducer,
    //<use-module-reducers>
    //</use-module-reducers>
})

const store = createStore(
    reducers,
    composeEnhancer(applyMiddleware(thunkMiddleware, routerMiddleware(history))),
)

export const persistor = persistStore(store)

axios.interceptors.response.use(null, (err) => {
    store.dispatch(appOperations.showSnackbar(err, 'error'))
    return Promise.reject(err)
})

export default store
`
);
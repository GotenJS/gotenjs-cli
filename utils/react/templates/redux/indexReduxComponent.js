module.exports = indexReduxComponent = () => (
    `import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from "react-redux"
import { Router } from 'react-router-dom'

import './index.css'

import App from './App'
import history from './history'
import store from './redux/store'


ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>      
            <App/>
        </Router>
    </Provider>,
    document.getElementById('root')
)
`
);

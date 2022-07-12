module.exports = indexComponent = () => (
    `import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'

import './index.css'

import App from './App'
import history from './history'
import { SnackbarProvider } from './SnackbarContext'
import { RouterProvider } from './RouterContext'

//<import-module-context>
//</import-module-context>

ReactDOM.render(
    <Router history={history}>
        <SnackbarProvider>
            <RouterProvider>
                {/*<module-context>*/}
                    <App/>
                {/*</module-context>*/}
            </RouterProvider>
        </SnackbarProvider>
    </Router>,
    document.getElementById('root')
)
`
);
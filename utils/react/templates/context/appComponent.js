module.exports = appComponent = () => (
    `import React from 'react'
import { Route } from 'react-router-dom'
import Container from 'react-bootstrap/Container'

import './App.css'

import Home from './layout/Home'
import Navbar from './layout/Navbar'
//<import-module-routes>
//</import-module-routes>


class App extends React.Component {
    render() {
        return (
            <Container fluid>
                <header className="App-header">
                    <Navbar />
                </header>
                <Container fluid className="App">
                    <Route exact={true} path="/" component={Home}/>
                    {/*<use-module-routes>*/}
                    {/*</use-module-routes>*/}
                </Container>
            </Container>
        )
    }
}

export default App
`
);
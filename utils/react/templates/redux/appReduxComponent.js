module.exports = appComponent = () => (
    `import React from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'
import Container from 'react-bootstrap/Container'

import { PersistGate } from 'redux-persist/es/integration/react'
import { persistor } from './redux/store'
import './App.css'

import Home from './layout/Home'
import Snackbar from './Snackbar'
import Navbar from './layout/Navbar'
//<import-module-routes>
//</import-module-routes>

import { appOperations } from './duck'


class App extends React.Component {
    render() {
        return (
            <PersistGate loading={null} persistor={persistor}>
                <header className="App-header">
                    <Navbar />
                </header>
                <Container fluid className="App">
                    <Route exact={true} path="/" component={Home}/>
                    {/*<use-module-routes>*/}
                    {/*</use-module-routes>*/}
                </Container>
                <Snackbar snackbar={this.props.snackbar} closeSnackbar={this.props.closeSnackbar} />
            </PersistGate>
        )
    }
}

const mapStateToProps = (state) => ({
    snackbar: state.appStore.snackbar    
})

const mapDispatchToProps = (dispatch) => ({
    closeSnackbar: () => dispatch(appOperations.closeSnackbar())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
`
);

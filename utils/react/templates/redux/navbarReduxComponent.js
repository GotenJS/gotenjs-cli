const { capitalizeString } = require("../../utils");

module.exports = navbarComponent = (appTitle) => (
    `import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import DropdownButton from 'react-bootstrap/DropdownButton'
import DropdownItem from 'react-bootstrap/DropdownItem'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import '../App.css'

import { colorCyS } from '../utils/consts'


export class Navbar extends React.Component {
    render() {
        return (
            <Row>
                <Col md={6}>
                    <h2 className="App-title">${capitalizeString(appTitle)}</h2>
                    </Col>
                <Col md={6}>
                    <ButtonToolbar className="float-right" style={{paddingRight: '4.4%'}}>
                        <DropdownButton
                            style={{backgroundColor: colorCyS, color: "white"}}
                            title="Modules"
                            key={1}
                            id={'dropdown-modules'}
                        >
                            {/* <use-module-tab> */}
                            {/* </use-module-tab> */}
                        </DropdownButton>
                        <Button
                            style={{backgroundColor: colorCyS, color: "white"}}
                            onClick={() => this.props.redirectTo("/")}
                        >
                            Home
                        </Button>
                    </ButtonToolbar>
                </Col>
                <br/><br/>
            </Row>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    redirectTo: (path) => dispatch(push(path))
})

export default connect(null, mapDispatchToProps)(Navbar)`
);
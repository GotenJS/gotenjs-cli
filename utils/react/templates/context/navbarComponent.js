const { capitalizeString } = require("../../utils");

module.exports = navbarComponent = (appTitle) => (
    `import React from 'react'
import { withRouting } from '../RouterContext'
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
                <Col xs={6} md={6}>
                    <h2 className="App-title">${capitalizeString(appTitle)}</h2>
                    </Col>
                <Col xs={6} md={6}>
                    <ButtonToolbar className="float-right" style={{paddingRight: '2.4%'}}>
                        <DropdownButton
                            style={{backgroundColor: colorCyS, color: "white"}}
                            title="Modules"
                            key={1}
                            id={'dropdown-modules'}
                        >
                            {/* <use-module-tab> */}
                            {/* </use-module-tab> */}
                        </DropdownButton>
                        <Button className="ml-4"
                            style={{color: "white"}}
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

export default withRouting(Navbar)
`
);
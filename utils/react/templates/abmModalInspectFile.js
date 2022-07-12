module.exports = abmModalInspectFile = (name) => {
    const lowerCaseName = name.toLowerCase();
    return (
        `import React from 'react'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'

import ${name}Form from './Form'
import GenericModal from '../../layout/Modal'


export default class Inspect${name}Modal extends GenericModal {
    constructor(){
        super()
        this.state = {
            visible: false,
            ${lowerCaseName}: {}
        }
    }

    openModal = (${lowerCaseName}) => {
        this.setState({visible: true, ${lowerCaseName}})
    }

    getTitle = () => {
        return "Inspeccionar ${lowerCaseName}"
    }

    getContent = () => {
        return(
            <React.Fragment>
                <${name}Form
                    modoVisualizacion
                    ${lowerCaseName}={this.state.${lowerCaseName}}
                    onSuccess={() => null}
                />
                <div style={{height: 10}} />
                <ButtonToolbar>
                    <Button variant="primary" onClick={this.onRequestClose}>Cerrar</Button>
                </ButtonToolbar>
            </React.Fragment>
        )
    }
}
`
    );};
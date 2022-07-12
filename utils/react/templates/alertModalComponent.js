module.exports = alertModalComponent = () => (
    `import React from 'react'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'

import GenericModal from './Modal'


export default class AlertModal extends GenericModal {
    constructor(){
        super()
        this.state = {
            visible: false
        }
    }

    getTitle = () => {
        return this.props.alertTitle
    }

    onAccept = () => {
        this.props.onAccept()
        this.onRequestClose()
    }

    getContent = () => {
        return(
            <ButtonToolbar>
                <Button onClick={this.onAccept}>Sí</Button>
                <Button className="ml-3" variant="danger" onClick={this.onRequestClose}>No</Button>
            </ButtonToolbar>
        )
    }
}
`
);
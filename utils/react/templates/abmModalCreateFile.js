module.exports = abmModalCreateFile = (name) => {
    const lowerCaseName = name.toLowerCase();
    return (
        `import React from 'react'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'

import ${name}Form from './Form'
import GenericModal from '../../layout/Modal'


export default class Create${name}Modal extends GenericModal {
    constructor(){
        super()
        this.formRef = React.createRef()
    }
    
    getTitle = () => {
        return "Create ${lowerCaseName}"
    }

    save${name} = () => {
        const ${lowerCaseName} = this.formRef.current.get${name}()
        this.props.create${name}(${lowerCaseName})
        this.onRequestClose()
    }

    validateForm = () => {
        this.formRef.current.validate()
    }

    getSize = () => "large"

    getContent = () => {
        return(
            <React.Fragment>
                <${name}Form
                    ref={this.formRef}
                    onSuccess={this.save${name}}
                />
                <div style={{height: 10}} />
                <ButtonToolbar>
                    <Button variant="success" onClick={this.validateForm}>Crear ${lowerCaseName}</Button>
                    <Button className="ml-3" onClick={() => this.onRequestClose()}>Cancelar</Button>
                </ButtonToolbar>
            </React.Fragment>
        )
    }
}
`
    );};
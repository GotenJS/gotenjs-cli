module.exports = abmModalEditFile = (name) => {
    const lowerCaseName = name.toLowerCase();
    return (
        `import React from 'react'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Button from 'react-bootstrap/Button'

import ${name}Form from './Form'
import GenericModal from '../../layout/Modal'
import ButtonWithAlert from '../../layout/ButtonWithAlert'


export default class Edit${name}Modal extends GenericModal {
    constructor(){
        super()
        this.state = {
            visible: false,
            ${lowerCaseName}: {}
        }
        this.formRef = React.createRef()
    }

    edit${name}ById = () => {
        const ${lowerCaseName} = this.formRef.current.get${name}()
        this.props.edit${name}(${lowerCaseName})
        this.onRequestClose()
    }

    validateForm = () => {
        this.formRef.current.validate()
    }

    openModal = (${lowerCaseName}) => {
        this.setState({visible: true, ${lowerCaseName}})
    }

    getTitle = () => {
        return "Editar ${lowerCaseName}"
    }

    getSize = () => "large"

    getContent = () => {
        return(
            <React.Fragment>
                <${name}Form
                    ref={this.formRef}
                    ${lowerCaseName}={this.state.${lowerCaseName}}
                    onSuccess={this.edit${name}ById}
                />
                <div style={{height: 10}} />
                <ButtonToolbar>
                    <ButtonWithAlert
                        alertTitle="Está seguro que desea realizar la modificación?"
                        variant="success"
                        onClick={this.validateForm}
                    >
                        Confirmar
                    </ButtonWithAlert>                
                    <Button className="ml-3" onClick={() => this.onRequestClose()}>Cancelar</Button>
                </ButtonToolbar>
            </React.Fragment>
        )
    }
}
`
    );};
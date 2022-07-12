module.exports = genericModalComponent = () => (
    `import React from 'react'
import BootstrapModal from 'react-bootstrap/Modal'


export default class Modal extends React.Component{
    constructor(){
        super()
        this.state = {
            visible: false
        }
    }

    openModal = () => {
        this.setState({visible: true})
    }
    
    hideModal = () => {
        this.setState({visible: false})
    }

    getTitle = () => {
        return "Modal"
    }

    getContent = () => {
        return <div>Modal generico</div>
    }

    onRequestClose = () => {
        this.hideModal()
    }

    render(){
        return (
            <BootstrapModal show={this.state.visible} onHide={this.onRequestClose}>
                <BootstrapModal.Header>
                    <BootstrapModal.Title>{this.getTitle()}</BootstrapModal.Title>
                </BootstrapModal.Header>
                <BootstrapModal.Body>
                    {this.getContent()}
                </BootstrapModal.Body>
            </BootstrapModal>
        )
    }
}
`
);
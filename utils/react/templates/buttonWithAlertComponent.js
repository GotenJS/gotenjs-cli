module.exports = buttonWithAlertComponent = () => (
    `import React from 'react'
import Button from 'react-bootstrap/Button'

import AlertModal from './AlertModal'


export default class ButtonWithAlert extends React.Component {
    constructor() {
        super()
        this.alertModal = React.createRef()
    }

    onClick = () => {
        this.alertModal.current.openModal()
    }

    render() {
        return (
            <React.Fragment>
                <Button
                    style={this.props.style || undefined}
                    bsPrefix={this.props.className || undefined}
                    variant={this.props.variant || undefined}
                    onClick={this.onClick}
                >
                    {this.props.children}
                </Button>
                <AlertModal
                    alertTitle={this.props.alertTitle}
                    onAccept={this.props.onClick}
                    ref={this.alertModal}
                />
            </React.Fragment>
        )
    }
}
`
);
module.exports = snackbarContext = () => (
    `import React from 'react'
import Snackbar from './Snackbar'

const { Provider, Consumer } = React.createContext()


class SnackbarProvider extends React.Component {
    constructor() {
        super()
        this.state = {
            visible: false,
            message: '',
            messageType: 'message'
        }
    }

    showSnackbar = ({message, messageType}) => {
        this.setState({visible: true, message, messageType})
    }

    closeSnackbar = () => {
        this.setState({visible: false})
    }

    render() {
        return (
            <Provider
                value={{
                    ...this.state,
                    showSnackbar: this.showSnackbar
                }}
            >
                {this.props.children}
                <Snackbar
                    visible={this.state.visible}
                    messageType={this.state.messageType}
                    message={this.state.message}
                    closeSnackbar={this.closeSnackbar}
                />
            </Provider>
        )
    }
}

function withNotifier(Component) {
    return function Notified(props) {
        return (
            <Consumer>
                {({ showSnackbar }) => (
                    <Component {...props} showSnackbar={showSnackbar} />
                )}
            </Consumer>
        )
    }
}

export {
    SnackbarProvider,
    Consumer as Notifier,
    withNotifier
}
`
);
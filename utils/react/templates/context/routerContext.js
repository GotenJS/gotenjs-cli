module.exports = routerContext = () => (
    `import React from 'react'
import { withRouter } from 'react-router-dom'

const { Provider, Consumer } = React.createContext()


class RouterProv extends React.Component {
    redirectTo = (route) => {
        this.props.history.push(route)
    }

    render() {
        return (
            <Provider
                value={{
                    ...this.state,
                    redirectTo: this.redirectTo
                }}
            >
                {this.props.children}
            </Provider>
        )
    }
}

function withRouting(Component) {
    return function Routed(props) {
        return (
            <Consumer>
                {({ redirectTo }) => (
                    <Component {...props} redirectTo={redirectTo} />
                )}
            </Consumer>
        )
    }
}

const RouterProvider = withRouter(RouterProv)

export {
    RouterProvider,
    Consumer as Routed,
    withRouting
}
`
);
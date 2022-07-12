module.exports = privateRoute = () => (
    `import React from 'react'
import { Redirect } from 'react-router-dom'

import { withAuth } from './AuthContext'

export class PrivateRoute extends React.Component {
    render() {
        if (this.props.authenticated) {
            return this.props.component()
        }
        localStorage.setItem("redirect", this.props.path)
        return <Redirect to={'/login'} />
    }
}

export default withAuth(PrivateRoute)
`
);
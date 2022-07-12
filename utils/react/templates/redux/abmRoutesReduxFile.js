module.exports = abmRoutesFile = (name, authPath) => {
    const lowerCaseName = name.toLowerCase();
    return (
        `import React from 'react'
import { connect } from 'react-redux'

import ${name}Index from '.'
import { ${lowerCaseName}Operations } from './duck'
${authPath.importRoute}

export class ${name}Routes extends React.Component {
    componentWillUnmount(){
        this.props.clearRedux()
    }
    
    render() {
        return (
            <React.Fragment>
                <${authPath.authPath} exact path="/${lowerCaseName}s" render={()=> <${name}Index/>} />
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    clearRedux: () => dispatch(${lowerCaseName}Operations.clearRedux${name}())
})

export default withRouter(connect(null, mapDispatchToProps)(${name}Routes))
`
    );};

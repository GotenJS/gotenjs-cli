module.exports = abmRoutesFile = (name, authPath) => {
    const lowerCaseName = name.toLowerCase();
    return (
        `import React from 'react'
${authPath.importRoute}
import ${name}Index from '.'

export class ${name}Routes extends React.Component {
    render() {
        return (
            <React.Fragment>
                <${authPath.authPath} exact path="/${lowerCaseName}s" component={${name}Index} />
            </React.Fragment>
        )
    }
}

export default ${name}Routes
`
    );};
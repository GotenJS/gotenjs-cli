module.exports = homeComponent = () => (
    `import React from 'react'
import Container from 'react-bootstrap/Container'


export default class Home extends React.Component {
    render() {
        return (
            <Container fluid>
                <br></br>
                <br></br>
                <br></br>
                <h1> Esta página fue hecha con GotenJS </h1>
                <br/>
                <h4>
                    - Para más información sobre el uso del CLI, visite&nbsp;
                    <a href="http://github.com/cysinformatica">
                        http://github.com/cysinformatica
                    </a>
                </h4>
                <h4>
                    - Para contribuir,&nbsp;
                    <a href="http://github.com/cysinformatica">
                        http://github.com/cysinformatica
                    </a>
                </h4>
                <h4>
                    - Para ver otros módulos de GotenJS,&nbsp;
                    <a href="http://github.com/cysinformatica">
                        http://github.com/cysinformatica
                    </a>
                </h4>
            </Container>
        )
    }
}
`
);
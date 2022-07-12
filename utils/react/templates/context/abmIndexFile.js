module.exports = abmIndexFile = (name) => {
    const lowerCaseName = name.toLowerCase();
    return (
        `import React from 'react'
import GotenPaginator from 'goten-react-paginator'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import ${name}List from './List'
import ${name}Searcher from './Searcher'
import Create${name}Modal from './CreateModal'

import { with${name} } from './${name}Context'
import { withNotifier } from '../../SnackbarContext'


export class ${name}Index extends React.Component{
    constructor(){
        super()
        this.modalRef = React.createRef()
    }

    componentDidMount(){
        this.get${name}s()
    }

    openModalCreate${name} = () => {
        this.modalRef.current.openModal()
    }

    create${name} = async (${lowerCaseName}Data) => {
        try {
            const response = await this.props.create${name}(${lowerCaseName}Data)
            this.props.showSnackbar({message: response.message, messageType: "success"})
        } catch (e) {
            this.props.showSnackbar({
                message: \`Hubo un error creando el ${lowerCaseName}. Error: \${e}\`,
                messageType: "error"
            })
        }
    }

    get${name}s = async (queryParams) => {
        try {
            await this.props.get${name}s(queryParams)
        } catch (e) {
            this.props.showSnackbar({
                message: \`Hubo un error obteniendo los ${lowerCaseName}s. Error: \${e}\`,
                messageType: "error"
            })
        }
    }

    render(){
        return(
            <Container fluid>
                <Row>
                    <Col md={12} className="mt-5">
                        <h2 className="mt-5" style={{textAlign:"left"}}>${name}s
                            <Button className="float-right" variant="success" onClick={this.openModalCreate${name}}>
                                <FontAwesomeIcon icon={faPlus}/> Crear ${name}
                            </Button>
                        </h2>
                    </Col>
                </Row>
                <GotenPaginator
                    totalElements={this.props.${lowerCaseName}Store.totalElements}
                    offset={this.props.${lowerCaseName}Store.offset}
                    limit={this.props.${lowerCaseName}Store.limit}
                >
                    <${name}Searcher search={this.get${name}s}/>
                    <${name}List
                        ${lowerCaseName}s={this.props.${lowerCaseName}Store.${lowerCaseName}s}
                    />
                </GotenPaginator>
                <Create${name}Modal
                    ref={this.modalRef}
                    create${name}={this.create${name}}
                />
            </Container>
        )
    }
}


export default withNotifier(with${name}(${name}Index))
`
    );};
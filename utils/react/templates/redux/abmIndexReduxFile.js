module.exports = abmIndexReduxFile = (name) => {
    const lowerCaseName = name.toLowerCase();
    return (
        `import React from 'react'
import { connect } from 'react-redux'
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

import { ${lowerCaseName}Operations } from './duck'


export class ${name}Index extends React.Component{
    constructor(){
        super()
        this.modalRef = React.createRef()
        this.listaRef = React.createRef()
    }

    componentDidMount(){
        this.props.get${name}s()
    }

    openModalCreate${name} = () => {
        this.modalRef.current.openModal()
    }

    render(){
        return(
            <Container fluid>
                <Row>
                    <Col md={12}>
                        <h2 style={{textAlign:"left"}}>${name}s
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
                    <${name}Searcher search={this.props.get${name}s}/>
                    <${name}List
                        ref={this.listaRef}
                        ${lowerCaseName}s={this.props.${lowerCaseName}Store.${lowerCaseName}s}
                    />
                </GotenPaginator>
                <Create${name}Modal
                    ref={this.modalRef}
                    create${name}={this.props.create${name}}
                />
            </Container>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    create${name}: (${lowerCaseName}Data) => dispatch(${lowerCaseName}Operations.create${name}Action(${lowerCaseName}Data)),
    get${name}s: (queryParams) => dispatch(${lowerCaseName}Operations.get${name}sAction(queryParams))
})

const mapStateToProps = (state) => ({
    ${lowerCaseName}Store: state.${lowerCaseName}Store
})

export default connect(mapStateToProps, mapDispatchToProps)(${name}Index)
`
    );};

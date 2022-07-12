module.exports = genericSearcherComponent = () => (
    `import React from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'


export default class Searcher extends React.Component {
    search = () => {
        console.log("search")
    }

    onChange = (value, label) => {
        this.setState({searchParams: {
            ...this.state.searchParams,
            [label]: value !== '' ? value : undefined
        }})
    }

    render() {
        return (
            <React.Fragment>
                <Card>
                    <Card.Body>
                      <Card.Title style={{fontSize: 24}}>Buscar</Card.Title>
                        <Row>
                            {this.getSearcherForm()}
                        </Row>
                        <br/>
                        <Button variant='primary' onClick={() => this.search()}>Buscar</Button>
                    </Card.Body>
                </Card>
                <br/><br/>
            </React.Fragment>
        )
    }
}
`
);
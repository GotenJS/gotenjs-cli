const { capitalizeString, format } = require("../utils");

const getSearchParams = (props) => {
    let searchParams = "";
    let name = " ";
    props.forEach((prop) => {
        name = format(prop).name;
        searchParams += `\n\t\t\t\t${name.toLocaleLowerCase()}: null,`;
    });
    return searchParams;
};

const getSearchInputs = (props) => {
    let [name, type] = [" ", " "];
    let formatProp = {};
    return props.map((prop) => {
        formatProp = format(prop);
        [name, type] = [formatProp.name, formatProp.type];
        if (!formatProp.isArray || !formatProp.isCustom){
            return createInput(name, type);
        }
        else // Array o Custom prop - TODO - agregar soporte
            return;
    }).join("").trim();
};

const createInput = (name, type) => {
    switch (type){
    case "Boolean":
        return (`<Col md={4}>
                <span style={{fontWeight: 600}}>${capitalizeString(name)}</span><br/>
                Ambos <input type='radio' checked={this.state.searchParams.${name} === null} onChange={(e) => this.onChange(null, "${name}")}/>
                &nbsp;Sí <input type='radio' checked={this.state.searchParams.${name} === true} onChange={(e) => this.onChange(true, "${name}")}/>
                &nbsp;No <input type='radio' checked={this.state.searchParams.${name} === false} onChange={(e) => this.onChange(false, "${name}")}/>
            </Col>
            `);
    case "Date":
        return (`<Col md={4}>
                <span style={{fontWeight: 600}}>${capitalizeString(name)}</span><br/>
                <input
                    className="form-control"
                    style={{width:"auto"}}
                    type='date'
                    onChange={(e) => this.onChange(e.target.value, "${name}")}
                />
            </Col>
            `);
    default:
        return (`<Col md={4}>
                <span style={{fontWeight: 600}}>${capitalizeString(name)}</span><br/>
                <input
                    className="form-control"
                    type='text'
                    onChange={(e) => this.onChange(e.target.value, "${name}")}
                />
            </Col>
            `);
    }
};

module.exports = abmSearcherFile = (name, props) => (
    `import React from 'react'
import Col from 'react-bootstrap/Col'

import Searcher from '../../layout/Searcher'
import { initialQueryParams } from './consts'


export default class ${name}Searcher extends Searcher {
    constructor(props) {
        super(props)
        this.state = {
            searchParams: {${getSearchParams(props)}
            }
        }
    }

    search = (offset=initialQueryParams.offset, limit=initialQueryParams.limit) => {
        this.props.search({searchParams: this.state.searchParams, offset, limit})
    }

    getSearcherForm = () => (
        <React.Fragment>
            ${getSearchInputs(props)}
        </React.Fragment>
    )
}
`
);
const { capitalizeString, format } = require("../utils");

const getFormInputs = (abmName, internalModel) => {
    let formatProp = {};
    let [name, type] = ["", ""];
    return internalModel.props.map((prop) => {
        formatProp = format(prop);
        [name, type] = [formatProp.name, formatProp.type];
        return createComponent(abmName, name, type);
    }).join("").trim();
};

const getVisualizacionInputs = (internalModel) => {
    let formatProp = {};
    let [name, type] = ["", ""];
    return internalModel.props.map((prop) => {
        formatProp = format(prop);
        [name, type] = [formatProp.name, formatProp.type];
        if (type === "Boolean") return(`<Col md={4}>{this.state.${name} ? 'Sí' : 'No'}</Col>\b\t`);
        else if (type === 'Date') return(`<Col md={4}>{moment.utc(this.state.${name}).format("DD/MM/YYYY")}</Col>
                `);
        else return (`<Col md={4}>{this.state.${name}}</Col>
                `);
    }).join("").trim();
};

const createComponent = (abmName, name, type) => {
    switch (type){
    case "Date":
        return (`<Col md={4}>
                    <GotenTextField
                        id="${abmName}_input_${name}"
                        ref={this.input${capitalizeString(name)}Ref}
                        className="form-control hide-picker"
                        type={'date'}
                        errorRequiredMessage={'Este campo es requerido'}
                        required={false}
                        showError={true}
                        onChange={(e) => this.changeInputValue(e.target.value, '${name}')}
                        value={this.state.${name}}
                    />
                </Col>
                `);
    case "Boolean":
        return (`<Col md={4}>
                    <Row>
                        <Col md={3}>Sí&nbsp;<GotenTextField
                                id="${abmName}_input_si"
                                type="radio"
                                onChange={(e) => this.changeInputValue(true, '${name}')}
                                checked={this.state.${name}}
                            />
                        </Col>
                        <Col md={3}>No&nbsp;<GotenTextField
                                id="${abmName}_input_no"
                                type="radio"
                                onChange={(e) => this.changeInputValue(false, '${name}')}
                                checked={!this.state.${name}}
                            />
                        </Col>
                    </Row>
                </Col>
                `);
    case "String": 
        return (`<Col md={4}>
                    <GotenTextField
                        id="${abmName}_input_${name}"
                        ref={this.input${capitalizeString(name)}Ref}
                        className="form-control"
                        type={'text'}
                        errorRequiredMessage={'Este campo es requerido'}
                        required={false}
                        showError={true}
                        onChange={(e) => this.changeInputValue(e.target.value, '${name}')}
                        value={this.state.${name}}
                    />
                </Col>
                `);
    default: 
        return (`<Col md={4}>
                    <GotenTextField
                        id="${abmName}_input_${name}"
                        ref={this.input${capitalizeString(name)}Ref}
                        className="form-control"
                        type={'number'}
                        errorRequiredMessage={'Este campo es requerido'}
                        required={false}
                        showError={true}
                        onChange={(e) => this.changeInputValue(e.target.value, '${name}')}
                        value={this.state.${name}}
                    />
                </Col>
                `);
    }
};

const getLabelInputs = (abmName, internalModel) => {
    let formatProp = {};
    let name = "";
    return internalModel.props.map((prop) => {
        formatProp = format(prop);
        name = formatProp.name;
        return (`<Col md={4}>
                        <label id="${abmName}_label_${name}">${capitalizeString(name)}</label>
                        <br/>
                    </Col>
                    `);
    }).join("").trim();
};

const getStateValues = (internalModel) => {
    let formatProp = {};
    let [name, type] = ["", ""];
    let stateValues = "";
    internalModel.props.forEach((prop) => {
        formatProp = format(prop);
        [name, type] = [formatProp.name, formatProp.type];
        stateValues += `\n\t\t\t${name}: ${getValueFromType(type)},`;
    });
    return stateValues;
};

const getValueFromType = (type) => {
    switch(type){
    case "Boolean":
    case "Date":
        return "null";
    case "Number":
        return "0";
    default:
        return "\"\"";
    }
};

const getCreateRefs = (internalModel) => {
    let createRefs = "";
    let formatProp = {};
    let name = "";
    internalModel.props.forEach((prop) => {
        formatProp = format(prop);
        name = formatProp.name;
        createRefs += `\n\t\tthis.input${capitalizeString(name)}Ref = React.createRef()`;
    });
    return createRefs;
};

const getValidateCondition = (internalModel) => {
    let isCondition = "";
    let condition = "";
    let formatProp = {};
    let name = "";
    internalModel.props.forEach((prop) => {
        formatProp = format(prop);
        name = formatProp.name;
        name = capitalizeString(name);
        isCondition += `\n\t\tlet is${name}Valid = !this.input${name}Ref.current.validate().error`;
        condition += `is${name}Valid\n\t\t\t&& `;
    });
    return isCondition === "" ? "" : isCondition + "\n\t\treturn " + condition.substr(0,condition.length-3).trim();
};

module.exports = abmCustomFormFile = (name, internalModel) => {
    return (`import React from 'react'
import { GotenTextField } from 'goten-react-text-field'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import moment from 'moment'


export default class ${capitalizeString(name)}Form extends React.Component {
    constructor(props) {
        super(props)
        this.state = {${getStateValues(internalModel)}
        }
        ${getCreateRefs(internalModel)}
    }

    changeInputValue = (value, atributo) => {
        this.setState({[atributo]: value})
    }

    getData = () => {
        return this.state
    }

    validate = () => {${getValidateCondition(internalModel)}
    }

    render(){
        return (
            this.props.modoVisualizacion ? 
            <React.Fragment>
                ${getVisualizacionInputs(internalModel)}
            </React.Fragment> :
            <React.Fragment>
                <Row style={{marginLeft: 0, marginRight: 0}}>
                    ${getLabelInputs(name, internalModel)}
                </Row>
                ${getFormInputs(name, internalModel)}
            </React.Fragment>
        )
    }
}
`
    );};
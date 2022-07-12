const { capitalizeString, format } = require("../utils.js");


const getStateAttributes = (internalModel, prop) => {
    if (!internalModel) {
        return `\n\t\t\t${prop.name}: ${getValueFromType(prop.type)}, `;
    }
    let [name, type] = ["", ""];
    let formatProp = {};
    let stateAttributes = "";
    internalModel.props.forEach((prop) => {
        formatProp = format(prop);
        [name, type] = [formatProp.name, formatProp.type];
        stateAttributes += `\n\t\t\t${name}: ${getValueFromType(type)}, `;
    });
    return stateAttributes;
};

const getValueFromType = (type) => {
    switch(type) {
    case "Number":
        return "0";
    case "Date":
        return "undefined";
    case "Boolean":
        return "false";
    default:
        return "''";
    }
};

const getCreateRefs = (internalModel, prop) => {
    if (!internalModel) {
        return `\n\t\tthis.input${capitalizeString(prop.name)}Ref = React.createRef()`;
    }
    let createRefs = "";
    let formatProp = {};
    internalModel.props.forEach((prop) => {
        formatProp = format(prop);
        createRefs += `\n\t\tthis.input${capitalizeString(formatProp.name)}Ref = React.createRef()`;
    });
    return createRefs;
};

const getStateUpdateFunction = (abmName, internalModel, prop) => {
    if (!internalModel) {
        return (`this.setState({${prop.name}: this.props.${prop.name}})`);
    }
    let stateUpdate = "";
    let name = "";
    let formatProp = {};
    internalModel.props.forEach((prop) => {
        formatProp = format(prop);
        name = formatProp.name;
        stateUpdate += `${name}: this.props.${abmName}.${name}, `;
    });
    return "this.setState({"+stateUpdate.substr(0, stateUpdate.length - 2)+"})";
};

const getValidateCondition = (internalModel, prop) => {
    let isCondition = "";
    let condition = "";
    let formatProp = {};
    let name = "";
    if (!internalModel) {
        name = capitalizeString(prop.name);
        return `\n\t\tlet is${name}Valid = !this.input${name}Ref.current.validate().error\n\t\treturn is${name}Valid`;
    }
    internalModel.props.forEach((prop) => {
        formatProp = format(prop);
        name = formatProp.name;
        name = capitalizeString(name);
        isCondition += `\n\t\tlet is${name}Valid = !this.input${name}Ref.current.validate().error`;
        condition += `is${name}Valid\n\t\t\t&& `;
    });
    return isCondition + "\n\t\treturn " + condition.substr(0,condition.length-3).trim();
};

const getFormInputs = (abmName, internalModel, prop) => {
    if (!internalModel) return createComponent(abmName, prop.name, prop.type);
    let formatProp = {};
    let [name, type] = ["", ""];
    return internalModel.props.map((prop) => {
        formatProp = format(prop);
        [name, type] = [formatProp.name, formatProp.type];
        return createComponent(abmName, name, type);
    }).join("").trim();
};

const createComponent = (abmName, name, type) => {
    switch (type){
    case "Date":
        return (`<td>
                    <GotenTextField
                        id="${abmName}_input_${name}"
                        ref={this.input${capitalizeString(name)}Ref}
                        className="form-control"
                        style={{width:"auto"}} 
                        type={'date'}
                        errorRequiredMessage={'Este campo es requerido'}
                        required={true}
                        showError={true}
                        onChange={(e) => this.changeInputValue(e.target.value,'${name}')}
                        value={this.state.${name}}
                    />
                </td>
                `);
    case "Boolean":
        return (`<td>
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
                </td>
                `);
    case "String": 
        return (`<td>
                    <GotenTextField
                        id="${abmName}_input_${name}"
                        ref={this.input${capitalizeString(name)}Ref}
                        className="form-control"
                        type={'text'}
                        errorRequiredMessage={'Este campo es requerido'}
                        required={true}
                        showError={true}
                        onChange={(e) => this.changeInputValue(e.target.value, '${name}')}
                        value={this.state.${name}}
                    />
                </td>
                `);
    default: 
        return (`<td>
                    <GotenTextField
                        id="${abmName}_input_${name}"
                        ref={this.input${capitalizeString(name)}Ref}
                        className="form-control"
                        type={'number'}
                        errorRequiredMessage={'Este campo es requerido'}
                        required={true}
                        showError={true}
                        onChange={(e) => this.changeInputValue(e.target.value, '${name}')}
                        value={this.state.${name}}
                    />
                </td>
                `);
    }
};

const getVisualizacionInputs = (internalModel, prop) => {
    if (!internalModel) return (`<td>{this.state.${prop.name}}</td>`);
    let formatProp = {};
    let [name, type] = ["", ""];
    return internalModel.props.map((prop) => {
        formatProp = format(prop);
        [name, type] = [formatProp.name, formatProp.type];
        if (type === "Boolean") return(`<td>{this.state.${name} ? 'Sí' : 'No'}</td>
                `);
        else if (type === 'Date') return(`<td>{moment.utc(this.state.${name}).format("DD/MM/YYYY")}</td>
                `);
        else return (`<td>{this.state.${name}}</td>
                `);
    }).join("").trim();
};

module.exports = abmArrayRowFile = (name, internalModel, prop) => {
    const capitalizedName = capitalizeString(name);
    return (
        `import React from 'react'
import { GotenTextField } from 'goten-react-text-field'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import moment from 'moment'


export default class ${capitalizedName}Row extends React.Component {
    constructor(props) {
        super(props)
        this.state = {${getStateAttributes(internalModel, prop)}
        }${getCreateRefs(internalModel, prop)}
    }

    componentDidMount() {
        ${getStateUpdateFunction(name, internalModel, prop)}
    }

    componentDidUpdate(prevProps) {
        if (this.props.${name} !== prevProps.${name}){
            ${getStateUpdateFunction(name, internalModel, prop)}
        }
    }

    changeInputValue = (value, atributo) => {
        this.setState({[atributo]: value})
    }

    getValues = () => {
        return this.state${internalModel ? ("") : (`.${prop.name}`)}
    }

    validate = () => {${getValidateCondition(internalModel, prop)}
    }

    render(){
        return (
            this.props.modoVisualizacion ? 
            <React.Fragment>
                ${getVisualizacionInputs(internalModel, prop)}
            </React.Fragment> :
            <React.Fragment>
                ${getFormInputs(name, internalModel, prop)}
            </React.Fragment>
        )
    }
}
`
);};

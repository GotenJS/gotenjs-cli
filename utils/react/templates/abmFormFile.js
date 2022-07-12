const { capitalizeString, format } = require("../utils.js");

const getFormInputs = (lowerCaseName, props) => {
    let formInputs = "";
    let formatProp = {};
    let [name, type] = ["", ""];
    props.forEach((prop) => {
        formatProp = format(prop);
        [name, type] = [formatProp.name, formatProp.type];
        if(formatProp.isArray) type = "Array";
        formInputs += `\n\t\t\t\t${name.toLocaleLowerCase()}: ${getValueFromType(type, name.toLocaleLowerCase(), lowerCaseName)},`;
    });
    return formInputs;
};

const getValueFromType = (type, name, lowerCaseName) => {
    switch(type) {
    case "Number":
        return `props.${lowerCaseName} ? props.${lowerCaseName}.${name} : 0`;
    case "Date":
        return `props.${lowerCaseName} ? this.formatDate(props.${lowerCaseName}.${name}) : undefined`;
    case "Boolean":
        return `props.${lowerCaseName} ? props.${lowerCaseName}.${name} : false`;
    case "String":
        return `props.${lowerCaseName} ? props.${lowerCaseName}.${name} : ''`;
    case "Array":
        return `props.${lowerCaseName} ? props.${lowerCaseName}.${name} : []`;
    default: // Custom prop
        return `props.${lowerCaseName} ? props.${lowerCaseName}.${name} : {}`;
    }
};

const importProps = (props) => {
    let imports = "";
    let formatProp = {};
    let name = "";
    let capitalizedName = "";
    props.forEach((prop) => {
        formatProp = format(prop);
        name = formatProp.name;
        capitalizedName = capitalizeString(name);
        if (formatProp.isArray) {
            imports += `\nimport ${capitalizedName}List from './${capitalizedName}List'`;
        } else if(formatProp.isCustom) { // Custom prop
            imports += `\nimport ${capitalizedName}Form from './${capitalizedName}Form'`;
        }
    });
    return imports;
};

const getFormData = (props) => {
    let formData = "const formData = {...this.state.formInputValues";
    let formatProp = {};
    let name = "";
    props.forEach((prop) => {
        formatProp = format(prop);
        name = formatProp.name;
        if(formatProp.isArray || formatProp.isCustom) { // Array or custom props
            formData += `,\n\t\t\t${name.toLocaleLowerCase()}: this.${name.toLocaleLowerCase()}Ref.current.getData()`;
        }
    });
    return formData+"}";
};

const createRefs = (props) => {
    let refs = "";
    let formatProp = {};
    let name = "";
    props.forEach((prop) => {
        formatProp = format(prop);
        name = formatProp.name;
        if(formatProp.isArray || formatProp.isCustom) { // Array or custom props
            refs += `\n\t\tthis.${name.toLocaleLowerCase()}Ref = React.createRef()`;
        }
    });
    return refs;
};

const validateListsData = (props) => {
    let validate = "";
    let formatProp = {};
    let name = "";
    props.forEach((prop) => {
        formatProp = format(prop);
        name = formatProp.name;
        if(formatProp.isArray || formatProp.isCustom) { // Array or custom props
            if (validate !== "") validate += "\n\t\t\t && ";
            validate += `this.${name.toLocaleLowerCase()}Ref.current.validate().isValid`;
        }
    });
    return validate === "" ? "true" : validate;
};

const getInputsNativeProps = (props) => {
    let formatProp = {};
    let [name, type] = ["", ""];
    return props.map((prop) => {
        formatProp = format(prop);
        [name, type] = [formatProp.name, formatProp.type];
        if (formatProp.isArray) {
            return createArrayComponent(name.toLocaleLowerCase());
        } else if(formatProp.isCustom) { // Custom prop
            return;
        } else {
            return createComponent(name.toLocaleLowerCase(), type);
        }
    }).join("").trim();
};

const createComponent = (name, type) => {
    switch (type){
    case "Date":
        return (`<Col md={5}>
                        <label>
                            ${capitalizeString(name)}
                        </label><br/>
                        <GotenTextField
                            id="${name}_input"
                            disabled={this.props.modoVisualizacion}
                            className={this.props.modoVisualizacion? "form-control hide-picker" : "form-control"}
                            style={{width:"auto"}}
                            type={'date'}
                            errorRequiredMessage={'Este campo es requerido'}
                            required={false}
                            showError={true}
                            onChange={(e) => this.changeInputValue(e.target.value, '${name}')}
                            value={this.state.formInputValues.${name}}
                        />
                    </Col>
                    `);
    case "Boolean":
        return (`<Col md={4}>
                        <label>
                            ${capitalizeString(name)}
                        </label><br/>
                        <Row>
                            <Col md={3}>Sí&nbsp;<GotenTextField
                                    id="${name}_si_input"
                                    disabled={this.props.modoVisualizacion}
                                    type="radio"
                                    onChange={(e) => this.changeInputValue(true, '${name}')}
                                    checked={this.state.formInputValues.${name}}
                                />
                            </Col>
                            <Col md={3}>No&nbsp;<GotenTextField
                                    id="${name}_no_input"
                                    disabled={this.props.modoVisualizacion}
                                    type="radio"
                                    onChange={(e) => this.changeInputValue(false, '${name}')}
                                    checked={!this.state.formInputValues.${name}}
                                />
                            </Col>
                        </Row>
                    </Col>
                    `);
    default: 
        return (`<Col md={4}>
                        <label>
                            ${capitalizeString(name)}
                        </label><br/>
                        <GotenTextField
                            id="${name}_input"
                            disabled={this.props.modoVisualizacion}
                            className="form-control"
                            type={'text'}
                            errorRequiredMessage={'Este campo es requerido'}
                            required={false}
                            showError={true}
                            onChange={(e) => this.changeInputValue(e.target.value, '${name}')}
                            value={this.state.formInputValues.${name}}
                        />
                    </Col>
                    `);
    }
};
const createArrayComponent = (name) => {
    return (`<Col md={12}>
                        <label>
                            ${capitalizeString(name)}
                        </label><br/>
                        <${capitalizeString(name)}List
                            ref={this.${name}Ref}
                            ${name}={this.state.formInputValues.${name}}
                            modoVisualizacion={this.props.modoVisualizacion}
                        />
                    </Col>
                    `);
};
const createCustomComponent = (name) => {
    return (`<br/>
                <Row>
                    <Col md={12}>
                        <label>
                            ${capitalizeString(name)}
                        </label>
                    </Col>
                    <${capitalizeString(name)}Form
                        ref={this.${name}Ref}
                        ${name}={this.state.formInputValues.${name}}
                        modoVisualizacion={this.props.modoVisualizacion}
                    />
                </Row>
            `);
};

const getInputsCustomProps = (props) => {
    let formatProp = {};
    let name = "";
    return props.map((prop) => {
        formatProp = format(prop);
        name = formatProp.name;
        if(formatProp.isCustom && !formatProp.isArray) // Custom prop
            return createCustomComponent(name.toLocaleLowerCase());
    }).join("").trim();
};

module.exports = abmFormFile = (name, props) => {
    const lowerCaseName = name.toLowerCase();
    return (
        `import React from 'react'
import { GotenForm } from 'goten-react-form'
import { GotenTextField } from 'goten-react-text-field'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import '../moduleStyles.css'

import ${name} from './${name}'${importProps(props)}


export default class ${name}Form extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            ${lowerCaseName}: props.${lowerCaseName} ? new ${name}(props.${lowerCaseName}) : new ${name}(),
            formInputValues: {${getFormInputs(lowerCaseName, props)}
            }
        }
        this.gotenFormRef = React.createRef()${createRefs(props)}
    }

    formatDate = (dateInISO) => {
        return dateInISO.split('T')[0]
    }

    get${name} = () => {
        ${getFormData(props)}
        this.state.${lowerCaseName}.setValues(formData)
        return (this.state.${lowerCaseName})
    }

    changeInputValue = (value, atributo) => {
        this.setState({formInputValues: {...this.state.formInputValues, [atributo]: value}})
    }

    validate = () => {
        const listValidation = ${validateListsData(props)}
        if (listValidation) {
            this.gotenFormRef.current.validate()
        }
    }
    
    render(){
        return(
            <GotenForm
                ref={this.gotenFormRef}
                onSuccess={() => this.props.onSuccess()}
                onError={() => console.log("ERROR")}
            >
                <Row>
                    ${getInputsNativeProps(props)}
                </Row>
                ${getInputsCustomProps(props)}
            </GotenForm>
        )
    }
}
`
    );};
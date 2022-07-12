const { capitalizeString, format, getFormatPropertyName } = require("../utils.js");

const getObjetoInternalModel = (internalModel) => {
    let objetoInternalModel = "";
    let formatProp = {};
    let [name, type] = ["", ""];
    internalModel.props.forEach((prop) => {
        formatProp = format(prop);
        [name, type] = [formatProp.name, formatProp.type];
        objetoInternalModel += `\n\t${name}: ${getValueFromType(type)},`;
    });
    return objetoInternalModel;
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

const getListTitleFromProps = (internalModel) => {
    if (!internalModel) return "\"Valores\"";
    let listTitle = "[";
    let name = "";
    internalModel.props.forEach((prop) => {
        name = getFormatPropertyName(prop);
        listTitle += `'${capitalizeString(name)}', `;
    });
    return listTitle.substr(0,listTitle.length-2)+"]";
};

// TODO - Ver tema de nombres en plural (usar internalModel.className?)
module.exports = abmArrayListFile = (name, internalModel, prop) => {
    const capitalizedName = capitalizeString(name);
    return (
        `import React from 'react'
import { GotenList } from 'goten-react-list'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button'

import ${capitalizedName}Row from './${capitalizedName}Row'


${internalModel ? (`const objeto${capitalizedName} = {${getObjetoInternalModel(internalModel)}
}`) : ("")}

export default class ${capitalizedName}List extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ${name}List: props.${name}
        }
        this.${name}Refs = []
        this.gotenListRef = React.createRef()
    }

    componentDidMount(){
        this.getItems()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.${name}List !== this.state.${name}List)
            this.getItems()
    }

    add${capitalizedName} = () => {
        let newArray${capitalizedName} = this.getData()
        newArray${capitalizedName}.push(${internalModel ? (`{...objeto${capitalizedName}}`) : "null"})
        this.setState({
            ...this.state,
            ${name}List: newArray${capitalizedName}
        })
    }
    
    delete${capitalizedName} = (index) => {
        this.setState({
            ...this.state,
            ${name}List: this.getData().filter((${name}, i) => index !== i)
        })
    }

    getData = () => {
        let data = []
        this.${name}Refs.forEach(ref => {
            if (ref.current === null) return
            data.push(ref.current.getValues())
        })
        return data
    }

    crear${capitalizedName} = (${name}, i) => {
        const ref = React.createRef()
        this.${name}Refs.push(ref)
        this.gotenListRef.current.addItem(
            <${capitalizedName}Row 
                id={i}
                key={i}
                ref={ref}
                ${name}={${name}}
                delete${capitalizedName}={this.delete${capitalizedName}}
                modoVisualizacion={this.props.modoVisualizacion}
            />
        )
    }

    getItems = () => {
        this.gotenListRef.current.removeItems()
        this.state.${name}List.forEach((${name}, i) => this.crear${capitalizedName}(${name}, i))
    }

    validate = () => {
        let isValid = true
        let data = []
        this.${name}Refs.forEach(ref => {
            if (ref.current === null) return
            if (!ref.current.validate())
                isValid = false
            else 
                data.push(ref.current.getValues())
        })
        return {isValid, data}
    }

    render() {
        return (
            <React.Fragment>
                {!this.props.modoVisualizacion && 
                    <Button variant="success" onClick={this.add${capitalizedName}}>
                        <FontAwesomeIcon style={{marginRight: 0}} icon={faPlus}/>
                    </Button>
                }
                <GotenList
                    title={${getListTitleFromProps(internalModel)}}
                    actionsTitle={this.props.modoVisualizacion ? '' : 'Acciones'}
                    onRemove={!this.props.modoVisualizacion ? 
                        (component) => this.delete${capitalizedName}(component.props.id) :
                        undefined
                    }
                    removeIconColor='red'
                    ref={this.gotenListRef}
                    useComponentAsRow
                />
            </React.Fragment>
        )
    }
}
`
    );};
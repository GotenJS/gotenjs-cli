const { capitalizeString, getFormatPropertyName } = require("../../utils.js");

const getPropNames = (props) => {
    let attributesNames = "[";
    let name = "";
    props.forEach((prop) => {
        name = getFormatPropertyName(prop);
        attributesNames += `'${capitalizeString(name)}', `;
    });
    return attributesNames.substr(0,attributesNames.length-2)+"]";
};

module.exports = abmListFile = (name, props) => {
    const lowerCaseName = name.toLowerCase();
    return (
        `import React from 'react'
import { GotenList } from 'goten-react-list'

import ${name}Row from './Row'
import Edit${name}Modal from './EditModal'
import Inspect${name}Modal from './InspectModal'
import ButtonWithAlert from '../../layout/ButtonWithAlert'

import { with${name} } from './${name}Context'
import { withNotifier } from '../../SnackbarContext'


export class ${name}List extends React.Component {
    constructor() {
        super()
        this.inspectModalRef = React.createRef()
        this.editModalRef = React.createRef()
        this.gotenListRef = React.createRef()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.${lowerCaseName}s !== this.props.${lowerCaseName}s)
            this.getItems()
    }

    add${name} = (${lowerCaseName}) => {
        this.gotenListRef.current.addItem(<${name}Row ${lowerCaseName}={${lowerCaseName}}/>)
    }

    getItems = () => {
        this.gotenListRef.current.removeItems()
        this.props.${lowerCaseName}s.forEach((${lowerCaseName}) => this.add${name}(${lowerCaseName}))
    }

    onRemove = (component) => {
        this.delete${name}(component.props.${lowerCaseName}.id || component.props.${lowerCaseName}.id)
    }

    onSearch = (component) => {
        this.inspectModalRef.current.openModal(component.props.${lowerCaseName})
    }

    onEdit = (component) => {
        this.editModalRef.current.openModal(component.props.${lowerCaseName})
    }

    delete${name} = async (id) => {
        try {
            const response = await this.props.delete${name}(id)
            this.props.showSnackbar({message: response.message, messageType: "success"})
        } catch (e) {
            this.props.showSnackbar({
                message: \`Hubo un error eliminando el ${lowerCaseName}. Error: \${e}\`,
                messageType: "error"
            })
        }
    }

    edit${name} = async (data) => {
        try {
            const response = await this.props.edit${name}(data)
            this.props.showSnackbar({message: response.message, messageType: "success"})
        } catch (e) {
            this.props.showSnackbar({
                message: \`Hubo un error editando el ${lowerCaseName}. Error: \${e}\`,
                messageType: "error"
            })
        }
    }

    render() {
        return (
            <React.Fragment>
                <GotenList
                    title={${getPropNames(props)}}
                    actionsTitle='Acciones'
                    onEdit={this.onEdit}
                    onRemove={this.onRemove}
                    customRemoveButton={(props) => 
                        <ButtonWithAlert alertTitle="Está seguro que desea eliminar?" {...props}/>
                    }
                    onSearch={this.onSearch}
                    ref={this.gotenListRef}
                    removeIconColor='red'
                    useComponentAsRow
                />
                <Edit${name}Modal ref={this.editModalRef} edit${name}={this.edit${name}}/>
                <Inspect${name}Modal ref={this.inspectModalRef}/>
            </React.Fragment>
        )
    }
}

export default withNotifier(with${name}(${name}List))
`
    );};
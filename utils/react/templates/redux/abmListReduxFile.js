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
import { connect } from 'react-redux'
import { GotenList } from 'goten-react-list'

import ${name}Row from './Row'
import Edit${name}Modal from './EditModal'
import Inspect${name}Modal from './InspectModal'
import ButtonWithAlert from '../../layout/ButtonWithAlert'

import { ${lowerCaseName}Operations } from './duck'


export class ${name}List extends React.Component {
    constructor() {
        super()
        this.inspectModalRef = React.createRef()
        this.editModalRef = React.createRef()
        this.gotenListRef = React.createRef()
    }

    componentDidUpdate(prevProps, prevState) {
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
        this.props.delete${name}(component.props.${lowerCaseName}.id)
    }

    onSearch = (component) => {
        this.inspectModalRef.current.openModal(component.props.${lowerCaseName})
    }

    onEdit = (component) => {
        this.editModalRef.current.openModal(component.props.${lowerCaseName})
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
                <Edit${name}Modal ref={this.editModalRef} edit${name}={this.props.edit${name}}/>
                <Inspect${name}Modal ref={this.inspectModalRef}/>
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    delete${name}: (id) => {
        dispatch(${lowerCaseName}Operations.delete${name}Action(id))
        dispatch(${lowerCaseName}Operations.get${name}sAction())
    },
    edit${name}: (data) => dispatch(${lowerCaseName}Operations.edit${name}Action(data)),
})

export default connect(null, mapDispatchToProps, null, {forwardRef: true})(${name}List)
`
    );};

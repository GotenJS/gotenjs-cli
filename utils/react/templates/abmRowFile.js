const { format } = require("../utils");

const getTableElements = (abmName, props) => {
    let tableElements = "";
    let [name, type] = ["", ""];
    let formatProp = {};
    props.forEach((prop) => {
        formatProp = format(prop);
        [name, type] = [formatProp.name, formatProp.type];
        if(formatProp.isArray) type = "Array";
        tableElements += getComponent(abmName, name.toLocaleLowerCase(), type);
    });
    return tableElements.trim();
};

const getComponent = (abmName, name, type) => {
    switch(type) {
    case "Boolean":
        return (`<td>
                    {${abmName}.${name} ? "Sí" : "No"}
                </td>
                `);
    case "Array":
        return (`<td>
                    {${abmName}.${name}.length}
                </td>
                `)
    case 'Date':
      return (`<td>
                   {moment.utc(${abmName}.${name}).format("DD/MM/YYYY")}
                </td>
                `);
    default:
        return (`<td>
                    {${abmName}.${name}}
                </td>
                `);
    }

};

module.exports = abmRowFile = (name, props) => {
  const lowerCaseName = name.toLowerCase();
  return (
`import React from 'react'
import moment from 'moment'

export default class ${name}Row extends React.Component {
    render(){
        const { ${lowerCaseName} } = this.props
        return (
            <React.Fragment>
                ${getTableElements(lowerCaseName, props)}
            </React.Fragment>
        )
    }
}
`
    );};
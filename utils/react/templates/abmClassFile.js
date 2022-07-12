const { format } = require("../utils");

const getProps = (props, abmName) => {
    let attributes = "";
    let formatProp = {};
    let [name, type] = ["", ""];
    props.forEach((prop) => {
        formatProp = format(prop);
        [name, type] = [formatProp.name, formatProp.type];
        if(formatProp.isArray) type = "Array";
        attributes += `\n\t\tthis.${name.toLocaleLowerCase()} = ${getValueFromType(type, name.toLocaleLowerCase(), abmName)}`;
    });
    return attributes;
};

const getValueFromType = (type, name, abmName) => {
    switch(type) {
    case "Number":
        return `${abmName} ? ${abmName}.${name} : 0`;
    case "Date":
        return `${abmName} ? ${abmName}.${name} : null`;
    case "Boolean":
        return `${abmName} ? ${abmName}.${name} : false`;
    case "String":
        return `${abmName} ? ${abmName}.${name} : ''`;
    case "Array":
        return `${abmName} ? ${abmName}.${name} : []`;
    default: // Custom prop
        return `${abmName} ? ${abmName}.${name} : {}`;
    }
};

module.exports = abmClassFile = (name, props) => {
    const lowerCaseName = name.toLowerCase();
    return (
        `class ${name}{
    constructor(${lowerCaseName} = null){
        this.id = ${lowerCaseName} ? ${lowerCaseName}.id : null${getProps(props, lowerCaseName)}
    }

    setValues(data){
        Object.assign(this, data)
    }
}

export default ${name}
`
    );};
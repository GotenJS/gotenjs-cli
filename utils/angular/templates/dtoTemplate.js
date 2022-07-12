const utils = require("../utils");

const dtoText = (name, options) => {
    const props = options.props;
    const formatProps = props.map(prop => utils.format(prop));
    const propsLists = formatProps.filter(prop => prop.isArray).map(prop => prop.name);
    const propsCustom = formatProps.filter(prop => prop.isCustom && !prop.isArray);

    return `${options.internalModels.map(internalModel => internalDtoTxt(internalModel.className, internalModel)).join("\n")}
export class ${name}DTO {
    public id: any;
    ${props.map(prop => "public " + utils.getDefineProp(prop) + ";").join("\n    ")}

    constructor() {
        ${propsLists.map(prop => "this." + prop + " = [];").join("\n        ")}
        ${propsCustom.map(prop => `this.${prop.name} = new ${prop.type}();`).join("\n        ")}
    }
}
`;
};

const internalDtoTxt = (name, options) => {
    const props = options.props;
    return `export class ${utils.getFormatType(name)} {
    public id: any;
    ${props.map(prop => "public " + utils.getDefineProp(prop) + ";").join("\n    ")}
}
`;
};

module.exports = dtoText;

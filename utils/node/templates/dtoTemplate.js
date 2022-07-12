const paths = require("../paths");
const utils = require("../utils");

const daoText = (name, props) => {
    props = props.map(prop => `${prop}: null`);
    return `const GenericModelDTO = require('${paths.importPath(paths.dirs.dtos, paths.dirs.dtos + "genericModelDTO")}')

class ${name}DTO extends GenericModelDTO {
    constructor(){
		super()
		this.id = null
		${props.map(prop => `this.${utils.getFormatPropertyName(prop)} = null`).join("\n\t\t")}
    }

    hydrate(data){
        super.hydrate(data)
    }
}

module.exports = ${name}DTO`;
};

module.exports = daoText;

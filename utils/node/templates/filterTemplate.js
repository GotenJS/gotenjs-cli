const paths = require("../paths");
const utils = require("../utils");
const modelText = (name, props) => {
    if (props.length == 0){
        props = ["testField: String"];
    }
    props = props.map(prop => `${prop}: null`);
    return `const GenericFilter = require('${paths.importPath(paths.dirs.filters, paths.genericsFiles.genericFilter)}');
class ${name}Filter extends GenericFilter{
    constructor(){
        super();
        this.data =  Object.assign(this.data,{
            ${props.map(prop => utils.getFormatPropertyName(prop)+": null,").join("\n\t\t\t")}
        })
    }

};

module.exports = ${name}Filter;`;
};
module.exports = modelText;
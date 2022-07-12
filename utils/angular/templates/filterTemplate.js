const utils = require("../utils");
const filterText = (name, options) => {
    const props = options.props.filter(prop =>  utils.isNativeProp(prop));
    return `import { GenericFilter } from './generic.filter';

export class ${name}Filter extends GenericFilter {
${props.map(prop => "    public " + utils.getDefineProp(prop) + ";").join("\n")}
}
`;
};

module.exports = filterText;

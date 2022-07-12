const utils = require("../utils");

const modelMongoText = (name, fields, database) => {

    const formatProps = fields.map(prop => utils.format(prop, database));
	
    const props = formatProps.filter(prop => {
        return !prop.isCustom;
    });

    const customProps = formatProps.filter(prop => {
        return prop.isCustom;
    });

    return `const mongoose = require('mongoose');
const Schema = mongoose.Schema;
${customProps
        .map(customProp => `const ${customProp.type}Schema = require('./${customProp.type.toLowerCase()}').schema;`)
        .join("\n")
}

const ${name}Schema = Schema({
	${props
        .map(prop => `${prop.name}: {
		type: ${prop.isArray ? `[${prop.type}]` : prop.type},
	},`)
        .join("\n\t")
}
	${customProps
        .map(prop => `${prop.name}: {
		type: ${prop.isArray ? `[${prop.type}Schema]` : `${prop.type}Schema`},
	},`)
        .join("\n\t")
}
});

module.exports = mongoose.model('${name}', ${name}Schema);`;
};
module.exports = modelMongoText;
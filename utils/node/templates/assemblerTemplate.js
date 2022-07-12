const utils = require("../utils");
const engines = require("../engines");

const serviceText = (name, options) => {
    const lowerName = name.toLowerCase();
	
    const formatProps = options.props.map(prop => utils.format(prop, options.database));

    const props = formatProps.filter(prop => {
        return !prop.isCustom;
    }).map(prop => prop.name);

    const customProps = formatProps.filter(prop => {
        return prop.isCustom;
    });

    return `const GenericAssembler = require('./genericAssembler')
${customProps
        .map(customProp => customProp.type)
        .map(customProp => `const ${customProp}Assembler = require('./${customProp.toLowerCase()}Assembler')`)
        .join("\n")
}

const ${name} = ${engines.isRelational(options.database.name) ? 
    `require('../models/').${name}`
    :`require('../models/${lowerName}')`}
const ${name}DTO = require('../dtos/${lowerName}DTO')

class ${name}Assembler extends GenericAssembler{

	static toDTOs(${lowerName}s) {
		return super.convertList(${lowerName}s, ${name}Assembler.toDTO)
	}

	static fromDTOs(${lowerName}sDTO) {
		return super.convertList(${lowerName}sDTO, ${name}Assembler.fromDTO)
	}

	static toDTO(${lowerName}) {
		const ${lowerName}DTO = super.toDTO(${lowerName}, ${name}DTO)
		${props
        .map(prop => `${lowerName}DTO.${prop} = ${lowerName}.${prop}`)
        .join("\n\t\t")
}
		${customProps
        .map(customProp => `${lowerName}DTO.${customProp.name} = ${customProp.type}Assembler.${customProp.isArray ? "toDTOs" : "toDTO"}(${lowerName}.${customProp.name})`)
        .join("\n\t\t")
}
		return ${lowerName}DTO
	}

	static fromDTO(${lowerName}DTO) {
		const ${lowerName} = super.fromDTO(${lowerName}DTO, ${name})
		${props
        .map(prop => `${lowerName}.${prop} = ${lowerName}DTO.${prop}`)
        .join("\n\t\t")
}
		${customProps
        .map(customProp => `${lowerName}.${customProp.name} = ${customProp.type}Assembler.${customProp.isArray ? "fromDTOs" : "fromDTO"}(${lowerName}DTO.${customProp.name})`)
        .join("\n\t\t")
}
		return ${lowerName}
	}

}

module.exports = ${name}Assembler`;
};

module.exports = serviceText;
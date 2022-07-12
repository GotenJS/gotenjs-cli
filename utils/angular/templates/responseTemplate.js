const responseText = (name) => {
    const lowerName = name.toLowerCase();
    return `import { GenericResponse, GenericListResponse } from './generic.response';
import { ${name}DTO } from '../${lowerName}.dto';

export class ${name}sResponse extends GenericListResponse<${name}DTO> { }
export class ${name}Response extends GenericResponse<${name}DTO> { }
`;
};

module.exports = responseText;

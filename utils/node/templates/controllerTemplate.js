const paths = require("../paths");

const controllerText = (name, plugins) => {
    const lowerName = name.toLowerCase();
    const version=plugins.includes("versioning") ? "v/" : "";
    return `const GenericController = require('${paths.importPath(paths.dirs.controllers + version , paths.genericsFiles.genericController)}')
const ${name}Service = require('${paths.importPath(paths.dirs.controllers + version , paths.dirs.services + lowerName + "Service")}')
const ${name}DTO = require('${paths.importPath(paths.dirs.controllers + version , paths.dirs.dtos + lowerName + "DTO")}')
const ${name}Filter = require('${paths.importPath(paths.dirs.controllers + version , paths.dirs.filters + lowerName + "Filter")}')
const ${name}Assembler = require('${paths.importPath(paths.dirs.controllers + version, paths.dirs.assemblers + lowerName + "Assembler")}')

class ${name}Controller extends GenericController{

    static get${name}ById(req, res, next) {
        const id = req.params.id
        ${name}Controller.resolve(next, ${name}Service.get(id), ${lowerName} => {
            res.status(200).send({
                data: ${name}Assembler.toDTO(${lowerName}),
            })
        })
    }

    static get${name}s(req, res, next) {
        const filter = new ${name}Filter()
        filter.fillData(req.query)
        ${name}Controller.resolve(next,
                Promise.all([
                    ${name}Service.find(filter), 
                    ${name}Service.count(filter)
                ]), results => {
            res.status(200).send({
                data: {
                    list: ${name}Assembler.toDTOs(results[0]),
                    total:results[1],
                    offset: filter.pagination.offset,
                    limit: filter.pagination.limit
                }
            })
        })
    }
    
    static create${name}(req, res, next) {
        let ${lowerName}DTO = new ${name}DTO()
        ${lowerName}DTO.hydrate(req.body)
        ${name}Controller.resolve(next, ${name}Service.save(${name}Assembler.fromDTO(${lowerName}DTO)), ${lowerName} => {
                res.status(201).send({
                    data: ${name}Assembler.toDTO(${lowerName})
                })
            })
    }
    
    static update${name}(req, res, next) {
        let id = req.params.id
        let ${lowerName}DTO = new ${name}DTO()
        ${lowerName}DTO.hydrate(req.body)
        ${name}Controller.resolve(next, ${name}Service.update(id, ${name}Assembler.fromDTO(${lowerName}DTO)), ${lowerName} => {
                res.status(200).send({
                    data: ${name}Assembler.toDTO(${lowerName})
                })
            })
    }
    
    static delete${name}(req, res, next) {
        let id = req.params.id
        ${name}Controller.resolve(next, ${name}Service.delete(id), message => {
                res.status(200).send({
                    data: message
                })
            })
    }
}

module.exports = ${name}Controller`;
};

module.exports = controllerText;

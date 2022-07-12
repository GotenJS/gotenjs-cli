const paths = require("../paths");

const daoSqlText = (name) => {
    const lowerName = name.toLowerCase();
    return `const models = require('${paths.importPath(paths.dirs.daos, paths.dirs.models+"index")}')
const ${name} = models.${name}

const ${lowerName}Options = {
    include: ${name}.relations(models),
};

class ${name}DAO{
    static save(${lowerName}){
        return ${name}.create(${lowerName}.dataValues, ${lowerName}Options)
    }

    static fetch(id){
        return ${name}.findByPk(id, ${lowerName}Options)
    }

    static find(filter, pagination){
        return ${name}.findAll({where: filter, ...${lowerName}Options, ...pagination})
    }

    static count(filter){
        return ${name}.count({where: filter})
    }

    static update(id, ${lowerName}){
		${lowerName}.id = id
		return ${name}.update(${lowerName}.dataValues, { where: { id }, ...${lowerName}Options })
    }

    static delete(id){
        return new Promise((resolve, reject) => {
            ${name}.destroy({where:{id}}).then((result) => {
                if (result === 1){
                    resolve({id:parseInt(id)});
                } else {
                    reject({message: "Error al eliminar ${lowerName}"});
                }
            })
        })
    }
}

module.exports = ${name}DAO`;
};

module.exports = daoSqlText;
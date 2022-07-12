const paths = require("../paths");

const serviceText = (name, options) => {
    const lowerName = name.toLowerCase();
    return `const ${name}DAO = require('${paths.importPath(paths.dirs.services, paths.dirs.daos + lowerName + "DAO")}')

class ${name}Service{
    static async get(id) {
		try {
			const ${lowerName} = await ${name}DAO.fetch(id)
			return ${lowerName}
		} catch(err) {
			throw err
		}
    }

	static async find(filter) {
		try {
			const ${lowerName}s = await ${name}DAO.find(filter.filterData(), filter.pagination)
			return ${lowerName}s
		} catch(err) {
			throw err
		}
	}

    static async count(filter) {
		try {
			return await ${name}DAO.count(filter.filterData())
		} catch (err) {
			throw err
		}
    }

    static async save(${lowerName}) {
		try {
			${lowerName} = await ${name}DAO.save(${lowerName})
            return ${lowerName}
		} catch (err) {
			throw err
		}
    }

	static async update(id, ${lowerName}) {
		try {
			${lowerName} = await ${name}DAO.update(id, ${lowerName})
			return await this.get(id)
		} catch (err) {
			throw err
		}
    }

    static async delete(id) {
		try {
			return await ${name}DAO.delete(id)
		} catch (err) {
			throw err
		}
    }
}

module.exports = ${name}Service`;
};

module.exports = serviceText;

//TODO resolver sin meterse a _doc en update
const daoMongoText = (name) => {
    const lowerName = name.toLowerCase();
    return `const ${name} = require('../models/${lowerName}');

class ${name}DAO{
    static save(${lowerName}){
        return new Promise((resolve, reject) => {
            ${name}.create(${lowerName}, (err, ${lowerName}Stored) => {
                if (err || !${lowerName}Stored){
                    reject({message: "no pudo guardarse el ${lowerName}"});
                } else {
                    ${lowerName}._id = ${lowerName}Stored._id;
                    resolve(${lowerName});
                }
            });
        })
    }

    static fetch(id){
        return new Promise((resolve, reject) => {
            ${name}.findById(id).exec((err, ${lowerName}) => {
                if (err || !${lowerName}){
                    reject ({message: "No pudo encontrarse el ${lowerName}"});
                } else {
                    resolve(${lowerName});
                }
            })
        })
    }

    static find(filter, pagination){
        return new Promise((resolve, reject) => {
            ${name}.find(filter).limit(pagination.limit).skip(pagination.offset).exec((err, ${lowerName}s) => {
                if (err || !${lowerName}s){
                    reject({message: "no se pudo realizar la busqueda"});
                }else{
                    resolve(${lowerName}s);                    
                }
            })
        })
    }

    static count(filter){
        return new Promise((resolve, reject) => {
            ${name}.count(filter).exec((err, total) => {
                if (err){
                    reject({message: "no se pudo realizar la busqueda"});
                }else{
                    resolve(total);                    
                }
            })
        })
    }

    static update(id, ${lowerName}) {
		const {_id, ...data} = ${lowerName}._doc;
		let dtoUpdate = {$set:data}
        return new Promise((resolve, reject) => {
            ${name}.findByIdAndUpdate(id, dtoUpdate).exec((err, ${lowerName}2) => {
                if (err || !${lowerName}2){
                    console.log(err);
                    reject({message: "error interno"});
                } else {
                    resolve(${lowerName}2);
                }
            })
        })
    }

    static delete(id){
        return new Promise((resolve, reject) => {
            
            ${name}.findByIdAndRemove(id).exec((err, deleted) => {
                if (err || !deleted){
                    reject({message: "no se puede borrar el ${lowerName}"});
                } else {
                    resolve({id:id});
                }
            })
        })
    }
}

module.exports = ${name}DAO`;
};

module.exports = daoMongoText;

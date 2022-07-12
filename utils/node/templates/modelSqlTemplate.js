const utils = require("../utils");

const modelSqlText = (name, props, engine) => {
    const lowerName = name.toLowerCase();
    if (props.length === 0) {
        props = ["testField: String"];
    }
    const relationsTypes = ["hasMany", "belongsTo", "hasOne", "belongsToMany"];
    const fields = props.filter(prop => relationsTypes.every(r => prop.indexOf(r) < 0)).map(field => {
        const formatField = utils.format(field, engine);
        const fieldType = "DataTypes." + formatField.type;
        const fieldName = formatField.name;
        return fieldName + ": " + fieldType;
    } );
    
    const relations = props.filter(prop => relationsTypes.some(r => prop.indexOf(r) >= 0)).map(relation => {
        const relationParts = relation.split(":");
        const relationName = relationParts[0];
        const index = relationParts[1].indexOf("(");
        const relationType = relationParts[1].slice(0, index);
        const relationModel = relationParts[1].slice(index + 1, -1);
        return `{
\t\t\t\tmodel: models.${relationModel},
\t\t\t\tas: '${relationName}',
\t\t\t\ttype: '${relationType}',
\t\t\t\tforeignKey: {name: '${lowerName}_id', allowNull: false},
\t\t\t\tsourceKey: 'id',
\t\t\t},`;
    });
    return `module.exports = (sequelize, DataTypes) => {
    const ${name} = sequelize.define('${name}', {
        ${fields.join(",\n\t\t")}
    }, {
        timestamps: true,
        underscored: true,
        tableName: '${lowerName}',
        indexes: []
    });

    ${name}.relations = (models) => {
        return [
//<associations>
            ${relations.join("\n\t\t\t")}
//</associations>
        ]
    }

    ${name}.associate = function(models) {
        ${name}.relations(models).forEach(relation => {
        const {type, model, ...description} = relation
        ${name}[type](model, description)
        })
    };
    return ${name};
};
`;

//TODO: falta ver las relaciones que no son hasMany y ver como resolverlo
};
module.exports = modelSqlText;
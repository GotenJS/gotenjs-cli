const utils = require("../utils");

const migrationText = (name, options) => {
    const lowerName = name.toLowerCase();
    const props = options.props;

    const relationsTypes = ["hasMany", "belongsTo", "hasOne", "belongsToMany"];
    const fields = props.filter(prop => relationsTypes.every(r => prop.indexOf(r) < 0)).map(field => {
        const formatField = utils.format(field, options.database);
        const fieldName = formatField.name;
        const fieldType = "Sequelize." + formatField.type;
        return fieldName + ": " + fieldType;
    });

    const hasManys = props.filter(prop => prop.indexOf("hasMany") >= 0).map(hasMany => {
        const hasManyParts = hasMany.split(":");
        const index = hasManyParts[1].indexOf("(");
        const hasManyModel = hasManyParts[1].slice(index + 1, -1);
        const lowerHasManyName = hasManyModel.toLowerCase();
        return`.then(() => {
            queryInterface.addColumn('${lowerHasManyName}', '${lowerName}_id', Sequelize.INTEGER, {
                onDelete: 'cascade',
                onUpdate: 'cascade',
                foreignKey: { allowNull: false }
            })
        })`;
    });

    return `module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('${lowerName}', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE,
        
        ${fields.map(field => field + ",").join("\n\t\t")}
        })
        ${hasManys.join("\n\t\t")}
    },
    
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('${lowerName}');
    }
};`;
};
module.exports = migrationText;

//TODO: falta crear las lineas para "down" donde se eliminan las columnas que referencian 
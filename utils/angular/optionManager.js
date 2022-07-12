const utils = require("../angular/utils");

const formatEntities = (options) => {
    const models = [];
    if (options.internalModels) {
        options.internalModels.forEach(element => {
            const customName = utils.getFormatCustomClassName(element);
            const customModel = models.find(model => model.className === customName);
            const prop = utils.getCustomProp(element);
            if (customModel) {
                customModel.props.push(prop);
            } else {
                models.push({
                    className: customName,
                    props: [prop]
                });
            }
        });
    }
    return models;
};

module.exports = {
    formatEntities
};

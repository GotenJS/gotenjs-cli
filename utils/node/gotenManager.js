const utils = require("../utils");
const paths = require("./paths");
const gotenManager = require("../../utils/gotenManager");

const plugins = {
    versioning: "versioning",
};

const includePlugin = (pluginName) => {
    const gotenData = utils.loadJson(paths.initialFiles.dotGoten);
    const plugins = gotenData.plugins;
    return plugins.includes(pluginName);
};

const getProjectPlugins = () => {
    const gotenData = utils.loadJson(paths.initialFiles.dotGoten);
    return gotenData.plugins;
};

const getEngineDatabase = () => {
    const gotenData = utils.loadJson(paths.initialFiles.dotGoten);
    const engine = gotenData.dbs[0]==="mongo"? "mongodb" : gotenData.dbs[0];
    return engine;
}

const gotenManagerNode = {
    gotenPlugins: plugins,
    includePlugin,
    getProjectPlugins,
    getEngineDatabase
};

module.exports = {
    ...gotenManagerNode,
    ...gotenManager,
};
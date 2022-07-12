const paths = require("../paths");
const src = "src/";

const dirs = {
    src,
    bin : `${src}bin/`,
    controllers : `${src}controllers/`,
    routes : `${src}routes/`,
    filters : `${src}filters/`,
    services : `${src}services/`,
    daos : `${src}daos/`,
    assemblers : `${src}assemblers/`,
    middlewares : `${src}middlewares/`,
    utils : `${src}utils/`,
    dtos : `${src}dtos/`,
    models : `${src}models/`,
    config : "config/",
    migrations: `${src}migrations/`,
};

const filesNames = {
    gitignore : paths.initialFiles.gitignore,
    packageJson: paths.initialFiles.packageJson,
    genericFilter : "genericFilter",
    genericController : "genericController",
    genericModelDTO : "genericModelDTO",
    genericAssembler : "genericAssembler",
    dotGoten : paths.initialFiles.dotGoten,
    app : "app",
    www : "www",
    config : "config",
    gotenConfig : "goten-config",
    initialMigration : "init",
};

const genericsFiles = {
    genericFilter : `${dirs.filters}${filesNames.genericFilter}`,
    genericController : `${dirs.controllers}${filesNames.genericController}`,
    genericModelDTO : `${dirs.dtos}${filesNames.genericModelDTO}`,
    genericAssembler : `${dirs.assemblers}${filesNames.genericAssembler}`,
};


const initialFiles = {
    gitignore : `${filesNames.gitignore}`,
    dotGoten : `${filesNames.dotGoten}`,
    app : `${dirs.src}${filesNames.app}`,
    www : `${dirs.bin}${filesNames.www}`,
    config : `${dirs.config}${filesNames.config}`,
    gotenConfig : `${dirs.config}${filesNames.gotenConfig}`,
    initMigration : `${dirs.migrations}${filesNames.initialMigration}`,
};

const importPath = (srcPath, includedPath) => {
    const srcList = srcPath.split("/");
    const includedList = includedPath.split("/");
    const endIncludesPath = includedList.filter((e, i) => !(srcList.includes(e) && e === srcList[i])).join("/");
    let dotsSlash = "";
    for (let i = 1; i < srcList.length - includedList.filter((e,i) => srcList.includes(e) && e === srcList[i]).length; i++){
        dotsSlash+="../";
    }
    dotsSlash = dotsSlash ? dotsSlash : "./";
    const path = dotsSlash + endIncludesPath; 
    return path;
};

module.exports = {
    dirs,
    filesNames,
    genericsFiles,
    initialFiles,
    importPath,
};
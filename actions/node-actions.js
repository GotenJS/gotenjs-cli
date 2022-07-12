const shell = require("shelljs");
const fs = require("fs");
const template = require ("../utils/node/templates/");
const paths = require ("../utils/node/paths");
const engines = require("../utils/node/engines");
const utils = require("../utils/utils");

const execInto = (folderName, method, options = null) => {
    const route = shell.pwd().stdout;
    shell.cd(folderName);
    method(options);
    shell.cd(route);
};

const createBaseProject = (options) => {
    shell.mkdir(options.projectName);
    execInto(options.projectName, () => {
        shell.exec("npm init -y");
        const dependencies = {
            "express": "~4.16.4",
            "nodemon": "~1.18.10",
            "cors": "~2.8.5",
        };
        if (options.database.engine === engines.mongodb.name) {
            dependencies["mongoose"] = "~5.4.17";
        } else {
            dependencies["sequelize"] = "~5.21.4";
            dependencies["sequelize-cli"] = "~5.4.0";
            switch (options.database.engine) {
            case engines.mysql.name:
                dependencies["mysql2"] = "~1.6.5";
                break;
            case engines.mariadb.name:
                dependencies["mariadb"] = "~2.2.0";
                break;
            }
        }
        if (options.versioning){
            dependencies["goten-versioning"] = "~1.0.2";
        }
        utils.editPackageJSON(paths.filesNames.packageJson, "dependencies", dependencies);
        utils.editPackageJSON(paths.filesNames.packageJson, "scripts", `nodemon ${paths.initialFiles.www}`, "start");
        shell.exec("npm install");
    });
};

const createDirectories = (options) => {
    execInto(options.projectName, () => {
        shell.mkdir(paths.dirs.src);
        shell.mkdir(paths.dirs.bin);
        shell.mkdir(paths.dirs.controllers);
        shell.mkdir(paths.dirs.routes);
        shell.mkdir(paths.dirs.filters);
        shell.mkdir(paths.dirs.services);
        shell.mkdir(paths.dirs.daos);
        shell.mkdir(paths.dirs.assemblers);
        shell.mkdir(paths.dirs.dtos);
        shell.mkdir(paths.dirs.models);
        shell.mkdir(paths.dirs.config);
    });
};

const createGenerics = (options) => {
    execInto(options.projectName, () => {
        fs.writeFileSync(`${paths.genericsFiles.genericFilter}.js`, template.genericFilterTemplate());
        fs.writeFileSync(`${paths.genericsFiles.genericController}.js`, template.genericControllerTemplate());
        fs.writeFileSync(`${paths.genericsFiles.genericModelDTO}.js`, template.genericDTOTemplate());
        fs.writeFileSync(`${paths.genericsFiles.genericAssembler}.js`, template.genericAssemblerTemplate(options));
    });
};

const createModel = (name, options) =>{
    console.log(`create model ${name}.js`);
    const model = template.modelTemplate(name, options);
    fs.writeFileSync(`${paths.dirs.models}${name.toLowerCase()}.js`, model);
    if(engines.isRelational(options.database.name)){
        createMigrations(name, options);
    }
};

const createMigrations = (name, options) => {
    execInto("src", () => {
        shell.exec(`../node_modules/.bin/sequelize migration:generate --name create-${name.toLowerCase()} --config ../config/sqlConfig.js`);
    });
    const migrationName = fs.readdirSync(paths.dirs.migrations).slice(-1)[0];
    console.log(`create migration ${migrationName}`);
    const migration = template.migrationTemplate(name, options);
    fs.writeFileSync(`${paths.dirs.migrations}${migrationName}`, migration);
};

const createFilter = (name, props) =>{
    console.log(`create filter ${name}Filter.js`);
    const filter= template.filterTemplate(name, props);
    fs.writeFileSync(`${paths.dirs.filters}${name.toLowerCase()}Filter.js`, filter);
};

const createDTO = (name, props) =>{
    console.log(`create dto ${name}DTO.js`);
    const dto = template.dtoTemplate(name, props);
    fs.writeFileSync(`${paths.dirs.dtos}${name.toLowerCase()}DTO.js`, dto);
};

const createDAO = (name, options) =>{
    console.log(`create dao ${name}DAO.js`);
    const dao=template.daoTemplate(name, options);
    fs.writeFileSync(`${paths.dirs.daos}${name.toLowerCase()}DAO.js`, dao);
};

const createAssembler = (name, options) =>{
    console.log(`create assembler ${name}Assembler.js`);
    const assembler = template.assemblerTemplate(name, options);
    fs.writeFileSync(`${paths.dirs.assemblers}${name.toLowerCase()}Assembler.js`, assembler);
};

const createService = (name, options) =>{
    console.log(`create service ${name}Service.js`);
    const service = template.serviceTemplate(name, options);
    fs.writeFileSync(`${paths.dirs.services}${name.toLowerCase()}Service.js`, service);
};

const createController = (name, plugins, version) =>{
    console.log(`create controller ${name}Controller.js`);
    const controller = template.controllerTemplate(name, plugins);
    const path = `${paths.dirs.controllers}${plugins.includes("versioning") ? version+"/":""}${name.toLowerCase()}Controller.js`;
    fs.writeFileSync(path, controller);
};

const createRouter = (name, plugins, version) =>{
    console.log(`create router ${name}Router.js`);
    let path;
    let router;
    if (plugins.includes("versioning")){
        path = `${paths.dirs.routes}${version}/${name.toLowerCase()}Router.js`;
        router = template.versionedRoutesTemplate(name, version);
    }else{
        path = `${paths.dirs.routes}${name.toLowerCase()}Router.js`;
        router = template.routerTemplate(name);
    }
    fs.writeFileSync(path, router);
};

const registerRoute = (name, plugins, version, withAuth) => {
    const lowerName = name.toLowerCase();
    let path;
    let imports;
    let registration;
    const useVersioning = plugins.includes("versioning");
    if (useVersioning){
        path = `${paths.dirs.routes}${version}/routes.js`;
        imports = `\nconst ${lowerName}Router = require('./${lowerName}Router')`;
        registration = `\n\t...${lowerName}Router,`;
    }else{
        path = "src/app.js";
        if(withAuth){
            imports = `\nconst ${lowerName}Router = require('./routes/${lowerName}Router')`;
            registration = `\napp.use('/${lowerName}s', isAuth, ${lowerName}Router)`;
        }else{
            imports = `\nconst ${lowerName}Router = require('./routes/${lowerName}Router')`;
            registration = `\napp.use('/${lowerName}s', ${lowerName}Router)`;
        }
    }
    utils.addCode(path, "\n//</import-routes>", imports);
    utils.addCode(path, "\n//</routes>", registration);
};

const registerVersion = (version) => {
    const imports = `\nconst ${version}Version = require('./routes/${version}/routes')`;
    utils.addCode("src/app.js", "\n//</import-routes>", imports);
    const versionRouter = `\n\t${version}Version,`;
    utils.addCode("src/app.js", "\n//</goten-routes>", versionRouter);

};

const createInitialFiles = (options) =>{
    execInto(options.projectName, () => {
        const gotenDataStr = template.dotGotenTemplate(options);
        fs.writeFileSync(`${paths.initialFiles.dotGoten}`, gotenDataStr, null, 2);
        const gotenData = JSON.parse(gotenDataStr, "utf-8");
        const plugins = gotenData.plugins;
        fs.writeFileSync(`${paths.initialFiles.gitignore}`, template.gitignoreTemplate());        
        fs.writeFileSync(`${paths.initialFiles.app}.js`, template.appTemplate(plugins));
        fs.writeFileSync(`${paths.initialFiles.www}`, template.wwwTemplate(options));
        fs.writeFileSync(`${paths.initialFiles.config}.json`,template.configTemplate(options.port));
        fs.writeFileSync(`${paths.initialFiles.config}.json.dist`,template.configTemplate(options.port));
        fs.writeFileSync(`${paths.initialFiles.gotenConfig}.js`,template.configGotenTemplate(options.database.engine));
        if(engines.isRelational(options.database.engine)){
            shell.cd("src");
            shell.exec("../node_modules/.bin/sequelize init --config ../config/sqlConfig.js");
            shell.rm("../config/sqlConfig.js");
            const sqlConfig = template.sqlConfigTemplate(options.database.engine);
            fs.writeFileSync("../config/sqlConfig.js", sqlConfig);
            shell.cd("../");
        }
    });
};

const createVersion = (version) => {
    execInto(options.projectName, () => {
        shell.mkdir(`${paths.dirs.controllers}${version}`);
        shell.mkdir(`${paths.dirs.routes}${version}`);
        fs.writeFileSync(`${paths.dirs.routes}${version}/routes.js`, template.versionRouterTemplate());
        registerVersion(version);
    });
};

const addDBConfig = (options) => {
    const db = {
        [options.engine]: {
            port: options.port,
            host:options.host,
            dbname: options.dbname,
        }
    };
    if (options.user) {
        db[options.engine]["usr"] = options.user;
        db[options.engine]["pass"] = options.pass;
    }
    const config = JSON.parse(fs.readFileSync(`${paths.initialFiles.config}.json`, "utf8"));
    config.db = {...db, ...config.db};
    fs.writeFileSync(`${paths.initialFiles.config}.json`, JSON.stringify(config, null, 4));
};

const evaluateAutorunMigrations = (options) => {
    if (engines.isRelational(options.database.name) && options.migrate) {
        runMigrations();
    }
};

const runMigrations = () => {
    console.log("run migrations");
    execInto(paths.dirs.src, () => {
        shell.exec("../node_modules/.bin/sequelize db:migrate --config ../config/sqlConfig.js");
    });
};

const addAuthorization = async (options) => {
    const dbEngine = JSON.parse(fs.readFileSync(paths.initialFiles.dotGoten, "utf-8")).dbs[0];
    const dependencies = {
        "express-validator": "~5.3.1",
        "hash.js": "~1.1.7",
        "jsonwebtoken": "~8.5.0",
    };
    if (options.auth.useSingleSignOn)
        dependencies["redis"] = "~2.8.0";
    utils.editPackageJSON(paths.filesNames.packageJson, "dependencies", dependencies);

    console.log(`Creando modelo ${options.auth.userModel}`);
    await shell.exec(`goten abm ${options.auth.userModel} -p "username:String" -p "password:String" -p "salt:String"`);
    
    console.log("Agregando carpetas y archivos");
    if (options.auth.useSingleSignOn) {
        // TODO - Agregar otros parametros (port, user, etc)
        utils.addCode(`./${paths.dirs.bin}www`,
            "const serverConfig = config.server",
            `const Redis = require('../utils/redis')
Redis.connect({host: '${options.auth.singleSignOn.host}'})
`);
    }
    const name = options.auth.userModel.toLowerCase();

    utils.addCode(`./${paths.dirs.controllers}${name}Controller.js`,
        `class ${utils.capitalizeString(name)}Controller extends GenericController{`,
        template.controllerImportAuthUtils(options.auth.useSingleSignOn)
    );
    utils.addCode(`./${paths.dirs.controllers}${name}Controller.js`,
        "}\n\nmodule.exports",
        template.controllerAuthMethod(
            utils.capitalizeString(name),
            options.auth.useSingleSignOn
        )
    );

    utils.addCode(`./${paths.dirs.daos}${name}DAO.js`,
        "}\n\nmodule.exports",
        template.daoGetByUsernameMethod(
            utils.capitalizeString(name),
            dbEngine
        )
    );

    shell.mkdir(`./${paths.dirs.middlewares}`);
    fs.writeFileSync(`${paths.dirs.middlewares}authMiddleware.js`,
        template.authMiddlewareTemplate(options.auth.useSingleSignOn)
    );
    fs.writeFileSync(`${paths.dirs.middlewares}${name}Middleware.js`,
        template.userAuthMiddlewareTemplate()
    );

    // TODO - SQL, Agregar validaciones a username y password en models/userModel
    
    utils.replaceCode(`./${paths.dirs.src}app.js`,
        `app.use('/${name}s'`,
        "app.use('/auth'"
    );

    utils.addCode(`./${paths.dirs.src}app.js`,
        "//</import-routes>",
        "const { isAuth } = require('./middlewares/authMiddleware')\n"
    );

    utils.addCode(`./${paths.dirs.routes}${name}Router.js`,
        `const ${utils.capitalizeString(name)}Controller = require('../controllers/${name}Controller')`,
        `const ${utils.capitalizeString(name)}Middleware = require('../middlewares/${name}Middleware')\n`
    );
    utils.addCode(`./${paths.dirs.routes}${name}Router.js`,
        "\nmodule.exports",
        `api.post('/login', ${utils.capitalizeString(name)}Controller.auth)`
    );
    utils.addCode(`./${paths.dirs.routes}${name}Router.js`,
        `${utils.capitalizeString(name)}Controller.create${utils.capitalizeString(name)})`,
        `\n\t...${utils.capitalizeString(name)}Middleware.createUserValidations(),\n\t${utils.capitalizeString(name)}Middleware.hashPassword,\n\t`
    );
    utils.addCode(`./${paths.dirs.routes}${name}Router.js`,
        `${utils.capitalizeString(name)}Controller.update${utils.capitalizeString(name)})`,
        `\n\t...${utils.capitalizeString(name)}Middleware.createUserValidations(),\n\t${utils.capitalizeString(name)}Middleware.hashPassword,\n\t`
    );

    utils.addCode(`./${paths.dirs.services}${name}Service.js`,
        `class ${utils.capitalizeString(name)}Service{`,
        template.serviceSHA256Function()
    );
    utils.addCode(`./${paths.dirs.services}${name}Service.js`,
        "}\n\nmodule.exports",
        template.serviceAuthMethod(name)
    );

    shell.mkdir(`./${paths.dirs.src}utils`);
    options.auth.useSingleSignOn && fs.writeFileSync(`./${paths.dirs.utils}redis.js`, template.redisFileTemplate());
    fs.writeFileSync(`./${paths.dirs.utils}secrets.js`, template.secretsFileTemplate());

    utils.addUsedCommand("auth");
    // TODO - crear modelo de roles (?) (options.auth.rolModel)
    shell.exec("npm install");
};

module.exports = {
    execInto,
    createBaseProject,
    createDirectories,
    createGenerics,
    createModel,
    createMigrations,
    evaluateAutorunMigrations,
    createFilter,
    createDTO,
    createDAO,
    createAssembler,
    createService,
    createController,
    createRouter,
    registerRoute,
    createInitialFiles,
    createVersion,
    addDBConfig,
    runMigrations,
    addAuthorization,
};
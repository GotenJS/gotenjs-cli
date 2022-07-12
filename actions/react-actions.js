const fs = require("fs");
const shell = require("shelljs");
const paths = require("../utils/react/paths");
const reactUtils = require("../utils/react/utils");
const utils = require("../utils/utils");
const template = require("../utils/react/templates");
const { capitalizeString, editPackageJSON, replaceText, addImport } = require("../utils/utils.js");
const NC="\033[0;m";
const GREEN="\033[0;32m";

const createBaseProject = (projectName) => {
    process.stdout.write(`[INFO] - Creando proyecto base en carpeta "${projectName}"... `);
    shell.exec(`npx create-react-app@3.3.0 ${projectName}`);
    shell.cd(projectName);
    shell.cd(paths.dirs.src);
    shell.rm(["App.css", "App.js", "App.test.js", "index.css", "index.js", "logo.svg", "serviceWorker.js"]);
    shell.cd("../");
    shell.cd(paths.dirs.public);
    shell.rm(["manifest.json", "index.html"]);
    shell.cd("../");
    process.stdout.write(`${GREEN}Hecho.${NC}\n`);
    shell.cd("../");
};

const createDirectories = (options) => {
    process.stdout.write("[INFO] - Creando directorios... ");
    shell.cd(options.projectName);
    shell.mkdir(paths.dirs.config);
    shell.mkdir(paths.dirs.modules);
    shell.mkdir(paths.dirs.utils);
    shell.mkdir(paths.dirs.layout);
    shell.mkdir(paths.dirs.api);
    if(options.redux){
        shell.mkdir(paths.dirs.duck);
        shell.mkdir(paths.dirs.redux);
        shell.mkdir(paths.dirs.reducers);
    }
    process.stdout.write(`${GREEN}Hecho.${NC}\n`);
    shell.cd("../");
};

const createGenericComponents = (options) => {
    process.stdout.write("[INFO] - Creando componentes genéricos/reutilizables... ");
    shell.cd(options.projectName);
    // Modal.jsx
    createFileFromTemplate(paths.dirs.layout, paths.genericComponents.modal, template.genericModalComponent());
    // Searcher.jsx
    createFileFromTemplate(paths.dirs.layout, paths.genericComponents.searcher, template.genericSearcherComponent());
    // modulestyles.css
    createFileFromTemplate(paths.dirs.modules, paths.files.css.module, template.moduleStyles());
    process.stdout.write(`${GREEN}Hecho.${NC}\n`);
    shell.cd("../");
};

const createComponents = (options) => {
    process.stdout.write("[INFO] - Creando componentes... ");
    shell.cd(options.projectName);
    // index.js
    createFileFromTemplate(paths.dirs.src, paths.components.index, template.indexComponent());
    // App.jsx
    createFileFromTemplate(paths.dirs.src, paths.components.app, template.appComponent());
    // Snackbar.jsx
    createFileFromTemplate(paths.dirs.src, paths.components.snackbar.component, template.snackbarComponent());
    // SnackbarContext.js
    createFileFromTemplate(paths.dirs.src, paths.components.snackbar.context, template.snackbarContext());
    // RouterContext.js
    createFileFromTemplate(paths.dirs.src, paths.components.routerContext, template.routerContext());
    // AlertModal.jsx
    createFileFromTemplate(paths.dirs.layout, paths.components.alertModal, template.alertModalComponent());
    // ButtonWithAlert.jsx
    createFileFromTemplate(paths.dirs.layout, paths.components.buttonWithAlert, template.buttonWithAlertComponent());
    // Home.jsx
    createFileFromTemplate(paths.dirs.layout, paths.components.home, template.homeComponent());
    // Navbar.jsx
    createFileFromTemplate(paths.dirs.layout, paths.components.navbar, template.navbarComponent(options.projectName));
    process.stdout.write(`${GREEN}Hecho.${NC}\n`);
    shell.cd("../");
};

const createReduxComponents = (options) => {
    process.stdout.write("[INFO] - Creando componentes... ");
    shell.cd(options.projectName);
    // index.js
    createFileFromTemplate(paths.dirs.src, paths.components.index, template.indexReduxComponent());
    // App.jsx
    createFileFromTemplate(paths.dirs.src, paths.components.app, template.appReduxComponent());
    // Snackbar.jsx
    createFileFromTemplate(paths.dirs.src, paths.components.snackbar.component, template.snackbarReduxComponent());
    // AlertModal.jsx
    createFileFromTemplate(paths.dirs.layout, paths.components.alertModal, template.alertModalComponent());
    // ButtonWithAlert.jsx
    createFileFromTemplate(paths.dirs.layout, paths.components.buttonWithAlert, template.buttonWithAlertComponent());
    // Home.jsx
    createFileFromTemplate(paths.dirs.layout, paths.components.home, template.homeComponent());
    // Navbar.jsx
    createFileFromTemplate(paths.dirs.layout, paths.components.navbar, template.navbarReduxComponent(options.projectName));
    process.stdout.write(`${GREEN}Hecho.${NC}\n`);
    shell.cd("../");
};

const createFiles = (options) => {
    const { projectName, api } = options;
    process.stdout.write("[INFO] - Creando archivos... ");
    shell.cd(projectName);
    // index.html
    createFileFromTemplate(paths.dirs.public, paths.files.public.index, template.publicIndexHTML(projectName));
    // manifest.json
    createFileFromTemplate(paths.dirs.public, paths.files.public.manifest, template.publicManifestJSON(projectName));
    // config.js
    createFileFromTemplate(paths.dirs.config, paths.files.config, template.configFileAPI(api));
    // consts.js
    createFileFromTemplate(paths.dirs.utils, paths.files.utils.consts, template.constsFile());
    // App.css
    createFileFromTemplate(paths.dirs.src, paths.files.css.app, template.appCSSFile());
    // index.css
    createFileFromTemplate(paths.dirs.src, paths.files.css.index, template.indexCSSFile());
    // history.js
    createFileFromTemplate(paths.dirs.src, paths.files.history, template.routerHistoryFile());
    createFileFromTemplate("./", ".goten", template.dotGotenTemplate("context"));
    process.stdout.write(`${GREEN}Hecho.${NC}\n`);
    shell.cd("../");
};

const createReduxFiles = (options) => {
    const { projectName, api } = options;
    process.stdout.write("[INFO] - Creando archivos... ");
    shell.cd(projectName);
    // index.html
    createFileFromTemplate(paths.dirs.public, paths.files.public.index, template.publicIndexHTML(projectName));
    // manifest.json
    createFileFromTemplate(paths.dirs.public, paths.files.public.manifest, template.publicManifestJSON(projectName));
    // config.js
    createFileFromTemplate(paths.dirs.config, paths.files.config, template.configFileAPI(api));

    // duck files
    createFileFromTemplate(paths.dirs.duck, paths.files.duck.actions, template.actionsAppDuck());
    createFileFromTemplate(paths.dirs.duck, paths.files.duck.index, template.indexAppDuck());
    createFileFromTemplate(paths.dirs.duck, paths.files.duck.operations, template.operationsAppDuck());
    createFileFromTemplate(paths.dirs.duck, paths.files.duck.types, template.typesAppDuck());
    // redux files
    createFileFromTemplate(paths.dirs.redux, paths.files.redux.store, template.reduxStore());
    createFileFromTemplate(paths.dirs.reducers, paths.files.redux.appReducer, template.reduxAppReducer());

    // consts.js
    createFileFromTemplate(paths.dirs.utils, paths.files.utils.consts, template.constsFile());
    // App.css
    createFileFromTemplate(paths.dirs.src, paths.files.css.app, template.appCSSFile());
    // index.css
    createFileFromTemplate(paths.dirs.src, paths.files.css.index, template.indexCSSFile());
    // history.js
    createFileFromTemplate(paths.dirs.src, paths.files.history, template.routerHistoryFile());
    createFileFromTemplate("./", ".goten", template.dotGotenTemplate("redux"));
    process.stdout.write(`${GREEN}Hecho.${NC}\n`);
    shell.cd("../");
};

const installDependencies = (options) => {
    shell.cd(options.projectName);
    process.stdout.write("[INFO] - Instalando dependencias... ");
    let dependencies = {
        "@material-ui/core": "~3.9.2",
        "axios": "~0.18.0",
        "goten-react-form": "~1.0.1",
        "goten-react-list": "~1.0.6",
        "goten-react-paginator": "~0.0.4",
        "goten-react-text-field": "~1.1.4",
        "react-bootstrap": "~1.0.0-beta.8",
        "react-modal": "~3.8.1",
        "react-router": "~4.3.1",
        "react-router-dom": "~4.3.1",
        "@fortawesome/fontawesome-svg-core": "~1.2.12",
        "@fortawesome/free-solid-svg-icons": "~5.6.3",
        "@fortawesome/react-fontawesome": "~0.1.3",
        "moment": "~2.24.0",
    }

    if(options.redux){
        const reduxDependencies = {
            "react-redux": "~7.0.3",
            "react-router": "~4.3.1",
            "react-router-dom": "~4.3.1",
            "react-router-redux": "~4.0.8",
            "react-scripts": "~3.0.1",
            "redux": "~4.0.1",
            "redux-persist": "~5.10.0",
            "redux-thunk": "~2.3.0",
        };
        dependencies = {...dependencies, ...reduxDependencies};
    }

    editPackageJSON(paths.files.packageJson, "dependencies", dependencies);
    shell.exec("npm install");
    process.stdout.write(`${GREEN}Hecho.${NC}\n`);
    shell.cd("../");
};

const createFileFromTemplate = (directory, fileName, template) => {
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory);
    }
    fs.writeFileSync(directory+"/"+fileName, template);
};

const createABMFolder = (name, options) => {
    process.stdout.write(`[INFO] - Creando ABM "${name}"... `);
    const newModulePath = paths.dirs.modules+name;
    let authPath = reactUtils.routeAuth(options); 
    shell.mkdir(newModulePath);
    createFileFromTemplate(newModulePath, name+".js", template.abmClassFile(name, options.props));
    createFileFromTemplate(newModulePath, paths.ABMFiles.index, template.abmIndexFile(name));
    createFileFromTemplate(newModulePath, paths.ABMFiles.consts, template.abmConstsFile());
    createFileFromTemplate(newModulePath, paths.ABMFiles.routes, template.abmRoutesFile(name, authPath));
    createFileFromTemplate(newModulePath, paths.ABMFiles.searcher, template.abmSearcherFile(name, options.props));
    createFileFromTemplate(newModulePath, paths.ABMFiles.list, template.abmListFile(name, options.props));
    createFileFromTemplate(newModulePath, paths.ABMFiles.row, template.abmRowFile(name, options.props));
    createFileFromTemplate(newModulePath, paths.ABMFiles.modalCreate, template.abmModalCreateFile(name));
    createFileFromTemplate(newModulePath, paths.ABMFiles.modalEdit, template.abmModalEditFile(name));
    createFileFromTemplate(newModulePath, paths.ABMFiles.modalInspect, template.abmModalInspectFile(name));
    createFileFromTemplate(newModulePath, paths.ABMFiles.form, template.abmFormFile(name, options.props));
    createArrayAndCustomComponents(newModulePath,options.props, options.internalModels);
    createFileFromTemplate(newModulePath, name+paths.ABMFiles.context, template.abmContextFile(name));
    process.stdout.write(`${GREEN}Hecho.${NC}\n`);
};

const createABMReduxFolder = (name, options) => {
    process.stdout.write(`[INFO] - Creando ABM "${name}"... `);
    const newModulePath = paths.dirs.modules+name;
    let authPath = reactUtils.routeAuth(options); 
    shell.mkdir(newModulePath);
    createFileFromTemplate(newModulePath, name+".js", template.abmClassFile(name, options.props));
    createFileFromTemplate(newModulePath, paths.ABMFiles.index, template.abmIndexReduxFile(name));
    createFileFromTemplate(newModulePath, paths.ABMFiles.consts, template.abmConstsFile());
    createFileFromTemplate(newModulePath, paths.ABMFiles.routes, template.abmRoutesReduxFile(name, authPath));
    createFileFromTemplate(newModulePath, paths.ABMFiles.searcher, template.abmSearcherFile(name, options.props));
    createFileFromTemplate(newModulePath, paths.ABMFiles.list, template.abmListReduxFile(name, options.props));
    createFileFromTemplate(newModulePath, paths.ABMFiles.row, template.abmRowFile(name, options.props));
    createFileFromTemplate(newModulePath, paths.ABMFiles.modalCreate, template.abmModalCreateFile(name));
    createFileFromTemplate(newModulePath, paths.ABMFiles.modalEdit, template.abmModalEditFile(name));
    createFileFromTemplate(newModulePath, paths.ABMFiles.modalInspect, template.abmModalInspectFile(name));
    createFileFromTemplate(newModulePath, paths.ABMFiles.form, template.abmFormFile(name, options.props));
    createArrayAndCustomComponents(newModulePath,options.props, options.internalModels);
    const pathDuck = newModulePath+"/duck";
    shell.mkdir(pathDuck);
    createFileFromTemplate(pathDuck, paths.files.duck.actions, template.actionsABMDuck(name));
    createFileFromTemplate(pathDuck, paths.files.duck.index, template.indexABMDuck(name));
    createFileFromTemplate(pathDuck, paths.files.duck.operations, template.operationsABMDuck(name));
    createFileFromTemplate(pathDuck, paths.files.duck.types, template.typesABMDuck(name));
    process.stdout.write(`${GREEN}Hecho.${NC}\n`);
};

const createArrayAndCustomComponents = (modulePath, props, internalModels) => {
    let internalModelProp;
    props.forEach((prop) => {
        let formatProp = reactUtils.format(prop);
        
        internalModelProp = null;
        if(formatProp.isCustom) {
            internalModelProp = internalModels.find((internalModel) => internalModel.className === formatProp.type);
        }
        if(formatProp.isArray) {
            createFileFromTemplate(modulePath, `${capitalizeString(formatProp.name)}List.jsx`, template.abmArrayListFile(formatProp.name, internalModelProp, {name: formatProp.name, type: formatProp.type}));
            createFileFromTemplate(modulePath, `${capitalizeString(formatProp.name)}Row.jsx`, template.abmArrayRowFile(formatProp.name, internalModelProp, {name: formatProp.name, type: formatProp.type}));
        }
        else if(formatProp.isCustom && internalModelProp) {
            createFileFromTemplate(modulePath, `${capitalizeString(formatProp.name)}Form.jsx`, template.abmCustomFormFile(formatProp.name, internalModelProp));
        }
    });
};

const createReducer = (name) => {
    process.stdout.write(`[INFO] - Creando reducer de "${name}"... `);
    createFileFromTemplate(paths.dirs.reducers, `${name.toLowerCase()}Reducer.js`, template.abmReducer(name));
    process.stdout.write(`${GREEN}Hecho.${NC}\n`);
};

const createUtilsFile = (name) => {
    process.stdout.write(`[INFO] - Creando archivo de configuracion de API de "${name}"... `);
    createFileFromTemplate(paths.dirs.api, `api${name}.js`, template.abmAPIFile(name));
    process.stdout.write(`${GREEN}Hecho.${NC}\n`);
};

const modifyExistingFiles = (name, options) => {
    const lowerCaseName = name.toLowerCase();
    process.stdout.write("[INFO] - Modificando archivos existentes... ");
    // Navbar
    reactUtils.addCode(`${paths.dirs.layout}${paths.components.navbar}`, "{/* </use-module-tab> */}", template.abmNavbarTab(name));
    replaceText(`${paths.dirs.src}${paths.components.index}`, "{/*<module-context>*/}", `<${name}Provider>\n\t\t\t\t{/*<module-context>*/}`);
    replaceText(`${paths.dirs.src}${paths.components.index}`, "{/*</module-context>*/}", `{/*</module-context>*/}\n\t\t\t\t</${name}Provider>`);
    // Index
    reactUtils.addCode(`${paths.dirs.src}${paths.components.index}`, "//</import-module-context>", `import { ${name}Provider } from './modules/${name}/${name}Context'\n`);
    // Config
    reactUtils.addCode(`${paths.dirs.config}${paths.files.config}`, "//</define-api-modules>", `const ${lowerCaseName}s = apiHost + "${lowerCaseName}s"\n`);
    reactUtils.addCode(`${paths.dirs.config}${paths.files.config}`, "//</export-api-modules>", `\t${lowerCaseName}s,\n`);
    // App
    reactUtils.addCode(`${paths.dirs.src}${paths.components.app}`, "//</import-module-routes>", `import ${name}Routes from './modules/${name}/Routes'\n`);
    let code = `<Route path="/${lowerCaseName}s" component={${name}Routes}/>\n\t\t\t\t\t`
    reactUtils.addCode(`${paths.dirs.src}${paths.components.app}`, "{/*</use-module-routes>*/}", code);

    process.stdout.write(`${GREEN}Hecho.${NC}\n`);
};

const modifyExistingReduxFiles = (name, options) => {
    const lowerCaseName = name.toLowerCase();
    process.stdout.write("[INFO] - Modificando archivos existentes... ");
    // Navbar
    reactUtils.addCode(`${paths.dirs.layout}${paths.components.navbar}`, "{/* </use-module-tab> */}", template.abmNavbarTab(name));
    // Reducers
    reactUtils.addCode(`${paths.dirs.redux}${paths.files.redux.store}`, "//</import-module-reducers>", `import ${lowerCaseName}Reducer from './reducers/${lowerCaseName}Reducer'\n`);
    reactUtils.addCode(`${paths.dirs.redux}${paths.files.redux.store}`, "//</use-module-reducers>", `${lowerCaseName}Store: ${lowerCaseName}Reducer,\n\t`);
    // Config
    reactUtils.addCode(`${paths.dirs.config}${paths.files.config}`, "//</define-api-modules>", `const ${lowerCaseName}s = apiHost + "${lowerCaseName}s"\n`);
    reactUtils.addCode(`${paths.dirs.config}${paths.files.config}`, "//</export-api-modules>", `\t${lowerCaseName}s,\n`);
    // App
    reactUtils.addCode(`${paths.dirs.src}${paths.components.app}`, "//</import-module-routes>", `import ${name}Routes from './modules/${name}/Routes'\n`);
    let code = `<Route path="/${lowerCaseName}s" component={${name}Routes}/>\n\t\t\t\t\t`
    reactUtils.addCode(`${paths.dirs.src}${paths.components.app}`, "{/*</use-module-routes>*/}", code);

    process.stdout.write(`${GREEN}Hecho.${NC}\n`);
};

const createBaseLogin = () => {
    process.stdout.write("[INFO] - Instalando dependencias... ");
    shell.exec("npm install --save jwt-decode");
    process.stdout.write(`${GREEN}Hecho.${NC}\n`);
};

const createLoginDirectory = () => {
    process.stdout.write("[INFO] - Creando carpeta dedicada... ");
    shell.mkdir(paths.dirs.auth);
    process.stdout.write(`${GREEN}Hecho.${NC}\n`);
};

const createLoginFiles = (options) => {
    process.stdout.write("[INFO] - Creando archivos... ");
    createFileFromTemplate(paths.dirs.auth, paths.components.indexAuth, template.indexAuthComponent());
    createFileFromTemplate(paths.dirs.auth, paths.components.authContext, template.authContext());
    createFileFromTemplate(paths.dirs.auth, paths.components.axiosInterceptor, template.axiosInterceptor());
    createFileFromTemplate(paths.dirs.auth, paths.components.privateRoute, template.privateRoute());
    process.stdout.write(`${GREEN}Hecho.${NC}\n`);
};

const addAuthConfig = () => {
    reactUtils.addCode(`${paths.dirs.config}${paths.files.config}`, "//</define-api-modules>", "const login = apiHost + \"auth/login\"\n");
    reactUtils.addCode(`${paths.dirs.config}${paths.files.config}`, "//</export-api-modules>", "\tlogin,\n");
};

const addAuthToApp = () => {
    const pathIndex = `${paths.dirs.src}${paths.components.index}`;
    addImport(pathIndex, "import { AuthProvider } from './auth/AuthContext'");
    addImport(pathIndex, "import addInterceptor from './auth/axios-interceptor'");
    replaceText(pathIndex, "ReactDOM.render(", "ReactDOM.render(\n<AuthProvider>");
    replaceText(pathIndex, ">,", ">\n</AuthProvider>,");
    fs.writeFileSync(pathIndex, "addInterceptor()", { flag: "a+" });
};

const addAuthBehavior = () => {
    const pathNavbar = `${paths.dirs.layout}${paths.components.navbar}`;
    addImport(pathNavbar, "import { withAuth } from '../auth/AuthContext'");
    replaceText(
        pathNavbar,
        "</ButtonToolbar>",
        `<Button
            style={{ backgroundColor: colorCyS, color: "white" }}
            onClick={() => {
                this.props.logout()
                this.props.redirectTo('/login')
            }}
            >
                Logout
            </Button>
        </ButtonToolbar>`
    );
    replaceText(pathNavbar, "export default withRouting(Navbar)", "export default withAuth(withRouting(Navbar))");
};

const addAuthRoutes = () => {
    const pathApp = `${paths.dirs.src}${paths.components.app}`;
    reactUtils.addCode(pathApp, "//</import-module-routes>",
        `import Login from './auth'
import PrivateRoute from './auth/PrivateRoute'
import { withAuth } from './auth/AuthContext'
import { withRouter, Switch } from 'react-router-dom'\n`);
    replaceText(pathApp, "<header", "{this.props.authenticated && <header");
    replaceText(pathApp, "</header>", "</header>}");
    replaceText(pathApp, "<Container fluid className=\"App\">",
        `<Container fluid className="App">
        <Switch>`);
    replaceText(pathApp, "</Container>", "    </Switch>\n</Container>");
    replaceText(pathApp,` <Route exact={true} path="/" component={Home}/>`, `<PrivateRoute exact={true} path="/" component={Home}/>`)
    replaceText(pathApp, /component={/g, "component={() => <");
    replaceText(pathApp, /}\/>/g, "/>} />");
    reactUtils.addCode(pathApp, "{/*</use-module-routes>*/}", "<Route path=\"/Login\" component={Login}/>\n\t\t\t\t\t");
    replaceText(pathApp, "export default App", "export default withAuth(withRouter(App))");
};

const addAuthorization = () => {
    createBaseLogin();
    createLoginDirectory();
    createLoginFiles();
    addAuthConfig();
    addAuthToApp();
    addAuthBehavior();
    addAuthRoutes();
    utils.addUsedCommand("auth");
};

module.exports = {
    createBaseProject,
    createDirectories,
    createGenericComponents,
    createComponents,
    createFiles,
    installDependencies,
    createABMFolder,
    createReducer,
    createUtilsFile,
    modifyExistingFiles,
    createBaseLogin,
    createLoginDirectory,
    createLoginFiles,
    addAuthConfig,
    addAuthToApp,
    addAuthBehavior,
    addAuthRoutes,
    createReduxComponents,
    createReduxFiles,
    createABMReduxFolder,
    modifyExistingReduxFiles,
    addAuthorization
};



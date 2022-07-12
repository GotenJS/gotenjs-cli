// Generic Components
const genericModalComponent = require("./genericModalComponent.js");
const genericSearcherComponent = require("./genericSearcherComponent.js");
// Components
const appComponent = require("./context/appComponent.js");
const appReduxComponent = require("./redux/appReduxComponent.js");
const alertModalComponent = require("./alertModalComponent.js");
const buttonWithAlertComponent = require("./buttonWithAlertComponent.js");
const homeComponent = require("./homeComponent.js");
const indexComponent = require("./context/indexComponent.js");
const indexReduxComponent = require("./redux/indexReduxComponent.js");
const navbarComponent = require("./context/navbarComponent.js");
const navbarReduxComponent = require("./redux/navbarReduxComponent.js");
const routerContext = require("./context/routerContext.js");
const snackbarComponent = require("./context/snackbarComponent.js");
const snackbarReduxComponent = require("./redux/snackbarReduxComponent.js");
const snackbarContext = require("./context/snackbarContext.js");
// Files
// Public
const publicIndexHTML = require("./publicIndexHTML.js");
const publicManifestJSON = require("./publicManifestJSON.js");
// API Config
const configFileAPI = require("./configFileAPI.js");

// App duck
const actionsAppDuck = require("./redux/actionsAppDuck.js");
const indexAppDuck = require("./redux/indexAppDuck.js");
const operationsAppDuck = require("./redux/operationsAppDuck.js");
const typesAppDuck = require("./redux/typesAppDuck.js");

// ABM duck
const actionsABMDuck = require("./redux/actionsABMDuck.js");
const indexABMDuck = require("./redux/indexABMDuck.js");
const operationsABMDuck = require("./redux/operationsABMDuck.js");
const typesABMDuck = require("./redux/typesABMDuck.js");

// Redux
const reduxAppReducer = require("./redux/reduxAppReducer.js");
const reduxStore = require("./redux/reduxStore.js");

const abmReducer = require("./redux/abmReducer");

// Utils
const constsFile = require("./constsFile.js");
// CSS
const appCSSFile = require("./appCSSFile.js");
const indexCSSFile = require("./indexCSSFile.js");
const moduleStyles = require("./moduleStyles.js");
// Router
const routerHistoryFile = require("./routerHistoryFile.js");
const dotGotenTemplate = require("./dotGotenTemplate");
// ABM folder files
const abmConstsFile = require("./abmConstsFile.js");
const abmClassFile = require("./abmClassFile.js");
const abmIndexFile = require("./context/abmIndexFile.js");
const abmIndexReduxFile = require("./redux/abmIndexReduxFile.js");
const abmRoutesFile = require("./context/abmRoutesFile.js");
const abmRoutesReduxFile = require("./redux/abmRoutesReduxFile.js");
const abmSearcherFile = require("./abmSearcherFile.js");
const abmListFile = require("./context/abmListFile.js");
const abmListReduxFile = require("./redux/abmListReduxFile.js");
const abmRowFile = require("./abmRowFile.js");
const abmModalCreateFile = require("./abmModalCreateFile.js");
const abmModalEditFile = require("./abmModalEditFile.js");
const abmModalInspectFile = require("./abmModalInspectFile.js");
const abmFormFile = require("./abmFormFile.js");
const abmArrayListFile = require("./abmArrayListFile.js");
const abmArrayRowFile = require("./abmArrayRowFile.js");
const abmCustomFormFile = require("./abmCustomFormFile.js");
const abmContextFile = require("./context/abmContextFile.js");
// ABM API file
const abmAPIFile = require("./abmAPIFile.js");
// ABM Navbar Tab
const abmNavbarTab = require("./abmNavbarTab.js");

const indexAuthComponent = require("./auth/indexAuthComponent");
const authContext = require("./auth/authContext");
const axiosInterceptor = require("./auth/axiosInterceptor");
const privateRoute = require("./auth/privateRoute");

module.exports = {
    genericModalComponent,
    genericSearcherComponent,
    appComponent,
    appReduxComponent,
    alertModalComponent,
    buttonWithAlertComponent,
    homeComponent,
    indexComponent,
    indexReduxComponent,
    navbarComponent,
    navbarReduxComponent,
    routerContext,
    snackbarComponent,
    snackbarReduxComponent,
    snackbarContext,
    publicIndexHTML,
    publicManifestJSON,
    configFileAPI,
    constsFile,
    appCSSFile,
    indexCSSFile,
    routerHistoryFile,
    dotGotenTemplate,
    abmClassFile,
    abmConstsFile,
    abmIndexFile,
    abmIndexReduxFile,
    abmRoutesFile,
    abmRoutesReduxFile,
    abmSearcherFile,
    abmListFile,
    abmListReduxFile,
    abmRowFile,
    abmModalCreateFile,
    abmModalEditFile,
    abmModalInspectFile,
    abmFormFile,
    abmArrayListFile,
    abmArrayRowFile,
    abmCustomFormFile,
    abmAPIFile,
    abmNavbarTab,
    abmContextFile,
    indexAuthComponent,
    authContext,
    axiosInterceptor,
    privateRoute,
    actionsAppDuck,
    indexAppDuck,
    operationsAppDuck,
    typesAppDuck,
    reduxAppReducer,
    reduxStore,
    actionsABMDuck,
    indexABMDuck,
    operationsABMDuck,
    typesABMDuck,
    abmReducer,
    moduleStyles
};
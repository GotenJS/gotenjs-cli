const public = "public/";
const src = "src/";
const config = `${src}config/`;
const duck = `${src}duck/`;
const layout = `${src}layout/`;
const modules = `${src}modules/`;
const redux = `${src}redux/`;
const reducers = `${redux}reducers/`;
const utils = `${src}utils/`;
const api = `${utils}api/`;
const auth = `${src}auth/`;


const dirs = {
    public,
    src,
    config,
    duck,
    layout,
    modules,
    redux,
    reducers,
    utils,
    api,
    auth
};

const genericComponents = {
    modal: "Modal.jsx",
    searcher: "Searcher.jsx",
};

const components = {
    index: "index.js",
    app: "App.jsx",
    alertModal: "AlertModal.jsx",
    buttonWithAlert: "ButtonWithAlert.jsx",
    home: "Home.jsx",
    navbar: "Navbar.jsx",
    snackbar: {
        context: "SnackbarContext.js",
        component: "Snackbar.jsx"
    },
    routerContext: "RouterContext.js",
    indexAuth: "index.js",
    authContext : "AuthContext.js",
    axiosInterceptor : "axios-interceptor.js",
    privateRoute: "PrivateRoute.jsx"
};

const files = {
    dotGoten:".goten",
    packageJson: "package.json",
    config: "config.js",
    history: "history.js",
    public: {
        index: "index.html",
        manifest: "manifest.json",
        icon : "favicon.ico",
    },
    duck: {
        actions: "actions.js",
        index: "index.js",
        operations: "operations.js",
        types: "types.js",
    },
    redux: {
        store: "store.js",
        appReducer: "appReducer.js",
    },
    utils: {
        consts: "consts.js"
    },
    css: {
        app: "App.css",
        index: "index.css",
        module:"moduleStyles.css"
    },
};

const ABMFiles = {
    consts: "consts.js",
    context: "Context.js",
    modalCreate: "CreateModal.jsx",
    modalEdit: "EditModal.jsx",
    form: "Form.jsx",
    index: "index.jsx",
    modalInspect: "InspectModal.jsx",
    list: "List.jsx",
    routes: "Routes.jsx",
    row: "Row.jsx",
    searcher: "Searcher.jsx"
};

module.exports = {
    dirs,
    genericComponents,
    components,
    files,
    ABMFiles,
};
const src = "src/";
const app = `${src}app/`;
const components = `${app}components/`;
const genericsComponents = `${components}generics/`;
const dtos = `${app}dtos/`;
const responses = `${dtos}responses/`;
const filters = `${dtos}filters/`;
const services = `${app}services/`;
const assets = `${src}assets/`;
const auth = `${app}auth/`;

const dirs = {
    src,
    app,
    components,
    genericsComponents,
    dtos,
    responses,
    filters,
    services,
    assets,
    auth,
};

const filesNames = {
    genericResponse: "generic.response",
    genericFilter: "generic.filter",
    gotenConfirmButton: "goten.confirm.button.component",
    gotenDatepicker: "goten.datepicker.component",
    gotenList: "goten.list.component",
    gotenPagination: "goten.pagination.component",
    gotenRadio: "goten.radio.component",
    routes:"app.routes",
    home: "home.component",
    menu: "menu.component",
    auth: "login.component",
    packageJson: "package.json",
};

const genericsFiles = {
    genericResponse: `${dirs.responses}${filesNames.genericResponse}`,
    genericFilter: `${dirs.filters}${filesNames.genericFilter}`,
};

const gotenDirs = {
    gotenConfirmButton: `${dirs.genericsComponents}goten.confirm.button.component/`,
    gotenDatepicker: `${dirs.genericsComponents}goten.datepicker.component/`,
    gotenList: `${dirs.genericsComponents}goten.list.component/`,
    gotenPagination: `${dirs.genericsComponents}goten.pagination.component/`,	
    gotenRadio: `${dirs.genericsComponents}goten.radio.component/`,
};

const gotenFiles = {
    gotenConfirmButton: `${gotenDirs.gotenConfirmButton}${filesNames.gotenConfirmButton}`,
    gotenDatepicker: `${gotenDirs.gotenDatepicker}${filesNames.gotenDatepicker}`,
    gotenList: `${gotenDirs.gotenList}${filesNames.gotenList}`,
    gotenPagination: `${gotenDirs.gotenPagination}${filesNames.gotenPagination}`,	
    gotenRadio: `${gotenDirs.gotenRadio}${filesNames.gotenRadio}`,
};

const dirComponents = {
    home: `${dirs.components}home.component/`,
    menu: `${dirs.components}menu.component/`,
};

const componentsFiles = {
    home: `${dirComponents.home}${filesNames.home}`,
    menu: `${dirComponents.menu}${filesNames.menu}`,
    auth: `${auth}${filesNames.auth}`,
};

const initialFiles = {
    routes: `${dirs.app}${filesNames.routes}`,
    appModule:`${dirs.app}app.module`,
    appComponent:`${dirs.app}app.component`,
    indexHtml:`${dirs.src}index`,
    stylesSass:`${dirs.src}styles`,
    variablesCustomSass:`${dirs.src}_variables_custom`,
    assets:`${dirs.assets}Goten.png`,
    goten:".goten",
    favicon: `${dirs.src}favicon.ico`
};

module.exports = {
    dirs: {...dirs, ...dirComponents, ...gotenDirs},
    filesNames,
    genericsFiles,
    initialFiles,
    gotenFiles,
    componentsFiles,
};
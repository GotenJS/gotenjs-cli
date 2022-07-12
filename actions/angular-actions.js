const fs = require("fs");
const shell = require("shelljs");
const paths = require("../utils/angular/paths");
const template = require("../utils/angular/templates/");
const utils = require("../utils/angular/utils");
const logger = require("../utils/logger");
const path = require("path");
const authInject = require("../utils/angular/templates/auth/inject");
const imagenes = require("../utils/angular/assets");

const installDependencies = () => {
    logger.log("Instalando dependencias...");
    const dependencies = {
        "bootstrap": "~4.3.1",
        "@ng-bootstrap/ng-bootstrap": "~4.1.1",
        "goten-ngmodel": "~2.0.3",
        "@fortawesome/angular-fontawesome": "~0.3.0",
        "@fortawesome/fontawesome-svg-core": "~1.2.17",
        "@fortawesome/free-solid-svg-icons": "~5.8.1",
    };
    utils.editPackageJSON(paths.filesNames.packageJson, "dependencies", dependencies);
    shell.exec("npm install");
};

const createBaseProject = (projectName) => {
    logger.log("Creando proyecto base...");
    shell.exec(`npx -p @angular/cli@7.3.8 -c 'ng new ${projectName} --style=scss --defaults=true'`);
    shell.cd(projectName);
    utils.removeRuleFromLint("directive-selector", "app");
    utils.removeRuleFromLint("component-selector", "app");
    installDependencies();
    shell.cd("../");
};

const createDirectories = (options) => {
    shell.cd(options.projectName);
    shell.mkdir(paths.dirs.components);
    shell.mkdir(paths.dirs.genericsComponents);
    shell.mkdir(paths.dirs.dtos);
    shell.mkdir(paths.dirs.filters);
    shell.mkdir(paths.dirs.responses);
    shell.mkdir(paths.dirs.services);
    shell.cd("../");
};

const createGenerics = (options) => {
    shell.cd(options.projectName);
    fs.writeFileSync(`${paths.genericsFiles.genericResponse}.ts`, template.genericResponseText());
    fs.writeFileSync(`${paths.genericsFiles.genericFilter}.ts`, template.genericFilterText());
    createComponent(paths.dirs.gotenConfirmButton, paths.gotenFiles.gotenConfirmButton, template.gotenConfirmButtonText(), true);
    createComponent(paths.dirs.gotenDatepicker, paths.gotenFiles.gotenDatepicker, template.gotenDatepickerTexts());
    createComponent(paths.dirs.gotenList, paths.gotenFiles.gotenList, template.gotenListTexts());
    createComponent(paths.dirs.gotenPagination, paths.gotenFiles.gotenPagination, template.gotenPaginationTexts());
    createComponent(paths.dirs.gotenRadio, paths.gotenFiles.gotenRadio, template.gotenRadioTexts());
    shell.cd("../");
};

const createInitialFiles = (options) => {
    shell.cd(options.projectName);
    createComponent(paths.dirs.home, paths.componentsFiles.home, template.homeComponentTexts());
    createComponent(paths.dirs.menu, paths.componentsFiles.menu, template.menuComponentTexts(options.projectName));
    fs.writeFileSync(`${paths.initialFiles.routes}.ts`, template.appRoutesText());
    createComponent(paths.dirs.app, paths.initialFiles.appComponent, template.appComponentTexts());
    fs.writeFileSync(`${paths.initialFiles.appModule}.ts`, template.appModuleText());
    fs.writeFileSync(`${paths.initialFiles.indexHtml}.html`, template.indexHtmlText(options.projectName));
    fs.writeFileSync(`${paths.initialFiles.stylesSass}.css`, template.stylesSassText());
    fs.writeFileSync(`${paths.initialFiles.stylesSass}.scss`, template.stylesSassText());
    fs.writeFileSync(`${paths.initialFiles.variablesCustomSass}.scss`, template.variablesCustomSassText(options));
    fs.createReadStream(imagenes.gotenLogo)
        .pipe(fs.createWriteStream(`${paths.initialFiles.assets}`));
    fs.writeFileSync(`${paths.initialFiles.goten}`, template.goten());
    shell.cd("../");
};

const addAuthToModule = () => {
    const endTag = "// </imports>";
    const codeImports = authInject.authToModuleText().imports();
    utils.addCode(paths.initialFiles.appModule + ".ts", endTag, codeImports);
    const endTagModule = "// </imports-module>";
    const codeImportsModule = authInject.authToModuleText().importsModule();
    utils.addCode(paths.initialFiles.appModule + ".ts", endTagModule, codeImportsModule);
    const endTagProvider = "// </imports-providers>";
    const codeImportsProvider = authInject.authToModuleText().providers();
    utils.addCode(paths.initialFiles.appModule + ".ts", endTagProvider, codeImportsProvider);
};

const createBaseLogin = () => {
    logger.log("Instalando dependencias de auth...");
    shell.exec("npm install --save @auth0/angular-jwt");
    shell.exec("npm install ngx-toastr@^10.1.0 --save ");
    logger.log("Agregando estilos...");
    addStyleAngularJson("node_modules/ngx-toastr/toastr.css");
};

const addStyleAngularJson = (pathNewStyle) => {
    let angularJson = JSON.parse(fs.readFileSync("angular.json"));
    const projectName = process.cwd().split(path.sep).pop();
    angularJson.projects[projectName].architect.build.options.styles.push(pathNewStyle);
    fs.writeFileSync("angular.json", JSON.stringify(angularJson, null, 4));
};

const addAuthorization = ()=>{
    createBaseLogin();
    createLoginDirectory();
    createLoginFiles();
    addAuthToModule();
    addAuthBehavior();
    addAuthRoutes();
    utils.addUsedCommand("auth");
};

const createLoginDirectory = () => {
    logger.log("Creando carpeta dedicada...");
    shell.mkdir(paths.dirs.auth);
};

const createLoginFiles = (options) => {
    logger.log("Creando archivos...");
    createRegisterComponent(paths.dirs.auth, "login", template.loginComponentTexts());
    createService(paths.dirs.auth, "auth", template.authServiceText());
    createService(paths.dirs.auth, "authGuard", template.authGuardServiceText());
    createService(paths.dirs.auth, "interceptor", template.interceptorServiceText());
    createService(paths.dirs.auth, "errorInterceptor", template.errorInterceptorServiceText());
    utils.createFile(paths.dirs.auth, "user.model.ts", template.userModelText());
};

const createRegisterComponent = (pathLocation, nameComponent, componentText) => {
    const currentDir = shell.pwd();
    shell.cd(pathLocation);
    shell.exec(`npx -p @angular/cli@7.3.8 -c "ng generate component --selector '${nameComponent}' --flat --spec false ${nameComponent}"`);
    shell.cd(currentDir);
    createComponent(pathLocation, pathLocation + `${nameComponent}.component`, componentText);
};

const createService = (pathLocation, nameService, templateText) => {
    const currentDir = shell.pwd();
    shell.cd(pathLocation);
    fs.writeFileSync(`${nameService}.service.ts`, templateText);
    shell.cd(currentDir);
};

const addAuthBehavior = () => {
    utils.replaceText(
        paths.initialFiles.appComponent + ".html",
        "<menu-tab></menu-tab>",
        "<menu-tab *ngIf='currentUser'></menu-tab>"
    );

    utils.replaceText(
        paths.componentsFiles.menu + ".html",
        "<!-- logout -->",
        "<a class=\"nav-link\" style=\"cursor:pointer\" (click)=\"logout()\">Logout</a>"
    );

    utils.addCode(
        paths.componentsFiles.menu + ".ts",
        "// </imports-menu>",
        authInject.authToMenuText().imports()
    );

    utils.replaceText(
        paths.componentsFiles.menu + ".ts",
        "import { Component } from '@angular/core';",
        "import { Component, OnInit } from '@angular/core';"
    );

    utils.addCode(
        paths.componentsFiles.menu + ".ts",
        "// </constructor-menu>",
        authInject.authToMenuText().constructor()
    );

    utils.replaceText(
        paths.componentsFiles.menu + ".ts",
        "// </definitions-menu>",
        authInject.authToMenuText().definition()
    );

    utils.replaceText(
        paths.componentsFiles.menu + ".ts",
        "export class MenuComponent",
        "export class MenuComponent implements OnInit"
    );

    utils.replaceText(
        paths.componentsFiles.menu + ".ts",
        "// </behavior>",
        authInject.authToMenuText().behavior()
    );

    utils.addCode(
        paths.initialFiles.appComponent + ".ts",
        "// </app-component-imports>",
        authInject.authToAppText().imports()
    );

    utils.addCode(
        paths.initialFiles.appComponent + ".ts",
        "// </app-component>",
        authInject.authToAppText().behavior()
    );
};

const createComponent = (dir, pathFile, componentTexts, condensed = false) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    if (!condensed) {
        fs.writeFileSync(`${pathFile}.ts`, componentTexts.ts());
        fs.writeFileSync(`${pathFile}.html`, componentTexts.html());
        if (componentTexts.css) {
            fs.writeFileSync(`${pathFile}.scss`, componentTexts.css());
        }
    } else {
        fs.writeFileSync(`${pathFile}.ts`, componentTexts);
    }
};

const addAuthRoutes = () => {

    utils.addCode(
        paths.initialFiles.routes + ".ts",
        "// </imports>",
        authInject.authToRoutesText().imports()
    );

    utils.addCode(
        paths.initialFiles.routes + ".ts",
        "// </routes>",
        authInject.authToRoutesText().routes()
    );

    utils.replaceText(
        paths.initialFiles.routes + ".ts",
        "{ path: 'home', component: HomeComponent },",
        "{ path: 'home', component: HomeComponent, canActivate: [AuthGuard] },"
    );

};

const registerApi = (options) => {
    shell.cd(options.projectName);
    utils.addCode("src/environments/environment.ts", "\n}", `,\n    BASE_URL: '${options.api}',`);
    shell.cd("../");
    logger.log("Api registrada");
};

const createDTO = (name, options) => {
    logger.log(`[INFO] - Creando ABM "${name}"... `);
    const lowerName = name.toLowerCase();
    fs.writeFileSync(`${paths.dirs.dtos}${lowerName}.dto.ts`, template.dtoText(name, options));
};

const createFilter = (name, options) => {
    const lowerName = name.toLowerCase();
    fs.writeFileSync(`${paths.dirs.filters}${lowerName}.filter.ts`, template.filterText(name, options));
};

const createResponse = (name, options) => {
    const lowerName = name.toLowerCase();
    fs.writeFileSync(`${paths.dirs.responses}${lowerName}.response.ts`, template.responseText(name, options));
};

const createMainComponent = (name, options) => {
    const lowerName = name.toLowerCase();
    shell.exec(`npx -p @angular/cli@7.3.8 -c "ng generate component --selector '${lowerName}s-tab' --spec false ${name}s"`);
    createComponent(`${lowerName}s`, `${lowerName}s/${lowerName}s.component`, template.mainComponentTexts(name));
};

const createTableComponent = (name, options) => {
    const lowerName = name.toLowerCase();
    shell.exec(`npx -p @angular/cli@7.3.8 -c "ng generate component --selector '${lowerName}s-table' --spec false ${name}Table"`);
    createComponent(`${lowerName}-table`, `${lowerName}-table/${lowerName}-table.component`, template.tableComponentTexts(name, options));
};

const createFilterComponent = (name, options) => {
    const lowerName = name.toLowerCase();
    shell.exec(`npx -p @angular/cli@7.3.8 -c "ng generate component --selector '${lowerName}s-filter' --spec false ${name}Filter"`);
    createComponent(`${lowerName}-filter`, `${lowerName}-filter/${lowerName}-filter.component`, template.filterComponentTexts(name, options));
};

const createModalComponent = (name, options) => {
    const lowerName = name.toLowerCase();
    shell.exec(`npx -p @angular/cli@7.3.8 -c "ng generate component --entry-component true --selector '${lowerName}s-modal' --spec false ${name}Modal"`);
    createComponent(`${lowerName}-modal`, `${lowerName}-modal/${lowerName}-modal.component`, template.modalComponentTexts(name, options));
};

const createPaginationComponent = (name, options) => {
    const lowerName = name.toLowerCase();
    shell.exec(`npx -p @angular/cli@7.3.8 -c "ng generate component --selector '${lowerName}s-pagination' --spec false ${name}Pagination"`);
    createComponent(`${lowerName}-pagination`, `${lowerName}-pagination/${lowerName}-pagination.component`, template.paginationComponentTexts(name));
};

const createComponents = (name, options) => {
    logger.log(`[INFO] - Creando componentes para "${name}"... `);
    const lowerName = name.toLowerCase();
    const currentDir = shell.pwd();
    shell.mkdir(`${paths.dirs.components}${lowerName}`);
    shell.cd(`${paths.dirs.components}${lowerName}`);
    createMainComponent(name, options);
    createTableComponent(name, options);
    createFilterComponent(name, options);
    createModalComponent(name, options);
    createPaginationComponent(name, options);
    shell.cd(currentDir);
};

const createServiceABM = (name, options) => {
    logger.log(`[INFO] - Generando servicios ... `);
    const lowerName = name.toLowerCase();
    const currentDir = shell.pwd();
    shell.cd(`${paths.dirs.services}`);
    shell.exec(`npx -p @angular/cli@7.3.8 -c "ng generate service --flat --spec false ${lowerName}"`);
    fs.writeFileSync(`${lowerName}.service.ts`, template.serviceText(name));
    shell.cd(currentDir);
};

const importRoute = (name, options) => {
    const lowerName = name.toLowerCase();
    const path = `${paths.initialFiles.routes}.ts`;
    const endTag = "// </imports>";
    const code = `import { ${name}sComponent } from './components/${lowerName}/${lowerName}s/${lowerName}s.component';\n`;
    utils.addCode(path, endTag, code);
};

const registerRoute = (name, options) => {
    logger.log(`[INFO] - Registrando rutas... `);
    importRoute(name, options);
    const lowerName = name.toLowerCase();
    const path = `${paths.initialFiles.routes}.ts`;
    const endTag = "// </routes>";
    let code = `    { path: '${lowerName}s', component: ${name}sComponent },\n`;
    if (options.auth){
        code = `    { path: '${lowerName}s', component: ${name}sComponent, canActivate: [AuthGuard] },\n`;
    }
    utils.addCode(path, endTag, code);
};

const registerMenu = (name, options) => {
    const lowerName = name.toLowerCase();
    const path = `${paths.componentsFiles.menu}.ts`;
    const endTag = "// </tabs>";
    const code = `            { link: '/${lowerName}s', title: '${name}' },\n`;
    utils.addCode(path, endTag, code);
};


module.exports = {
    createBaseProject,
    createDirectories,
    createGenerics,
    createInitialFiles,
    registerApi,
    createDTO,
    createFilter,
    createResponse,
    createMainComponent,
    createTableComponent,
    createFilterComponent,
    createModalComponent,
    createPaginationComponent,
    createComponents,
    createServiceABM,
    registerRoute,
    registerMenu,
    addAuthorization,
};
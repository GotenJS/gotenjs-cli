const angularCommands = require("../commands/angular-commands");
const angularIndex = require("../commands/angular-index");

const addAngularCommands = (program, funtions) => {
    program
        .command("new-angular <name>")
        .option("-a, --api <api>", "properties from model")
        .option("-p, --primary <color>", "primary")
        .option("-d, --danger <color>", "danger")
        .option("-s, --success <color>", "success")
        .option("-i, --info <color>", "info")
        .option("-w, --warning <color>", "warning")
        .option("-S, --secondary <color>", "secondary")
        .description("creates angular project")
        .action(angularCommands.createProjectCommand);
		
    program
        .command("abm-angular <name>")
        .option("-p, --props <props>", "properties from model", funtions.collect, [])
        .option("-i, --internalModels <name>", "custom properties from model", funtions.collect, [])
        .option("--auth", "adds auth middlewares to the ABM. Needs run 'goten auth' previously.")
        .description("creates angular abm")
        .action(angularIndex.generateABM);
	
    //Observacion:Al hacer 'goten icon-browser' por default toma los comandos de react  	
    program
        .command("favicon-angular <pathLocal>")
        .description("Assign a favicon to the browser, specifying a local path. Acceptable formats: ico, jpeg, jpg y png. Size: until 1000x1000")
        .action(angularIndex.addFavicon);
		
    program
        .command("auth-angular")
        .description("add resources to login: jwt, interceptor, route guard, redirects, etc")
        .action(angularIndex.addAuthorization);
};

module.exports = {
    addAngularCommands
};
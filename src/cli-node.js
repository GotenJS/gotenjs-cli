const nodeCommands = require("../commands/node-commands");
const nodeIndex = require("../commands/node-index");

const addNodeCommands = (program, funtions) => {
    program
        .command("new <name>")
        .description("creates node project with express")
        .option("-V, --versioning","adds goten-versioning")
        .option("-p, --port <port>","port of webapp")
        .option("-d, --database <engine>","engine of database")
        .option("-n, --dbname <dbname>","name of database")
        .option("-h, --dbhost <dbhost>","host of database")
        .option("-P, --dbport <dbport>","port of database")
        .option("-u, --dbuser <dbuser>","user of database")
        .option("-w, --dbpass <dbpass>","pass of database")
        .option("-y, --yes","default values")
        .action(nodeIndex.createProjectCommand);

    program
        .command("model <name>")
        .description("creates model")
        .option("-p, --props <prop>", "properties from model", funtions.collect, [])
        .option("-m, --migrate", "autorun migrations (only sql)")
        // .option('-db, --database','default it\'s mongo, you can specified "mongo" or "MySQL"')
        .action(nodeCommands.createModelCommand);

    program
        .command("abm <name>")
        .description("creates routers, controllers, middlewares, filters, dtos, assemblers, services and models")
        .option("-p, --props <prop>", "properties from model", funtions.collect, [])
        .option("-m, --migrate", "autorun migrations (only sql)")
        .option("-V, --versioning <versionNumber>", "version number")
        .option("-a, --auth", "adds auth middlewares to the ABM. Needs run 'goten auth' previously.")
        // .option('-db, --database','default it\'s mongo, you can specified "mongo" or "MySQL"')
        .action(nodeIndex.generateABM);

    program
        .command("db <motor>")
        .description("configure database")
        .option("-h, --dbhost <prop>", "database host")
        .option("-P, --dbport <prop>", "database port")
        .option("-n, --dbname <prop>", "database name")
        .option("-u, --dbuser <prop>", "database user")
        .option("-w, --dbpass <prop>", "database passwortd")
        .option("-y, --yes", "default and empty values")    
        .action(nodeCommands.createDatabaseCommand);

    program
        .command("version")
        .description("creates versions routes")
        .action(nodeCommands.generateVersionCommand);

    program
        .command("migrate")
        .description("run migrations (only sql)")
        .action(nodeCommands.migrateCommand);

    program
        .command("auth")
        .description("adds authentication with JWT and role/attribute-based permissions")
        .action(nodeIndex.addAuthorization);
};


module.exports = {
    addNodeCommands
};
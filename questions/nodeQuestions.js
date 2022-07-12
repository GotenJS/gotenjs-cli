const inquirer = require("inquirer");
const engines = require("../utils/node/engines");
const questionUtils = require("./utils");
const properties = [];

const getCreateQuestions = (options) => {
    const questions = [];
    if (!options.database.engine) questions.push({
        type: "list",
        name: "db.engine",
        message: "Enter database engine",
        choices: engines.getEnginesNames(),
        default: engines.getEngineByName().name,
    });
    if (!options.port) questions.push({
        type: "input",
        name: "port",
        message: "Enter port",
        default: "3800",
        validate: questionUtils.requiredValue
    });
    return questions;
};

const getDatabaseQuestions = (options) => {
    const questions = [];
    if (!options.dbname) questions.push({
        type: "input",
        name: "db.dbname",
        message: "Enter dbname",
        validate: questionUtils.requiredValue,
        default: options.projectName
    });
    if (!options.dbhost) questions.push({
        type: "input",
        name: "db.host",
        message: "Enter dbhost",
        default: "127.0.0.1",
        validate: questionUtils.requiredValue
    });
    if (!options.dbport) questions.push({
        type: "input",
        name: "db.port",
        message: "Enter dbport",
        default: (answers) => engines.getEngineByName(answers.db && answers.db.engine ?
            answers.db.engine :
            options.database.engine).port,
        validate: questionUtils.requiredValue
    });
    if (!options.dbuser) questions.push({
        type: "input",
        name: "db.user",
        message: "Enter dbuser (none by default)",
    });
    if (!options.dbpass) questions.push({
        type: "password",
        name: "db.pass",
        message: "Enter dbpass",
        when: (answer) => !!answer.db.user
    });
    return questions;
};

const getCreateOptions = async (options) => {
    const questions = [...getCreateQuestions(options), ...getDatabaseQuestions(options)];
    const answers = await inquirer.prompt(questions);
    const newOptions = { ...options };
    newOptions.database = { ...newOptions.database, ...answers.db };
    return newOptions;

};

const getDatabaseOptions = async (options) => {
    const questions = getDatabaseQuestions(options);
    const answers = await inquirer.prompt(questions);
    const newOptions = { ...options.database, ...answers.db };
    return newOptions;
};

const getPropertyQuestions = (schemaTypes, arrayTypes, useCustomTypes) => {
    const questions = [];
    const types = [...schemaTypes];
    questions.push({
        type: "input",
        name: "name",
        message: "Name of property",
        validate: questionUtils.inputValidate.bind(this, properties)
    });
    questions.push({
        type: "list",
        name: "type",
        message: "Type of property",
        choices: types,
        validate: questionUtils.requiredValue
    });
    questions.push({
        type: "list",
        name: "type",
        message: "Type of property",
        choices: arrayTypes,
        validate: questionUtils.requiredValue,
        when: (previousAnswer) => previousAnswer.type.toLowerCase() === "array",
        filter: (answer) => `[${answer}]`
    });
    questions.push({
        type: "confirm",
        name: "more",
        message: "Add other property",
        validate: questionUtils.requiredValue
    });
    return questions;
};

const getProps = async (coustomType, model = { className: coustomType, props: [] }, schemaTypes, arrayTypes, useCustomTypes = true) => {
    const answers = await inquirer.prompt(getPropertyQuestions(schemaTypes, arrayTypes, useCustomTypes));
    model.props.push(`${answers.name}: ${answers.type}`);
    if (answers.more) {
        await getProps(coustomType, model, schemaTypes, arrayTypes, useCustomTypes);
    }
    return model;
};

const defineProps = async (modelName, options) => {
    const schemaTypes = Object.keys(engines.getTypesByEngine(options.database.name));
    const arrayTypes = Object.keys(engines.getArrayTypesByEngine(options.database.name));
    const domain = await getProps(modelName, { className: modelName, props: [] }, schemaTypes, arrayTypes);
    return domain.props;
};

const getAuthQuestions = () => {
    const questions = [];
    questions.push({
        type: "input",
        name: "userModel",
        message: "Nombre modelo usuarios",
        validate: questionUtils.requiredValue
    });
    questions.push({
        type: "input",
        name: "rolModel",
        message: "Nombre modelo roles",
        validate: questionUtils.requiredValue
    });
    questions.push({
        type: "confirm",
        name: "useSingleSignOn",
        message: "Desea habilitar single sign-on?",
        validate: questionUtils.requiredValue
    });
    return questions;
};

const getSingleSignOnQuestions = () => {
    // TODO - Agregar más opciones
    const questions = [];
    questions.push({
        type: "input",
        name: "host",
        message: "Redis host",
        default: "redis",
        validate: questionUtils.requiredValue
    });
    questions.push({
        type: "input",
        name: "port",
        message: "Redis port",
        default: "null"
    });
    return questions;
};

const getAuthOptions = async () => {
    const questions = getAuthQuestions();
    const answers = await inquirer.prompt(questions);
    if (answers.useSingleSignOn) {
        const singleSignOnQuestions = getSingleSignOnQuestions();
        answers.singleSignOn = await inquirer.prompt(singleSignOnQuestions);
    }
    return answers;
};

module.exports = {
    getCreateOptions,
    getDatabaseOptions,
    defineProps,
    getAuthOptions,
};
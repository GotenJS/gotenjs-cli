const inquirer = require("inquirer");
const utils = require("../utils/angular/utils");
const questionUtils = require("./utils");
const properties = [];

const defineApi = async () => {
    const questions = [{
        type : "input",
        name : "api",
        message : "define url API",
        validate: questionUtils.requiredValue,
        default: "http://127.0.0.1:3800/"
    }];
    const answers = await inquirer.prompt(questions);
    return answers.api;
};

const defineProps = async (name) => {
    let model = {className: name, props: []};
    const domain = await getProps(name, model, true);
    return domain.props;
};

const getPropertyQuestions = (useCustomTypes) => {
    const types = [...Object.keys(utils.angularTypes)];
    const questions = [];
	
    if (useCustomTypes) {
        types.push("Other");
    }
    
    questions.push({
        type : "input",
        name : "name",
        message : "Name of property",
        validate: questionUtils.inputValidate.bind(this, properties)
    });
    questions.push({
        type : "list",
        name : "type",
        message : "Type of property",
        choices: types,
        validate: questionUtils.requiredValue
    });
    questions.push({
        type : "list",
        name : "type",
        message : "Type of property (II)",
        choices: ["Array", "Custom"],
        validate: questionUtils.requiredValue,
        when: (answer) => answer.type === "Other",
    });
    questions.push({
        type : "input",
        name : "type",
        message : "Define custom type name",
        validate: questionUtils.inputValidate,
        when: (previousAnswer) => previousAnswer.type === "Custom",
    });
    questions.push({
        type : "list",
        name : "type",
        message : "Type of property",
        choices: [...Object.keys(utils.angularTypes), "Custom"],
        validate: questionUtils.requiredValue,
        when: (previousAnswer) => previousAnswer.type === "Array",
        filter: (answer) => `Array<${answer}>`
    });
    questions.push({
        type : "input",
        name : "type",
        message : "Define custom type name",
        validate: questionUtils.inputValidate,
        when: (previousAnswer) => previousAnswer.type === "Array<Custom>",
        filter: (answer) => `Array<${answer}>`
    });
    questions.push({
        type : "confirm",
        name : "more",
        message : "Add other property",
        validate: questionUtils.requiredValue
    });
    return questions;
};

const getProps = async (coustomType, model = {className: coustomType, props: []}, useCustomTypes) => {
    const answers = await inquirer.prompt(getPropertyQuestions(useCustomTypes));
    model.props.push(`${answers.name}: ${answers.type}`);
    if (answers.more) {
        await getProps(coustomType, model, useCustomTypes);
    }
    return await model;
};

const getPropsToCustomType = async (coustomType, model = {className: coustomType, props: []}) => {
    return await getProps(coustomType, model = {className: coustomType, props: []}, false);
};

const defineEntities = async (options) => {
    const setCustomTypes = new Set([
        ...options.props
            .filter(prop => utils.containsCustomProp(prop))
            .map(prop => utils.getFormatTypeOfProperty(prop))
            .filter(type => {
                return !options.internalModels
                    .find(internalModel => internalModel.className.toLowerCase() === type.toLowerCase());
            })
    ]);
    const coustomTypes = [...setCustomTypes];
    const models = options.internalModels;
    for( let coustomType of coustomTypes){
        console.log(`Define properties of ${coustomType}`);
        models.push(await getPropsToCustomType(coustomType));
    }
    return models;
};

module.exports = {
    defineApi,
    defineProps,
    defineEntities,
};
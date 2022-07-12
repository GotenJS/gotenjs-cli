const inquirer = require("inquirer");
const utils = require("../utils/react/utils");
const questionUtils = require("./utils")
const properties = [];

const defineApi = async () => {
    const questions = [{
        type : "input",
        name : "api",
        message : "define APIs URL",
        validate: questionUtils.requiredValue,
        default: "http://localhost:3800/"
    }];
    const answers = await inquirer.prompt(questions);
    return answers.api;
};

const defineProps = async (name) => {
    const domain = await getProps(name, {className: name, props: []}, true);
    return domain.props;
};

const getPropertyQuestions = (useCustomTypes) => {
    const types = [...Object.keys(utils.reactTypes)];
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
        choices: [...Object.keys(utils.reactTypes), "Custom"],
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

const getProps = async (customType, model = {className: customType, props: []}, useCustomTypes) => {
    const answers = await inquirer.prompt(getPropertyQuestions(useCustomTypes));
    model.props.push(`${answers.name}:${answers.type}`);
    if (answers.more) {
        await getProps(customType, model, useCustomTypes);
    }
    return await model;
};

const getPropsToCustomType = async (customType, model = {className: customType, props: []}) => {
    return await getProps(customType, model, false);
};

const defineEntities = async (options) => {

    const setCustomTypes = new Set([
        ...options.props
            .map(prop => utils.getFormatTypeOfProperty(prop))
            .filter(type => {
                return !utils.typeIsNative(type) &&
					!options.internalModels.find(internalModel => internalModel.className === type);
            })
    ]);

    const customTypes = [...setCustomTypes];
    const models = options.internalModels;
    for( let customType of customTypes){
        console.log(`Define properties of ${customType}`);
        models.push(await getPropsToCustomType(customType));
    }
    return models;
};

module.exports = {
    defineApi,
    defineEntities,
    defineProps,
};
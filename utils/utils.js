const fs = require("fs");
const replace = require("replace-in-file");
const shell = require("shelljs");
const underscore = require("underscore");

const addCode = (path, endTag, code) =>{
    let file = fs.readFileSync(path, "utf-8");
    let initIndex = file.indexOf(endTag);
    file = file.slice(0, initIndex) + code + file.slice(initIndex);
    fs.writeFileSync(path, file);
};

const replaceCode = (path, previousCode, newCode) =>{
    let file = fs.readFileSync(path, "utf-8");
    let initIndex = file.indexOf(previousCode);
    file = file.slice(0, initIndex) + newCode + file.slice(initIndex+previousCode.length);
    fs.writeFileSync(path, file);
};

const capitalizeString = (str) => {
    return str[0].toUpperCase() + str.substring(1, str.length).toLowerCase();
};

const createFile = (pathLocation, fileName, content) => {
    if (!fs.existsSync(pathLocation)) {
        fs.mkdirSync(pathLocation);
    }
    const currentDir = shell.pwd();
    shell.cd(pathLocation);
    fs.writeFileSync(fileName, content);
    shell.cd(currentDir);
};

const replaceText = (pathFile, from, to) => {
    const replaceOption = {
        files: pathFile,
        from,
        to,
    };
    try {
        const changes = replace.sync(replaceOption);
        console.log("Modified files:", changes.join(", "));
    }
    catch (error) {
        console.error("Error occurred:", error);
    }
};

const editPackageJSON = (path, attribute, newData, property = null) => {
    const packageJson = JSON.parse(
        fs.readFileSync(path, "utf-8")
    );
    if (property)
        packageJson[attribute][property] = newData;
    else if (underscore.isObject(newData))
        packageJson[attribute] = {...packageJson[attribute], ...newData};
    else packageJson[attribute] = newData;
    fs.writeFileSync(path, JSON.stringify(packageJson), null, 4);
};

const addImport = (pathFile, code) => {
    let fileData = fs.readFileSync(pathFile, "utf-8");
    fileData = code + "\n" + fileData;
    fs.writeFileSync(pathFile, fileData);
};

const gotenTechnologyConfig = () => {
    const pathDotGoten = process.cwd() + "/.goten";
    var arch = JSON.parse(fs.readFileSync(pathDotGoten, "utf-8"));
    return arch;
};

const addUsedCommand = (command) =>{
    let config = gotenTechnologyConfig();
    if(config.commands){
        if(!config.commands.includes(command)){
            config = {...config, commands:[command,...config.commands]};
        }
    }else{
        config = {...config, commands:[command]};
    }
    fs.writeFileSync("./.goten", JSON.stringify(config), null, 4);
};

const loadJson = (path) => {
    return JSON.parse(fs.readFileSync(`${path}`, "utf8"));
};

const validateCommand = (validate, action) => {
    return (...params) => {
        try {
            validate(...params);
            action(...params);
        } catch (e) {
            console.log(e.message);
        }
    };
};

const gotenError = (msg) => {
    throw new Error(msg);
};

const getArrayType = (value) => {
    return value.replace(/.*?\<(.*?)\>/g, "$1");
}

const regex = {
    names:/^[a-zA-Z]+[0-9]*$/m
}

module.exports = {
    addCode,
    replaceCode,
    capitalizeString,
    createFile,
    replaceText,
    editPackageJSON,
    addImport,
    addUsedCommand,
    gotenTechnologyConfig,
    loadJson,
    validateCommand,
    gotenError,
    regex,
    getArrayType
};
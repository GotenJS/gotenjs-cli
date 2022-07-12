const paths = require("./paths");
const fs = require("fs");

const isGotenProject = () => {
    return fs.existsSync(paths.initialFiles.dotGoten);
};

const projectTechnology = () => {
    var arch = JSON.parse(fs.readFileSync(paths.initialFiles.dotGoten, "utf-8"));
    return arch.technology;
};

module.exports = {
    isGotenProject,
    projectTechnology
};
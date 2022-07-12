const dotGotenText = (options) => {
    const db = options.database.engine;
    const plugins = [];
    if (options.versioning) plugins.push("\"versioning\"");
    return `{
    "dbs": [ "${db}" ],
    "plugins": [ ${plugins.join(", ")} ]
}
`;
};
module.exports = dotGotenText;
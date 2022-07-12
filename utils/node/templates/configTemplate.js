const configText = (port=3800) => {
    return `{
    "db": {},
    "server": {
        "port": ${port}
    }
}`;
};
module.exports = configText;
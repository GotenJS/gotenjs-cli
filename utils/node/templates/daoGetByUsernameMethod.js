
const daoGetByUsernameMethod = (name, dbModel) => `\n\tstatic getByUsername(username) {
        return ${name}.findOne({ ${dbModel === "mongo" ? "username" : "where: { username }" }})
    }
`;
module.exports = daoGetByUsernameMethod;
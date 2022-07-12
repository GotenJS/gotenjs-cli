const utils = require("../../utils");

const serviceAuthMethod = (name) => {
    const upperCaseName = utils.capitalizeString(name);
    return `\n\tstatic async auth(username, requestPassword) {
        const ${name} = await ${upperCaseName}DAO.getByUsername(username)
        if(${name}){
            const { passwordHash } = sha256(requestPassword, ${name}.salt)
            if (${name}.password === passwordHash) {
                return ${name}
            }
        }
        throw new Error('Invalid login data')
    }
`;};
module.exports = serviceAuthMethod;

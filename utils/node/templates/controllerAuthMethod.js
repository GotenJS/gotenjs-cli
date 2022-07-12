const controllerAuthMethod = (name, useSingleSignOn) => `\n\tstatic auth(req, res, next) {
        const requestUsername = req.body.username
        const requestPassword = req.body.password
        ${name}Controller.resolve(next, ${name}Service.auth(requestUsername, requestPassword), ${name.toLowerCase()} => {
            const { id, password, salt, ...jwtPayload } = ${name}Assembler.toDTO(${name.toLowerCase()})
            const jwt = jsonwebtoken.sign({...jwtPayload}, secrets.jwt)
            ${useSingleSignOn ? `Redis.set(requestUsername, {${name}: { ...jwtPayload }, jwt})` : ""}
            res.status(200).send({
                data: jwt,
            })
        }, 401)
    }
`;
module.exports = controllerAuthMethod;
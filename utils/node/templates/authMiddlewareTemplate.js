const authMiddlewareTemplate = (useSingleSignOn) => `const jsonwebtoken = require('jsonwebtoken')
const secrets = require('../utils/secrets')
${useSingleSignOn ? "const Redis = require('../utils/redis')" : ""}

const isAuth = (req, res, next) => {
    try {
        const jwt = req.headers.token
        if (!jwt) {
            throw new Error('Not logged in')
        }
        const payload = jsonwebtoken.verify(jwt, secrets.jwt)
        req.token = payload
    } catch (err) {
        return next(err)
    }
    next()
}

${useSingleSignOn ? `const singleSignOn = async (req, res, next) => {
    const jwt = req.headers.token
    const userCache = await Redis.get(req.token.username)
    if (!userCache || userCache.jwt !== jwt) {
        next(new Error('expired by single sign-on'))
    }
    next()
}` : "" }


module.exports = {
    isAuth,
    ${useSingleSignOn ? "singleSignOn," : ""}
}
`;
module.exports = authMiddlewareTemplate;
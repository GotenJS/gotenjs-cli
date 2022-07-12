const userAuthMiddlewareTemplate = () => `const crypto = require('crypto');
const { check, validationResult } = require('express-validator/check');

//<private>

// generates random string of characters i.e salt
const genRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex')
            .slice(0,length)
}

// hash password with sha256
const sha256 = function(password, salt){
    const hash = crypto.createHmac('sha256', salt)
    hash.update(password)
    return {
        salt,
        passwordHash: hash.digest('hex')
    }
}

//<!private>

const createUserValidations = () => {
    return [
        [
            check('username')
                .isAlphanumeric(),
            check('password')
                .isLength({ min: 10 })
                .isAlphanumeric()
        ],
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                next({status: 400, message: errors.array()});
            } else {
                next()
            }
        }
    ]
}

const hashPassword = (req, res, next) => {
    const password = req.body.password
    const { salt, passwordHash } = sha256(password, genRandomString(16))
    req.body.password = passwordHash
    req.body.salt = salt
    next()
}

module.exports = {
    createUserValidations,
    hashPassword,
}
`;
module.exports = userAuthMiddlewareTemplate;
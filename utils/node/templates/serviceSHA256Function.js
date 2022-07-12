const serviceSHA256Function = () => `const crypto = require('crypto')

// hash password with sha256
const sha256 = function(password, salt){
    const hash = crypto.createHmac('sha256', salt)
    hash.update(password)
    return {
        salt,
        passwordHash: hash.digest('hex')
    }
}
`;

module.exports = serviceSHA256Function;
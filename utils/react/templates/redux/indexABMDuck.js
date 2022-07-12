module.exports = indexABMDuck = (name) => (
    `export { default as ${name.toLowerCase()}Operations } from './operations'
export { default as ${name.toLowerCase()}Types } from './types'
`
);
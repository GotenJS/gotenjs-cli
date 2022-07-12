module.exports = operationsAppDuck = () => (
    `import actions from './actions'


const showSnackbar = actions._showSnackbar
const closeSnackbar = actions._closeSnackbar

export default {
    showSnackbar,
    closeSnackbar
}
`
);
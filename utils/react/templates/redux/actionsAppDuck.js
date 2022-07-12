module.exports = actionsAppDuck = () => (
    `import TYPES from './types'


function _showSnackbar(message, messageType){
    return({
        type: TYPES.SHOW_SNACKBAR,
        data: {message, messageType}
    })
}

function _closeSnackbar(){
    return({
        type: TYPES.CLOSE_SNACKBAR
    })
}

export default {
    _showSnackbar,
    _closeSnackbar
}
`
);
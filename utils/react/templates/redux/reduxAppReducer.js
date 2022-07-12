module.exports = reduxAppReducer = () => (
    `import { appTypes } from '../../duck'

const initialState = {
    snackbar: {
        visible: false,
        message: "",
        messageType: ""
    }
}

export default function appReducer(state = initialState, action){
    switch(action.type){
        case appTypes.SHOW_SNACKBAR:
            return {
                ...state,
                snackbar: {
                    visible: true,
                    message: JSON.stringify(action.data.message),
                    messageType: action.data.messageType
                }
            }
        case appTypes.CLOSE_SNACKBAR:
            return {
                ...state,
                snackbar: {...state.snackbar, visible: false}
            }
        default:
            return state
    }
}

`
);
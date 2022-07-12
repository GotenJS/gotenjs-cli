module.exports = actionsABMDuck = (name) => (
    `import TYPES from './types'


function _load${name}(response){
    return({
        type: TYPES.LOAD_${name.toUpperCase()}S,
        response
    })
}

function _push${name}(${name.toLowerCase()}){
    return({
        type: TYPES.PUSH_${name.toUpperCase()},
        ${name.toLowerCase()}
    })
}

function _delete${name}FromStore(id){
    return({
        type: TYPES.DELETE_${name.toUpperCase()},
        id
    })
}

function _clear${name}Store(){
    return({
        type: TYPES.CLEAR_${name.toUpperCase()}_DATA,
    })
}

function _update${name}(${name.toLowerCase()}){
    return({
        type: TYPES.UPDATE_${name.toUpperCase()},
        ${name.toLowerCase()}
    })
}

export default {
    _clear${name}Store,
    _delete${name}FromStore,
    _load${name},
    _push${name},
    _update${name}
}
`
);
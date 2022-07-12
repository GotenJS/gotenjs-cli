module.exports = reduxAppReducer = (name) => {
    const lowerCaseName = name.toLowerCase();
    return (
        `import { ${lowerCaseName}Types } from '../../modules/${name}/duck'
import { initialQueryParams } from '../../modules/${name}/consts'


const initialState = {
    ${lowerCaseName}s: [],
    limit: initialQueryParams.limit,
    offset: initialQueryParams.offset,
    totalElements: 0
}

function delete${name}FromStore(${lowerCaseName}s, id){
    return ${lowerCaseName}s.filter(${lowerCaseName} => ${lowerCaseName}.id !== id)
}

function push${name}(${lowerCaseName}s, ${lowerCaseName}){
    return [...${lowerCaseName}s, ${lowerCaseName}]
}

function update${name}(${lowerCaseName}s, ${lowerCaseName}){
    const index = ${lowerCaseName}s.findIndex(element => element.id === ${lowerCaseName}.id)
    ${lowerCaseName}s.splice(index, 1, ${lowerCaseName})
    return [...${lowerCaseName}s]
}

export default function ${lowerCaseName}Reducer(state = initialState, action){
    switch(action.type){
        case ${lowerCaseName}Types.LOAD_${name.toUpperCase()}S:
            return {...state,
                ${lowerCaseName}s: action.response.list,
                offset: action.response.offset,
                limit: action.response.limit,
                totalElements: action.response.total
            }
        case ${lowerCaseName}Types.DELETE_${name.toUpperCase()}:
            return {...state, ${lowerCaseName}s: delete${name}FromStore(state.${lowerCaseName}s, action.id)}
        case ${lowerCaseName}Types.CLEAR_${name.toUpperCase()}_DATA:
            return {...initialState}
        case ${lowerCaseName}Types.PUSH_${name.toUpperCase()}:
            return {...state, ${lowerCaseName}s: push${name}(state.${lowerCaseName}s, action.${lowerCaseName})}
        case ${lowerCaseName}Types.UPDATE_${name.toUpperCase()}:
            return {...state, ${lowerCaseName}s: update${name}(state.${lowerCaseName}s, action.${lowerCaseName})}
        default:
            return state
    }
}
`
    );};
module.exports = operationsABMDuck = (name) => (
    `import actions from './actions'
import { initialQueryParams } from '../consts'
import { get${name}sAPI, delete${name}API, create${name}API, edit${name}API } from "../../../utils/api/api${name}"


const { 
    _load${name},
    _delete${name}FromStore,
    _update${name},
    _push${name},
    _clear${name}Store
} = actions

const get${name}sAction = (queryParams = initialQueryParams) => (dispatch) => {
    get${name}sAPI(queryParams)
    .then((response) => {
        dispatch(_load${name}(response))
    })
}

const delete${name}Action = (id) => (dispatch) => {
    delete${name}API(id)
    .then((data) =>
        dispatch(_delete${name}FromStore(id))
    )
}

const edit${name}Action = (new${name}) => (dispatch) => {
    edit${name}API(new${name}.id, new${name})
    .then((data) => {
        dispatch(_update${name}(data))
    })
}

const create${name}Action = (${name.toLowerCase()}) => (dispatch) => {
    create${name}API(${name.toLowerCase()})
    .then((data) => {
        dispatch(_push${name}(data))
        dispatch(get${name}sAction())
    })
}

const clearRedux${name} = () => (dispatch) => {
    dispatch(_clear${name}Store())
}

export default {
    create${name}Action,
    clearRedux${name},
    delete${name}Action,
    edit${name}Action,
    get${name}sAction
}
`
);
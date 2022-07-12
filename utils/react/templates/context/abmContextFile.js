module.exports = abmContextFile = (name) => {
    const lowerCaseName = name.toLowerCase();
    return (
        `import React from 'react'
import { initialQueryParams } from './consts'
import {
    get${name}sAPI,
    delete${name}API,
    create${name}API,
    edit${name}API
} from "../../utils/api/api${name}"

const { Provider, Consumer } = React.createContext()


const initialState = {
    ${lowerCaseName}s: [],
    limit: initialQueryParams.limit,
    offset: initialQueryParams.offset,
    totalElements: 0
}

class ${name}Provider extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ${lowerCaseName}Store: initialState
        }
    }

    _push${name} = async (${lowerCaseName}) => await this.setState({${lowerCaseName}Store: {
        ...this.state.${lowerCaseName}Store, 
        ${lowerCaseName}s: [...this.state.${lowerCaseName}Store.${lowerCaseName}s, ${lowerCaseName}]
    }})

    _load${name} = async (response) => await this.setState({${lowerCaseName}Store: {
        ...this.state,
        ${lowerCaseName}s: response.list,
        offset: response.offset,
        limit: response.limit,
        totalElements: response.total
    }})

    _delete${name}FromStore = async (id) => await this.setState({${lowerCaseName}Store: {
        ...this.state.${lowerCaseName}Store,
        ${lowerCaseName}s: this.state.${lowerCaseName}Store.${lowerCaseName}s.filter(${lowerCaseName} => ${lowerCaseName}.id !== id)
    }})

    _update${name} = async (${lowerCaseName}) => {
        const index = this.state.${lowerCaseName}Store.${lowerCaseName}s.findIndex(element => element.id === ${lowerCaseName}.id)
        this.state.${lowerCaseName}Store.${lowerCaseName}s.splice(index, 1, ${lowerCaseName})
        await this.setState({${lowerCaseName}Store: {
            ...this.state.${lowerCaseName}Store,
            ${lowerCaseName}s: [...this.state.${lowerCaseName}Store.${lowerCaseName}s]
        }})
    }
    
    create${name} = (${lowerCaseName}) => {
        return new Promise(async (res, rej) => {
            try {
                const data = await create${name}API(${lowerCaseName})
                await this._push${name}(data)
                await this.get${name}s()
                res({message: '${name} creado exitosamente'})
            } catch(e) {
                rej(e)
            }
        })
    }

    get${name}s = (queryParams = initialQueryParams) => {
        return new Promise(async (res, rej) => {
            try {
                const response = await get${name}sAPI(queryParams)
                await this._load${name}(response)
                res({message: 'Se han obtenido los ${lowerCaseName}s'})
            } catch(e) {
                rej(e)
            }
        })
    }

    delete${name} = (id) => {
        return new Promise(async (res, rej) => {
            try {
                const data = await delete${name}API(id)
                await this._delete${name}FromStore(id)
                res({data, message: "Se ha borrado exitosamente el ${lowerCaseName}"})
            } catch(e) {
                rej(e)
            }
        })
    }

    edit${name} = (new${name}) => {
        return new Promise(async (res, rej) => {
            try {
                const data = await edit${name}API(new${name}.id, new${name})
                await this._update${name}(data)
                res({data, message: "Se ha editado exitosamente el ${lowerCaseName}"})
            } catch(e) {
                rej(e)
            }
        })
    }

    render() {
        return (
            <Provider
                value={{
                    ...this.state,
                    create${name}: this.create${name},
                    delete${name}: this.delete${name},
                    edit${name}: this.edit${name},
                    get${name}s: this.get${name}s
                }}
            >
                {this.props.children}
            </Provider>
        )
    }
}

function with${name}(Component) {
    return function ${name}Consumer(props) {
        return (
            <Consumer>
                {({ ${lowerCaseName}Store, create${name}, get${name}s, delete${name}, edit${name} }) => (
                    <Component {...props}
                        ${lowerCaseName}Store={${lowerCaseName}Store}
                        create${name}={create${name}}
                        delete${name}={delete${name}}
                        edit${name}={edit${name}}
                        get${name}s={get${name}s}
                    />
                )}
            </Consumer>
        )
    }
}

export {
    ${name}Provider,
    Consumer as ${name}Consumer,
    with${name}
}
`
    );};
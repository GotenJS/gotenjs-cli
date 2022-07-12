module.exports = abmClassFile = (name) => {
    return (
        `import axios from 'axios'
import config from '../../config/config'

const resource${name}s = config.${name.toLowerCase()}s

export const get${name}sAPI = (queryParams) => {
    const { limit, offset, searchParams } = queryParams
    return new Promise((resolve, reject) => {
        axios.get(resource${name}s, {
            params: {
                limit,
                offset,
                ...searchParams
            }
        })
        .then((response) => resolve(response.data.data))
        .catch((err) => reject(err))
    })
}

export const create${name}API = (${name.toLowerCase()}) => {
    return new Promise((resolve, reject) => {
        axios.post(resource${name}s, ${name.toLowerCase()})
        .then((response) => resolve(response.data.data))
        .catch((err) => reject(err))
    })
}

export const delete${name}API = (id) => {
    return new Promise((resolve, reject) => {
        axios.delete(resource${name}s + '/' + id)
        .then((response) => resolve(response.data.data))
        .catch((err) => reject(err))
    })
}

export const edit${name}API = (id, ${name.toLowerCase()}Data) => {
    return new Promise((resolve, reject) => {
        axios.put(resource${name}s+'/'+id, ${name.toLowerCase()}Data)
        .then((response) => resolve(response.data.data))
        .catch((err) => reject(err))
    })
}
`
    );};
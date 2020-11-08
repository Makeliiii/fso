import axios from 'axios'

const get = url => {
    return axios.get(url)
}

const create = (url, obj) => {
    return axios.post(url, obj)
}

const dlt = (url, id) => {
    return axios.delete(url + id)
}

const put = (url, id, data) => {
    return axios.put(url + id, data)
}

export default {
    get: get,
    create: create,
    dlt: dlt,
    put: put
}
import axios from 'axios'

const NetworkConfigs = {}

NetworkConfigs.install = function (Vue, {address = {}, networkConfigs = {}} = {}) {
    Vue.prototype.$http = Vue.$http = new NetworkHandler(address, networkConfigs,)
}

export default NetworkConfigs

class NetworkHandler {
    constructor(address, networkConfigs) {
        this.address = address || {}
        this.serverConfigs = networkConfigs || {}
        axios.defaults.withCredentials = true
    }

    getAxios() {
        return axios
    }

    send(key, {params, urlFragment, query, headers}) {
        if (typeof (key) !== 'string') {
            console.log("you must input a key!")
            return false
        }

        let configure = this.address[key]

        if (typeof (configure) === 'undefined') {
            console.log("network hasn't configure!", key)
            return false
        }


        let newOption = {...this.serverConfigs}

        for (let keys in configure) {
            typeof (configure[keys]) !== 'undefined' && configure[keys] !== null && (newOption[keys] = configure[keys])
        }

        newOption.url && urlFragment && (newOption.url = newOption.url + urlFragment)

        headers && (newOption.headers = headers)

        return axios({
            ...newOption,
            params: query,
            data: {...params},
        })
    }

    sendFile(key, formData) {
        if (typeof (key) !== 'string') {
            console.log("you must input a key!")
            return false
        }

        let configure = this.address[key]

        if (typeof (configure) === 'undefined') {
            console.log("network hasn't configure!")
            return false
        }

        let url = configure.url

        return axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }


}

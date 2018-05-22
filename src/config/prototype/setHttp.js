import axios from 'axios'

const Axios = axios.create({
    // baseURL: 'http://47.94.153.68:7100',
    baseURL:'http://localhost:8090',
    timeout: 36000000,
})

export default {
    install(Vue) {
      Object.defineProperty(Vue.prototype, '$http', { value: Axios })
    }
  }
  
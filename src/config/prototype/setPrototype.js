import Vue from 'vue';
import SetHttp from './setHttp'
import setToast from './toast/toast.js'
import setAjax from './ajax.js'
import adaptive from './adaptive.js'

const setPrototype = () =>{
    Vue.use(SetHttp);
    setToast();
    setAjax();
    adaptive();
}

export default setPrototype;
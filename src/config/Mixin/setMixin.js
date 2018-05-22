import Vue from 'vue'
import Transitions from './transitions'
import Validator from './validator/index.js'
// import Input from './input'

const initMixin = () => {
    Vue.mixin(Transitions);
    Vue.mixin(Validator);
    // Vue.mixin(Input)
}

export default initMixin
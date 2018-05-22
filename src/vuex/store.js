import state from "./state";
import actions from "./action";
import mutations from "./mutation";
import Vue from 'vue';
import Vuex from "vuex";
Vue.use(Vuex);

 const store = new Vuex.Store({
    state,
    mutations,
    actions,
});
export default store;
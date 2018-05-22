import Vue from 'vue';
/**
 * 自己声明的公共组件
 */

// 引用 基础全局组件 
import Loading from '../../components/loading'
import Head from '../../components/head'
import Thead from '../../components/thead.vue'
import Scroll from '../../components/scroll.vue'
import Indexlist from '../../components/indexlist.vue' 




// 基础全局组件
const baseCompList = [
    Loading,
    Head,
    Scroll,
    Indexlist,
    Thead
]

// 引用业务关联度大的全局组件





// 业务关联度大的全局组件
const logicCompList = [
    
]

const registerOurCom = () => {
    // 按需引入全局
    const compList = [].concat(baseCompList, logicCompList)

    compList.forEach(com => {
        Vue.component(com.name, com);
    })

}

export default registerOurCom;


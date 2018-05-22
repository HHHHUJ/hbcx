import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Index from '@/view/index'
import Task from '@/view/task'
import Record from '@/view/record'
import Addrecord from '@/view/addrecord'
import Indexlist from '@/view/ilist'
import Slice from '@/view/slice'
const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    // savedPosition is only available for popstate navigations.
    return savedPosition
  } else {
    const position = {}
    // new navigation.
    // scroll to anchor by returning the selector
    // if (to.hash) {
    //   position.selector = to.hash
    // }
    // check if any matched route config has meta that requires scrolling to top
    if (to.matched.some(m => m.meta.scrollToTop)) {
      // cords will be used if no selector is provided,
      // or if the selector didn't match any element.
      position.x = 0
      position.y = 0
    }
    // if the returned position is falsy or an empty object,
    // will retain current scroll position.
    return position
  }
}
const router =  new Router({
  mode: 'history',
  base: __dirname,
  scrollBehavior,
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path:'/index',
      name:'index',
      component:Index,
      meta:{beforeEnter: true,}
    },
    {
      path:'/slice',
      name:'slice',
      component:Slice
    },
    {
      path:'/index/task',
      name:'task',
      component:Task,
      meta:{scrollToTop:true}
    },
    {
      path:'/index/task/record',
      name:'record',
      component:Record,
      meta:{Headtitle:'查看监视记录',scrollToTop:true}
    },
    {
      path:'/index/task/addrecord',
      name:'addrecord',
      component:Addrecord,
      meta:{Headtitle:'添加监视任务',scrollToTop:true}
    },{
      path:'/index/task/ilist',
      name:'ilist',
      component:Indexlist,
      meta:{Headtitle:'国内航班',scrollToTop:true}
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.beforeEnter)){  
    if (JSON.parse(window.localStorage.getItem('isCooPen'))) {  // 判断当前的token是否存在
      next();
    }
    else {
      next({
        path: '/slice',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }  
  }
  else {
      next();
  }
})
export default router;

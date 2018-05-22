import Vue from 'vue'
import Login from '@/view/login'

describe('login.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Login)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('button').textContent)
      .toEqual('登录')
  })
})

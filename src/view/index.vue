<template>
  <div class="index" ref="index">
     <div class="login_nav">
        <ul>
            <li @click="changeComponent('Login')" :class="{'ul_action':currentview==='Login'}">登录</li>
            <li @click="changeComponent('Register')" :class="{'ul_action':currentview==='Register'}">注册</li>
        </ul>
        <keep-alive><component :is="currentview"></component></keep-alive>
     </div>
  </div>
</template>

<script>
import Login from './login.vue'
import Register from './register.vue'
export default {
    data () {
        return {
            currentview:'Login',
        }
    },
    components: {
        Login,
        Register
    },
    methods:{
        changeComponent(val) {
            switch (val) {
                case 'Login':
                    this.currentview = val;
                    break;
                case 'Register':
                    this.currentview = val;
                    break;
            }
        }
    },
    mounted() {
        var wh = document.documentElement.clientHeight || document.body.clientHeight; //获取未弹出软键盘的窗口高度
        var index = this.$refs.index;//获取背景元素的dom
        window.onresize = function(){
            let nowh = document.documentElement.clientHeight || document.body.clientHeight;
            //获取软键盘弹起后的窗口高度
            if(wh>nowh){//判断原始创高高度大于现有高度，就重新计算高度
                index.style.height = wh + 'px'
            }
        }
    }
}
</script>

<style scoped>
    .index {
        min-height:100%;   /* vh视口高度被分成100份 */
        background:url(../assets/imgs/hb_bg.png) no-repeat center center;
        background-size: cover;
        zoom:1;
    }
    .login_nav {
        height:8.97rem;
        width:8.52rem;
        padding:0 0.62rem;
        background:rgba(255,255,255,.4);
        border-radius:10px;
        position:fixed;
        left:50%;
        margin-left:-4.26rem;
        top:20%;
    }
    ul {
        height:1.72rem;
        line-height: 1.72rem;
        width:100%;
        padding:0 0.70rem;
    }
    li {
        float:left;
        width:2.78rem;
        color:#fff;
        font-size:0.45rem;
        text-align: center;
    }
</style>
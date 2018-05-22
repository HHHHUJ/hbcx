<template>
  <div>
        <form action="">
            <p class="p1">
                <input type="text" placeholder="请输入手机号"  v-model="username" @blur="handleOnBlur('phone',username)">
            </p>
            <p class="p2">
                <input type="password" placeholder="请输入密码" v-model="password"  @blur="handleOnBlur('code',password)">
            </p>
            <p class="p3">
                <button type="button" @click="register">注册</button>
            </p>
        </form>
  </div>
</template>

<script>
import {Toast} from 'mint-ui'
export default {
    data(){
        return {
            username:'',
            password:''

        }
    },
    methods:{
        checkError() {
            if (!this.handleOnBlur('phone', this.username)) {
                return false;
            } else if (!this.handleOnBlur('code', this.password)) {
                return false;
            }
            return true;
        },
        register(){
            var data={
                "username":this.username,
                "password":this.password
            }
            if(this.checkError()) {
                this.$http.post('/register',{data:data})
                 .then(res=>{
                     Toast({
                         message:res.data,
                         position:'top'
                     })
                     setTimeout(()=>{
                         console.log(this.$router)
                         this.$router.push({name:'index'})
                     },500)
                 })
            }
        }
    }
}
</script>

<style scoped>
    div {
        width:100%;
    }
    form {
        height:6.50rem;
        width:100%;
    }
    button,input {
        border:none;
        outline: none;
        height:1.15rem;
        width:100%;
        line-height: 1.15rem;
        color:#edf4fe;
        font-size:0.35rem;
        color:#666;
    }
    input {
        background:rgba(255,255,255,.6);
        padding-left:0.56rem;
    }
    input::-webkit-input-placeholder {
        color:#999;
        font-size:0.35rem;
        
    }
    
    button {
        background:rgba(39,161,162,.5);
        font-size:0.35rem;
        color:#fff;
    }
    .p1 {
        margin-top:0.70rem;
    }
    .p2 {
        margin-top:0.64rem;
    }
    .p3 {
        margin-top:0.60rem;
    }
</style>

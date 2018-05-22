<template>
  <div>
        <form action="">
            <p class="p1">
                <input type="text" placeholder="请输入手机号" maxlength="11" v-model="username"  @blur="handleOnBlur('phone',username)" >
            </p>
            <p class="p2">
                <input type="password" placeholder="请输入密码" maxlength="8" v-model="password" @blur="handleOnBlur('code',password)">
            </p>
            <p class="p3">
                <button type="button" @click.passive ="login">登录</button>
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
            password:'',
            timer:null
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
       login(){
           if(this.checkError()){
            //    const data = {
            //        "username":this.username,
            //        "password":this.password
            //    }
            //    this.$http.post('/login',{data:data})
            //     .then(res=>{
            //         Toast({
            //             message:res.data,
            //             position:'top'
            //         })
            //         setTimeout(()=>{
            //             this.$router.push({name:'task'})
            //         },100)
            //     })
            this.$router.push({name:'task'})
           }
       }
    },
    mounted(){
        // window.addEventListener('resize', function() {
		// 	if(
		// 		document.activeElement.tagName === 'INPUT' ||
		// 		document.activeElement.tagName === 'TEXTAREA'
		// 	) {
		// 		window.setTimeout(function() {
		// 			if('scrollIntoView' in document.activeElement) {
		// 				document.activeElement.scrollIntoView();
		// 			} else {
		// 				document.activeElement.scrollIntoViewIfNeeded();
		// 			}
		// 		}, 0);
		// 	}
        // });
        console.log(window.desinWidth)
    }
   
}
</script>

<style scoped>
    div {
        width:100%;
    }
    form {
        height:6.5rem;
        width:100%;
    }
    button,input {
        border:none;
        outline: none;
        height:1.15rem;
        width:100%;
        line-height: 1.15rem;
        color:#666;
        font-size:0.35rem;
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

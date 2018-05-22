<template>
  <div class="head">
      <i @click="goback" class="loginOut"></i>
      <i @click="message" class="msg">
          <span v-show="islowprice"></span>
      </i>
      
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui';
export default {
    name:'Thead',
    data(){
        return {
            islowprice:false
        }
    },
    methods:{
        goback() {
            MessageBox.confirm('是否删除', '提示')
            .then(action=>{
                this.$router.push({name:'index'})
            })
            .cathc(action=>{

            })
        },
        message() {

        }
    }
}
</script>

<style scoped>
    .head {
        width:100%;
        background:url(../assets/imgs/hb_top.jpg) no-repeat center center;
        background-size:100% 1.62rem;
        height:1.62rem;
        position: fixed;
        top:0;
        left:0;
        line-height: 1.62rem;
        text-align: center;
        font-size:0.45rem;
        color:#fff;
        z-index:1000;
        box-shadow: 0 0 0.2rem rgba(0,0,0,.8)
    }
    i {
        position:absolute;
        display:inline-block;
        width:1.30rem;
        height:1.62rem;
    }
    .loginOut {
        top:0;
        left:0;
        background:url(../assets/imgs/login_out.png) no-repeat center center;
        background-size:70% 60%;
    }
    .msg {
        top:0;
        right:0;
        background:url(../assets/imgs/msg.png) no-repeat center center;
        background-size:70% 60%;
    }
    span{
        display:block;
        position: absolute;;
        top:23%;
        left:11%;
        background-color:red;
        border-radius:50%;
        width:12px;
        height:12px;

    }
</style>

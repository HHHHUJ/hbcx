<template>
  <div class="content" id="tasklist">
        <div  v-if="old_ctl.length===0" class="notcreate">历史任务列表为空！</div>
        <div v-else class="taskinfo" v-for="(item,i) in old_ctl" :key="i">
            <time class="tim">{{item.ddate}}</time>
            <div class="p2p">
                <section>
                    <span class="start">{{item.dcity}}</span>
                    <span class="time">出发地</span>
                </section>
                <section class="to">
                    <span class="end">{{item.acity}}</span>
                    <span class="time">目的地</span>
                </section>
            </div>
            <img src="../assets/imgs/airplane.png" class="airimg" />
            <div class="btn">
                <router-link :to="{name:''}" class="a1">查看</router-link>
                <router-link :to="{name:''}" class="a2">预测</router-link>
                <a href="javascript:;" @click="del(item.index,i)" class="a3">删除</a>
            </div>
        </div>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui';
export default {
     props:{
        oldlist:{
            type:Array,
            default:[]
        }
    },
    data () {
        return {
            old_ctl:this.oldlist,
            datas:[]
        }
    },
    methods:{
         del(int,Int){
            MessageBox.confirm('是否删除', '提示')
            .then(action=>{
                if(action==='confirm')
                {
                     this.old_ctl.splice(Int,1);
                    if(window.localStorage && window.localStorage.getItem('city')) {
                        var num = JSON.parse(localStorage.getItem('city'));
                        if(num.length>1) {
                            this.datas = num;
                            this.datas.splice(int,1);
                            localStorage.setItem('city', JSON.stringify(this.datas));
                        }else if(num.length===1){
                            localStorage.removeItem('city');
                        }else{
                            return;
                        }                             
                    }
                }
            })
            .catch(action=>{
                return;
                console.log(action)
            })
           
           
        }
    }
}
</script>

<style scoped>
    #tasklist {
        width: 100%;
        padding:0 0.30rem;
    }
    .notcreate {
        font-size:0.40rem;
        color:#666;
        text-align: center;
        margin-top:1.00rem;
    }
</style>

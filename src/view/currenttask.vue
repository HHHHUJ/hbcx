<template>
        <div id="currenttask">
            <div  v-if="ctl.length===0" class="notcreate">当前还没有创建任务！</div>
            <div v-else class="taskinfo" v-for="(item,i) in ctl" :key="i" >
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
                    <router-link :to="{name:'record', query: {dcity:item.dcity,acity: item.acity,ddate: item.ddate}}" class="a1">查看</router-link>
                    <router-link :to="{name:''}" class="a2">预测</router-link>
                    <a class="a3" @click="del(item.index,i)">删除</a>
                </div>
            </div>
        </div>
</template>

<script>
import { MessageBox } from 'mint-ui';
export default {
    props:{
        prelist:{
            type:Array,
            default:[]
        }
    },
    data () {
        return {
            ctl:this.prelist
        }
    },
    created(){
        
    },
    // mounted() {
    //     this.$socket.emit('connect'); 
    // },
    computed:{

    },
    methods:{
        del(int,Int){
            MessageBox.confirm('是否删除', '提示')
            .then(action=>{
                if(action==='confirm'){
                    this.ctl.splice(Int,1);
                    if(window.localStorage && window.localStorage.getItem('city')) {
                        var num = JSON.parse(localStorage.getItem('city'));
                        console.log(num)
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
    },
     sockets:{
        connect:function() {//与socket.io连接后回调
            console.log('socket connected');
        },
        dispatch:function(value) {
            this.$store.commit('changeMsg',value)
            console.log(value);//dispatch(后端向前端emit  dispatch的回调)
        }
    }
}
</script>

<style>
    #currenttask {
        width:100%;
        padding:0 0.30rem;
        background-color:#fff;
    }
    .notcreate {
        font-size:0.40rem;/*px*/
        color:#666;
        text-align: center;
        margin-top:1.00rem;
    }
   
</style>

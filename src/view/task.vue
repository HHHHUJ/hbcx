<template>
    <div>
        <Thead></Thead>
        <div id="taskchild"> 
                <Thead></Thead>
                <ul>
                    <li @click="switchcomponent('Currenttask')" :class="{'task_action':currentview==='Currenttask'}">当前任务</li>
                    <li @click="switchcomponent('Tasklist')" :class="{'task_action':currentview==='Tasklist'}">任务列表</li>
                </ul>
                <div class="marquee">
                    <marquee behavior="scroll" direction="left">今日最低价：{{lowprice}}</marquee>
                </div>
                <keep-alive><component :is="currentview" :prelist="pre_list" :oldlist="old_list"></component></keep-alive>
                <i ref="fixedI"><router-link :to="{name:'addrecord'}"></router-link></i>
        </div>
    </div>
</template>

<script>
import Currenttask from './currenttask.vue'
import Tasklist from './tasklist.vue'
import {mapState} from 'vuex'
export default {
    data () {
        return {
            currentview:'Currenttask',
            ctasklist:new Array(),
            pre_list:[],
            old_list:[],
            msg:''
        }
    },
    components:{
        Currenttask,
        Tasklist,
        
    },
    computed:{
        lowprice(){
            this.msg = window.localStorage.getItem('lowprice')
            return this.msg;
        }
    },
    methods :{
        switchcomponent (val) {
            switch(val) {
                case 'Currenttask':
                    this.currentview = val;
                    break;
                case 'Tasklist':
                    this.currentview = val;
                    break;
            }
        },
        
    },
    mounted() {
        var that = this;
        var i = that.$refs.fixedI;
        let ch = document.documentElement.clientHeight || document.body.clientHeight;//窗口高度
        window.onscroll = function(){
            let st = document.documentElement.scrollTop || document.body.scrollTop; //滚动高度
            if(st<=10){
                i.style.position = 'absolute'; //将定位改为absolute
            }else{
                i.style.position = 'fixed';//将定位改为fixed
            }
        }


        if(window.localStorage && window.localStorage.getItem('city')) {
            this.ctasklist = JSON.parse(localStorage.getItem("city"));
            var now = new Date().getTime();
            var newList = [];
            this.ctasklist.map((k,i)=>{
                this.$set(this.ctasklist[i],'index',i)//把索引存起来
                if(new Date(k.ddate).getTime()>=now){
                    this.pre_list.push(this.ctasklist[i])
                }else{
                        this.old_list.push(this.ctasklist[i])
                }
            })
            // console.log(newList)
            // localStorage.setItem('city', JSON.stringify(this.ctasklist)); 
        } 
    },
   
}
</script>

<style scoped>
    #taskchild {
        padding-top:1.62rem;
        width:100%;
    }
    .tasks {
        padding:0 0.30rem;
    }
    ul {
        position:sticky;
        position:-webkit-sticky;
        top:0rem;
        z-index:1002;
        background:#fff;
        height:1.47rem;
        width:100%;
        /* margin-bottom:0.85rem; */
        padding:0 1.10rem;
        display:flex;
        justify-content: space-between;
    }
    li {
        text-align: center;
        width:2.98rem;
        font-size:0.47rem;/*rem*/
        color:#01345f;
        padding-top:0.35rem;
    }
    i {
        display:inline-block;
        width:1.70rem;
        height:1.70rem;
        border-radius:50%;
        background:#fff url(../assets/imgs/add_btn.png) no-repeat center center;
        background-size:1.70rem 1.70rem;
        position: absolute;
        top:13.5rem;
        left:50%;
        margin-left:-0.85rem;
    }
    i>a {
        display: inline-block;
        width:100%;
        height:100%;
    }
    .marquee{
        width:100%;
        height:0.6rem;
        margin:0.2rem auto;
        background:rgba(0,0,0,.4);
        border-radius:0.3rem;
        overflow: hidden;
    }
    marquee{
        vertical-align: middle;
        color:#fff;
        font-size:0.4rem;
    }
</style>

<template>
  <div class="record" ref="record">
        <Head></Head>
        <loading :list="rlist" :loading="loading" :resultCode="resultCode"></loading>
        <scroll class="wraper" :data="rlist" :pullup="pullup">
            <div class="content recordlist" ref="recordlist" id="recordlist">
                <div class="rbox" v-for="(item,i) in rlist" :key="i">
                    <div class="com com1">
                        <span class="dt_from timer">{{item.dt_from.slice(11,16)}}</span>
                        <span class="from_place c">{{item.from_place}}</span>
                        <span class="air_company c">{{item.air_company+item.air_code}}</span>
                    </div>
                    <div class="com com2">
                        <span class="dt_to timer">{{item.dt_to.slice(11,16)}}</span>
                        <span class="to_place c">{{item.to_place}}</span>
                    </div>
                    <div class="com3">
                        <span class="price"><em>￥</em>{{item.price}}</span>
                        <span class="tax c">￥{{item.tax}}</span>
                    </div>
                    <img src="../assets/imgs/to_icon2.png" />
                </div>
            </div>
        </scroll>
        <!-- <div class="foo" v-if="rlist">已经到底了！！！</div> -->
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'record',
    data (){
        return {
            rlist:[],
            loading:true,
            resultCode:'',
            pullup: true,
            count:0
        }
    },
    methods:{
        loadData(){
            var datas = {'dcity':this.$route.query.dcity,
                     'acity':this.$route.query.acity,
                     'ddate':this.$route.query.ddate,
                    };

        //利用es7的await和async进行异步操作
            var that = this; 
            return (async function(){
                try {
                    let resp = null;
                    resp = await that.$http.get('/record',{params:datas})
                    console.log(resp)
                    that.rlist = resp.data[0].datas.concat(that.rlist);
                    console.log(that.rlist)
                    that.resultCode = resp.status;
                    that.loading = false;
                    // if(that.rlist.length<=5) {
                    //     that.$refs.record.style.height = 100+'vh';
                    //     that.$refs.record.style.background = '#38cbdb';
                        
                    // }else {
                    //     // that.$refs.recordlist.style.background = '#38cbdb';
                    //     document.getElementById('recordlist').style.background = '#38cbdb';
                    // }
                    
                } catch(err) {
                    that.resultCode = err;
                    that.loading = false;
                }
            })
       }
    },
    mounted() {        
        this.loadData()();
    }
}
</script>

<style scoped>   
    .record {
        width:100%;
        padding-top:1.62rem;
       
    }
    .wraper{
        height:calc(100vh - 1.62rem);
        background-color:#38cbdb; 
    }
    .recordlist {
        width: 100%;
        padding:0.6rem 0.23rem 0.90rem;  
        background-color:#38cbdb; 
    }
    .rbox {
        width:100%;
        height:2.72rem;
        background:#fefef6;
        border-radius:5px;
        padding:0.30rem 0.25rem 0rem;
        position: relative;
        margin-bottom:0.14rem;
    }
    .com {
        float: left;
    }
    .com1 {
        width:5.00rem;
    }
    .com3 {
        float:right;
    }
    span {
        display:block;
    }
    .timer {
        font-size:0.50rem;
        color:#303030;
    }
    .c {
        font-size:0.30rem;
        color:#969694;
        margin-top:0.15rem;
    }
    .price {
        font-size:0.48rem;
        color:#ff8204;
    }
    em {
        font-style:normal;
        font-size:0.30rem;
        color:#ff8204;
    }
    img {
        width:1.65rem;
        height:1.65rem;
        position:absolute;
        top:0.30rem;
        left:3.20rem;
    }
    .tax {
        text-align: right;
    }
    /* .time {
        background-color:#38cbdb;
        display:block;
        height:1.20rem;
        line-height: 1.20rem;
        text-align: center;
        font-size:0.50rem;
        color:#fff;
    } */
    /* .foo {
        background:#38cbdb;
        width:100%;
        height:0.50rem;
        line-height:0.50rem;
        text-align: center;
        font-size:0.40rem;
        color:#fff;
    } */
</style>

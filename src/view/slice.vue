<template>
     <scroll class="wraper" :data="imgList" :scrollX="scrollX" :snap="snap" :probeType="3" @getPageIndex="getPageIndex">
        <ul class="content" ref="content">
            <li v-for="(item,i) in imgList" :key="i" ref="li">
                <a href="javascript:;" :style="{backgroundImage:'url('+item.path+')'}">
                    <button @click="gotoIndex" class="btn" v-if="item.isShow">Start Now</button>
                </a>               
            </li>           
        </ul>
        <div class="dot">
            <i v-for="(item,index) in new Array(4)" :key="index" :class="{active:currentPage===index}"></i>
        </div>
     </scroll>
</template>

<script>
const snap = {
    loop:false, 
    threshold: 0.4, // 滚动距离超过宽度/高度的 30% 时切换图片
    speed: 500 // 切换动画时长 400ms
    }
export default {
    data(){
        return{
            scrollX:true,
            snap:snap,
            imgList:[
                {path:require('../assets/imgs/chun.jpeg'),alt:'春天',isShow:false},
                {path:require('../assets/imgs/xia.jpeg'),alt:'夏天',isShow:false},
                {path:require('../assets/imgs/qiu.jpeg'),alt:'秋天',isShow:false},
                {path:require('../assets/imgs/dong.jpeg'),alt:'冬天',isShow:true},
            ],
            currentPage:0
        }
    },
    mounted(){
        console.log(this.$route.query.redirect)
        
    },
    methods:{
        gotoIndex(){
            if(window.localStorage){
                window.localStorage.setItem('isCooPen','true')
            }
            this.$router.push({path:`${this.$route.query.redirect}`})
        },
        getPageIndex(val){
            console.log(val)
            this.currentPage = val;
        }
    }
}
</script>

<style scoped>
    .active{
        background:white;
        width:20px;
        border-radius:5px;
    }
    .wraper{
        overflow: hidden;
        height:100vh;
        width:100%;
        position: relative;
    }
    .content{
        overflow: hidden;
        width:calc(100vw * 4);
        position: relative;
        white-space: nowrap;
        height:100vh;
    }
    li{
        width:100vw;
        pointer-events: auto; /*定位元素在父元素上，可能导致父元素点击或触摸不了*/
        float:left;
        text-align: center;
        overflow: hidden;
        position: relative;
    }
    a{
        position:relative;
        display:inline-block;
        width:100%;
        height:100vh;
        background-size:cover;
        transform: translateZ(0);
    }
    .btn{
        display:block;
        position:fixed;
        bottom:12%;
        overflow: hidden;
        width:130px;
        padding:15px 0;
        border: 4px solid hsla(0,0%,100%,.7);
        border-radius:4px;
        color: hsla(0,0%,100%,.7);
        background:transparent;
        font-size:20px;
        left:50%;
        margin-left:-65px;
    }
    .dot{
        position: absolute;
        bottom:2%;
        right:0;
        left:0;
        transform: translateZ(1px);
        text-align: center;
        font-size:0;
    }
    i{
        display:inline-block;
        width:8px;
        height:8px;
        border-radius:50%;
        background:#ccc;
        margin:0 4px;
    }
</style>

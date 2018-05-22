<template>
<div>
    <Indexlist v-if="isShowIndex" :placetype='citytype'></Indexlist>
    <div class="addrecord" v-else>
        <Head></Head>
        <div class="add" ref="add">
            <div class="inp">
                <p :class="{'input_border':isChangeBorder}">
                    <span>出发地</span>
                    <input type="text" placeholder="请输入出发地" @click="openIndexList(0)" v-model="dcity" readonly>
                </p>
                <p>
                    <span>目的地</span>
                    <input type="text" placeholder="请输入目的地" v-model="acity" @click="openIndexList(1)" readonly>
                </p>
                <p>
                    <span>出发日期</span>
                    <input type="text" v-model="ddate" @click="openPicker" placeholder="点击选择日期" readonly>
                </p>
                <p>
                    <span>班次</span>
                    <input type="text" placeholder="选择班次">
                </p>
                <p>
                    <span>心理价位</span>
                    <input type="text" placeholder="选择心理价位">
                </p>
                <p style="position:relative;">
                    <span>监视间隔</span>
                    <label>{{date_space}}</label>
                    <em>小时</em>
                    <!-- <input type="text"  min="1" max="100" v-model="date_space" placeholder="默认单位（小时）"> -->
                    <mt-range
                    v-model="date_space"
                    :min="0"
                    :max="24"
                    :step="1"
                    :bar-height="7">
                    </mt-range>
                </p>
               
            </div>
            <button type="button" @click="startrecord" ref="btn">开始监视</button>            
        </div>
        <mt-datetime-picker
            ref="picker"
            type="date"
            year-format="{value} 年"
            month-format="{value} 月"
            date-format="{value} 日"
            @confirm="handleConfirm">
        </mt-datetime-picker>
    </div>
</div>

    
</template>

<script>
import eventBus from '../bus/eventBus.js'
import {mapState,mapActions} from 'vuex'
export default {
    name:'addrecord',
    data () {
        return {
            ddate:'',//出发日期
            date_space:0,//监视间隔
            datas:[],
            isChangeBorder:false,
            citytype:0
        }
    },
    computed:{
        ...mapState([
            'dcity',
            'acity',
            'isShowIndex'
        ])
    },
    created() {
        if(window.localStorage && window.localStorage.getItem('city')) {
            this.datas = JSON.parse(localStorage.getItem('city'))
        }

        // var that = this;
        // eventBus.$on('sendFromIndexList',function(val){
        //     that.acity = val;
        //     console.log(val)
        // })
        
    },
    mounted(){
        // var wh = document.documentElement.clientHeight || document.body.clientHeight;
        // var add = this.$refs.add;
        // window.onresize = function(){
        //     let nowh = document.documentElement.clientHeight || document.body.clientHeight;;
        //     if(wh>nowh){
        //         add.removeAttribute("height");
        //         add.setAttribute('min-height',wh)
        //     }else{
        //         add.removeAttribute("min-height");
        //         add.setAttribute('height',wh)
        //     }
        // }
        console.log(this.$route)
    },
    methods:{
        startrecord() {
            var Datas = {'dcity':this.dcity,
                        'acity':this.acity,
                        'ddate':this.ddate,
                        'date_space':this.date_space
                        }
            this.datas.push(Datas);
            if(window.localStorage) {
                // localStorage.removeItem('city');
                localStorage.setItem('city', JSON.stringify(this.datas));
            }
            var that = this;
            // this.$http.get('/pachong',{params:Datas})
            this.$socket.emit('start',Datas);//发起sockets请求
            var that = this;
            setTimeout(function(){
                that.goback();
            },1000)
            
        },
        goback() {
            if (this.$route.query.ilist === 1) {
                this.$router.push({name:'task'})
            } else {
                this.$router.back(-1)
            }
        },
        openPicker(){
            this.$refs.picker.open();//打开日期选择器
        },
        handleConfirm(value){
            
            this.ddate = this.date1String(value);
        },
        //如何将日期格式转换成字符串
        date1String(date,sign){
            sign = sign==undefined?'-':sign;
            return date.getFullYear()+sign+this.isDblNum(date.getMonth()+1)+sign+this.isDblNum(date.getDate());
        },

        //判断位数是不是一个个位数
        isDblNum(item){
            return item = item<10?'0'+item:item;
        },
        changeborder(){
            this.isChangeBorder = !this.isChangeBorder
        },
        openIndexList(value){
            // this.$router.push({name:'ilist',query:{value}})
            this.citytype = value;
            this.$store.commit('changeIndex')
        },
    }
}
</script>

<style scoped>
    .addrecord {
        width:100%;
    }
    .add {
        /* min-height:100%; */
        
        /* overflow-y:hidden; */
        height:100vh;
        padding-top:1.62rem;
        display:flex;
        flex-flow: column nowrap;
        justify-content: space-between;
    }
    .inp {
        width:100%;
        padding:0.52rem 0.44rem 0 0.60rem;
        /* transform:scale(1);
        min-height:calc(100vh - 162rem); */
    }
    p {
        height:1.33rem;
        width:100%;
        line-height: 1.33rem;
        margin-bottom:0.70rem;
        border-bottom:1px solid #787878;
    }
    span {
        font-size:0.42rem;
        color:#1197db;
        display:inline-block;
        width:2.20rem;
        text-align:left;
    }
    label{
        display:inline-block;
        color:#666;
        font-size:0.42rem;
        width:0.6rem;
    }
    em{
        font-size:0.42rem;
        color:#1197db;
        font-style: normal;
    }
    input {
        border:none;
        outline: none;
        display:inline-block;
        color:#666;
        font-size:0.42rem;
    }
    input::-webkit-input-placeholder {
        color:rgb(182, 180, 180);
        font-size:0.42rem;
    }
    .mt-range{
        position:absolute;
        top:50%;
        margin-top:-15px;
        left:4.13rem;
        width:5.6rem;
    }
    button {
        width:100%;
        height:1.48rem;
        border:none;
        outline: none;
        background:#0f5f91;
        color:#fff;
        font-size:0.44rem;
        /* position:fixed;
        bottom:0;
        left:0; */
    }
    .popUp{
         width: 100%;
        
    }
    .popUp .picker-slot-wrapper, .picker-item {
          backface-visibility: hidden;
    }
</style>

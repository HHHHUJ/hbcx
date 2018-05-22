<template>
  <div class="head">
      选择地点
  </div>
</template>

<script>
export default {
    name:'Ihead',
    methods:{
    }
}
</script>

<style scoped>
    .head {
        width:100%;
        background:url(../assets/imgs/record_top.png) no-repeat center center;
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

</style>

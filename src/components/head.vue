<template>
  <div class="head">
      <i @click="goback"></i>
      {{this.$route.meta.Headtitle}}
  </div>
</template>

<script>
export default {
    name:'Head',
    methods:{
        goback() {
           this.$router.back(-1)
        }
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
    i {
        position:absolute;
        top:0;
        left:0;
        background:url(../assets/imgs/icon.png) no-repeat center center;
        display:inline-block;
        width:1.30rem;
        height:1.62rem;
    }

</style>

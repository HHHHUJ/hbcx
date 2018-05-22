<template>
    <transition name='fade'>
    <div v-show='visible' class='toast' :class="position">
         <i>{{message}}</i>
    </div>
    </transition>
</template>

<script>
    export default {
        data() {
            return {
                visible: false,
                message : '',
                position : ''
            }
        }
    }
</script>


<style scoped>
.toast {
    position: fixed;
    left:50%;
    transform:translate(-50%,-50%) scale(1);
    word-wrap:break-word;
    padding:30px;
    text-align: center;
    z-index:999;
    font-size:30px;/*px*/
    max-width:80%;
    color: #fff;
    border-radius: 5px;
    background: rgba(0,0,0,0.7);
    overflow: hidden;
}
i {
    font-style:normal;
}
.toast.middle{
    top:50%;
}
.toast.top{
    top:10%;
}
.toast.bottom{
    top:90%;
}
.fade-enter-active, .fade-leave-active {
  /* transition: transform .5s */
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  /* transform:translate(-50%,-50%) scale(0); */
  opacity:0
}
</style>
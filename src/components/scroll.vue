<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
  name:'scroll',
  data() {
    return {
    }
  },
  props: {
     /**
       * 1 滚动的时候会派发scroll事件，会截流。
       * 2 滚动的时候实时派发scroll事件，不会截流。
       * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
       */
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    data: {
      tpye: Array,
      default: null
    },
    listenScroll: {
      type: Boolean,
      default: false
    },
    /**
       * 是否派发滚动到底部的事件，用于上拉加载
       */
    pullup: {
      type: Boolean,
      default: false
    },
    /**
       * 是否派发顶部下拉的事件，用于下拉刷新
       */
    pulldown: {
      type: Boolean,
      default: false
    },
    /** * 是否开启横向滚动 */ 
    scrollX: { 
      type: Boolean, 
      default: false 
    },
    snap:{
        type:Object,
        default:null
    },
    refreshDelay: {
      type: Number,
      default: 20
    }
  },
  mounted() {
    if (!this.$refs.wrapper) {
      return
    }
    setTimeout(() => {
      this._initScroll()
    }, 20)
  },
  methods: {
    _initScroll() {
      if (!this.$refs.wrapper) {
        return
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        scrollX:this.scrollX,
        snap:this.snap,
      })
      // 是否监听滚动事件
      if (this.listenScroll) {
        // 监听scroll的滚动事件,事件中的this指向的是创建的scroll对象，但是emit需要用vue实例发送。
        let that = this
        this.scroll.on('scroll', (pos) => {
          that.$emit('scroll', pos)
        })
      }
      // 是否设置了上拉加载
      if (this.pullup) {
        this.scroll.on('scrollEnd', () => {
          if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
            this.$emit('scrollToEnd')
          }
        })
      }
      //是否设置下拉刷新
      if (this.pulldown) {
          this.scroll.on('touchend', (pos) => {
            // 下拉动作
            if (pos.y > 50) {
              this.$emit('pulldown')
            }
          })
        }
      if(this.scrollX){
        let that = this;
          this.scroll.on('scrollEnd',()=>{
              var pageIndex = that.scroll.getCurrentPage().pageX;
              that.$emit('getPageIndex',pageIndex)
          })
      }
    },
    enable() {
      this.scroll && this.scroll.enable()
    },
    disable() {
      this.scroll && this.scroll.disable()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    scrollToElement(ele, time) {
      this.scroll && this.scroll.scrollToElement(ele, time)
    },
    scrollTo(x, y, time) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    stop() {
      this.scroll && this.scroll.stop()
    }
  },
  watch: {
    data() {
      // data刷新，就重新刷新scroll计算高度
      setTimeout(() => {
        this.refresh()
      }, this.refreshDelay)
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

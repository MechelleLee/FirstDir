<template>
  <div class="homepage">
    <div class="search">
      <span class="logo"></span>
      <input type="text" value="搜索目的地/景点/酒店等">
      <span class="mess"></span>
    </div>
    <Tablist :ex="ex" :locate="fixed" v-show="!show"></Tablist>
    <div class="homepage-content" ref="homepagecontent">
      <div>
        <Icons :ex="ex"></Icons>
        <div class="space"></div>
        <div ref="instead"></div>
        <div class="locate" ref="locate">
          <Tablist :ex="ex"></Tablist>
        </div>
        <List :list="list"></List>
      </div>
    </div>
  </div>
</template>

<script>
  import Icons from '../icons/Icons.vue'
  import Tablist from '../tablist/Tablist.vue'
  import List from '../list/List.vue'

  import IScroll from 'iscroll/build/iscroll-probe'

  export default {
    props: {
      ex: {
        type: Object
      },
      list: {
        type: Array
      }
    },
    data () {
      return {
        fixed: 0,
        show: true
      }
    },
    created () {
      this.$nextTick(() => {
        setTimeout(() => {
          this.iScroll()
        }, 500)
      })
    },
    methods: {
      iScroll () {
        if (!this.allScroll) {
          this.allScroll = new IScroll(this.$refs.homepagecontent, {
            click: true,
            probeType: 3
          })
          this.allScroll.on('scroll', () => {
            if (this.allScroll.y < -240) {
              this.$refs.locate.style = 'position: absolute;top: ' + (-this.allScroll.y - 11) + 'px;left: 0;right: 0;background: #fff;float: left;z-index: 200'
              this.$refs.instead.className = 'instead'
            } else {
              this.$refs.locate.style = ''
              this.$refs.instead.className = ''
            }
          })
        } else {
          this.allScroll.refresh()
        }
      }
    },
    components: {
      Icons,
      Tablist,
      List
    }
  }
</script>

<style lang="less" scoped>
  .homepage {
    position: fixed;
    top: 0;
    bottom: 70px;
    left: 0;
    right: 0;
    overflow: hidden;
    .search {
      position: fixed;
      top: 0;
      display: flex;
      width: 100%;
      background: white;
      height: 48px;
      z-index: 99;
      .logo {
        flex: 0 0 115px;
        background: url("../../commom/icon/logo.jpg") no-repeat 5px 6px;
        background-size: 105px 35px;
        display: inline-block;
        width: 115px;
        height: 100%;
      }
      input {
        flex: 1;
        width: auto;
        margin: 5px 0;
        padding-left: 10px;
        border: 1px solid gray;
        border-radius: 4px;
        font-size: 16px;
        font-family: "Microsoft YaHei UI";
        color: gray;
      }
      .mess {
        flex: 0 0 30px;
        background: url("../../commom/icon/mess.jpg") no-repeat;
        background-size: 30px 30px;
        margin: 10px;
      }
    }
    .homepage-content {
      /*margin: 48px 0 70px;*/
      position: absolute;
      top: 48px;
      bottom: 0;
      width: 100%;
      /*height: 100%;*/
      z-index: -1;
      /*background: green;*/
      overflow: hidden;
      .space {
        width: 100%;
        height: 10px;
        background: #eeeeee;
      }
      .instead{
        width: 100%;
        height: 50px;
      }
    }
  }
</style>

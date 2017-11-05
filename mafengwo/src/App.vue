<template>
  <div id="app">
    <div class="menu-list">
      <router-link class="menu" to="/homepage">首页<img src="./commom/icon/homepage.jpg" class="homepage"/>
      </router-link>
      <router-link class="menu" to="/destination">目的地<img src="./commom/icon/destination.jpg" class="destination"/>
      </router-link>
      <router-link class="menu" to="/hotel">酒店<img src="./commom/icon/hotel.jpg" class="hotel"/></router-link>
      <router-link class="menu" to="/travelmall">旅行商城<img src="./commom/icon/travelmall.jpg" class="travelmall"/>
      </router-link>
      <router-link class="menu" to="/mine">我的<img src="./commom/icon/mine.jpg" class="mine"/></router-link>
    </div>
    <router-view :ex="ex" :list="list"></router-view>
  </div>
</template>

<script>
  import IScroll from 'iscroll/build/iscroll-probe'

  export default {
    name: 'app',
    data () {
      return {
        ex: {},
        list: [],
        abc: []
      }
    },
    created () {
      let self = this
      this.$axios.get('/api/ex')
        .then((res) => {
          res = res.data
          if (res.error === 0) {
            self.ex = res.data
          }
        })
        .catch((error) => {
          alert(error)
        })
      setTimeout(() => {
        this.$axios.get('/api/list')
          .then((res) => {
            res = res.data
            if (res.error === 0) {
              self.list = res.data
            }
          })
          .catch((error) => {
            alert(error)
          })
      })
    },
    methods: {
      scrollTest () {
        if (!this.testScroll) {
          console.log(this.$refs.title)
          this.testScroll = new IScroll(this.$refs.title, {
            click: true
          })
        } else {
          this.testScroll.refresh()
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .title {
    height: 300px;
    overflow: hidden;
  }

  .menu-list {
    display: flex;
    position: fixed;
    bottom: 5px;
    left: 0;
    right: 0;
    width: 100%;
    font-size: 16px;
    font-family: "Microsoft YaHei UI";
    color: gray;
    .menu {
      flex: 1;
      text-align: center;
      &.active {
        color: black;
      }
    }
    img {
      position: absolute;
      bottom: 18px;
    }
    .homepage {
      left: 11px;
    }
    .destination {
      left: 83px;
    }
    .hotel {
      left: 160px;
    }
    .travelmall {
      left: 235px;
    }
    .mine {
      left: 315px;
    }
  }
</style>

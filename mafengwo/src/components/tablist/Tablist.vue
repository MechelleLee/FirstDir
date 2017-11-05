<template>
  <div class="tab-list" ref="tablist">
    <ul>
      <li class="tabs" v-for="(item,index) in ex.tab_list" @click="getIndex(index)">
        <span :class="{'active':i == index}">{{item.name}}<img v-if="item.badge" :src="item.badge.image"><p
          :class="{'active':i == index}"></p></span>
      </li>
    </ul>
  </div>
</template>

<script>
  import IScroll from 'iscroll/build/iscroll-probe'

  export default {
    props: {
      ex: {
        type: Object
      }
    },
    data () {
      return {
        i: 0
      }
    },
    created () {
      this.$nextTick(() => {
        this.tabScroll()
      })
    },
    methods: {
      tabScroll () {
        if (!this.listScroll) {
          this.listScroll = new IScroll(this.$refs.tablist, {
            click: true,
            scrollX: true,
            bounce: false
          })
        } else {
          this.listScroll.refresh()
        }
      },
      getIndex (index) {
        this.i = index
        console.log(this.i)
      }
    }
  }
</script>

<style lang="less" scoped>
  .tab-list {
    width: 100%;
    background: #fff;
    z-index: 100;
    ul {
      height: 50px;
      width: 500px;
      .tabs {
        position: relative;
        float: left;
        width: 100px;
        height: 50px;
        /*background: gray;*/
        .active {
          font-weight: 700;
        }
        span {
          display: inline-block;
          width: 100%;
          height: 100%;
          text-align: center;
          line-height: 50px;
          font-size: 20px;
          font-family: "Microsoft YaHei UI";
          color: #1d1d1d;
          p {
            &.active {
              position: absolute;
              width: 50px;
              height: 10px;
              left: 25px;
              bottom: 5px;
              border-bottom: 3px solid #ffd11f;
              border-radius: 50%;
            }
          }
        }
        img {
          position: absolute;
          width: 42px;
          right: 0;
        }
      }
    }
  }
</style>

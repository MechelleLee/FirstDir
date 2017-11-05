<template>
  <div class="icon-list">
    <ul>
      <li v-for="(item,index) in ex.icons">
        <router-link :to="'/'+item.jump_url.substring(item.jump_url.indexOf('=')+1)">
          <div class="icons" ref="icons" @touchstart="activeClass(index)">
            <span class="icon"><img :src="item.icon"></span><span class="title">{{item.title}}</span>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      ex: {
        type: Object
      }
    },
    data () {
      return {}
    },
    methods: {
      activeClass (index) {
//        this.$refs.icons[index].className += ' active'
      }
    }
  }
</script>

<style lang="less" scoped>
  .icon-list {
    width: 100%;
    margin: 10px 0 20px;
    li {
      display: inline-block;
      width: 25%;
    }
    .icons {
      display: inline-block;
      &.active{
        background: rgba(177, 177, 177, 0.59);
      }
      .icon {
        padding: 20px 20px 5px 20px;
        display: block;
        width: 60%;
        img {
          width: 100%;
        }
      }
      .title {
        display: block;
        text-align: center;
        font-size: 18px;
        font-family: "Microsoft YaHei UI";
        color: #474747;
      }
    }
  }
</style>

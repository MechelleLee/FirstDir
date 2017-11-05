<template>
  <div class="list" ref="list">
    <ul>
      <li v-for="(item,index) in list" ref="count">
        <div class="topic" v-if="item.style == 'topic'"  @touchend="startSlide(index)" @touchmove="GET_OFFSET($event)">
          <span class="title">{{item.data.title}}</span><img class="icon" v-if="item.data.badge" :src="item.data.badge.image"><span class="more">查看更多<img class="moreicon" src="../../commom/icon/more.png"/></span>
          <div class="img-list" ref="imglist">
            <ul ref="ul">
              <li v-for="img in item.data.list">
                <div class="imgs">
                  <img class="image" :src="img.image"><span class="title">{{img.title}}</span>
                  <div class="bottom">
                    <img class="logo" :src="img.bottom.user.logo"><span class="user">{{img.bottom.user.name}}</span>
                    <div class="attach">
                      <span class="text" v-for="(text,index) in img.bottom.attach"
                            :class="{'border':index == 2}">{{text.text}}</span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="image-text" v-if="item.style == 'image_text'">
          <div class="left">
            <p class="title">{{item.data.title}}</p>
            <span class="content">{{item.data.content}}</span>
            <div class="user" v-if="item.data.bottom.tag_list[0].text == '游记'">
              <img :src="item.data.bottom.user.logo"><span class="name">{{item.data.bottom.user.name}}</span>
            </div>
          </div>
          <div class="right">
            <img :src="item.data.image">
          </div>
          <div class="bottom">
            <span class="tag-list" v-for="tag in item.data.bottom.tag_list"
                  :class="{'gonglue':tag.text == '攻略','wenda':tag.text == '问答','youji':tag.text == '游记','guanggao':tag.text == '广告','lvxing':tag.text == '旅行家专栏'}">
            {{tag.text}}</span>
            <div class="attach-list">
              <span class="attach" v-for="(counts,index) in item.data.bottom.attach"
                    :class="{'border':index == 2}">{{counts.text}}</span>
            </div>
          </div>
        </div>
        <div class="article" v-if="item.style == 'article'">
          <div class="image">
            <img :src="item.data.image">
            <p class="title">{{item.data.title}}</p>
            <span class="tag-list" v-for="cont in item.data.bottom.tag_list">{{cont.text}}</span>
          </div>
        </div>
        <div class="three-image" v-if="item.style == 'three_image'">
          <p class="title">{{item.data.title}}</p>
          <div class="img-box">
            <div class="left">
              <img :src="item.data.left_image.image">
            </div>
            <div class="right">
              <img class="top" :src="item.data.right_image_1.image">
              <img class="botom" :src="item.data.right_image_1.image">
            </div>
          </div>
          <div class="bottom">
            <span class="tag_list" v-for="tag in item.data.bottom.tag_list">{{tag.text}}</span>
            <div class="attach">
              <span v-for="(counts,index) in item.data.bottom.attach"
                    :class="{'border':index == 0}">{{counts.text}}</span>
            </div>
          </div>
        </div>
        <div class="mdd" v-if="item.style == 'mdd'">
          <p class="title">{{item.data.title}}</p>
          <div class="img-list" ref="imagelist">
            <ul>
              <li v-for="imgs in item.data.list">
                <div class="imgs">
                  <img :src="imgs.image"><span class="title">{{imgs.title}}</span><span class="html"
                                                                                        v-html="imgs.sub_title"></span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="video" v-if="item.style == 'video'">
          <div class="title">{{item.data.title}}</div>
          <div class="video-box">
            <img class="thumbnail" :src="item.data.video.thumbnail.simg"><i class="icon-play2"></i><span class="duration">{{(item.data.video.duration/60 >= 10 ? parseInt(item.data.video.duration/60) : '0' + parseInt(item.data.video.duration/60)) + ':' + (item.data.video.duration%60 >= 10 ? item.data.video.duration%60 : '0' + item.data.video.duration%60)}}</span>
          </div>
          <div class="bottom">
            <div class="user">
              <img class="logo" :src="item.data.bottom.user.logo"><span class="name">{{item.data.bottom.user.name}}</span>
            </div>
            <div class="attach">
              <span class="counts" v-for="(count,index) in item.data.bottom.attach" :class="{'border':index==2}">{{count.text}}</span>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import IScroll from 'iscroll/build/iscroll-probe'
  import {mapMutations} from 'vuex'

  export default {
    props: {
      list: {
        type: Array
      }
    },
    data () {
      return {}
    },
    created () {
      this.$nextTick(() => {
        document.addEventListener('touchmove', this.mddScroll, {passive: true})
        setTimeout(() => {
//          console.log(this.$refs.ul)
          this.SET_INDEX(this.$refs.ul)
        }, 1000)
      })
    },
    methods: {
      ...mapMutations(['GET_OFFSET', 'LIST_TRANSLATE', 'SET_INDEX']),
      mddScroll () {
        if (!this.mdScroll) {
          for (let i = 0; i < this.$refs.imagelist.length; i++) {
            this.mdScroll = new IScroll(this.$refs.imagelist[i], {
              click: true,
              scrollX: true
            })
          }
        } else {
          this.mdScroll.refresh()
        }
      },
      startSlide (index) {
        var thisUl = this.$refs.count[index].firstChild.lastChild.firstChild
        this.LIST_TRANSLATE(thisUl)
      }
    }
  }
</script>

<style lang="less" scoped>
  .list {
    .topic {
      font-family: "Microsoft YaHei UI";
      .title {
        font-size: 21px;
        height: 36px;
        line-height: 36px;
        margin-left: 20px;
      }
      .more {
        position: relative;
        right: 10px;
        height: 36px;
        line-height: 36px;
        margin-right: 20px;
        float: right;
        .moreicon{
          position: absolute;
          height: 26px;
          padding: 5px 0;
        }
      }
      .icon {
        width: 21px;
        height: 22px;
        vertical-align: -20%;
      }
      .img-list {
        width: 100%;
        border-bottom: 1px solid #cfcfcf;
        overflow: hidden;
        ul {
          padding: 10px;
          width: 900%;
          li {
            float: left;
            width: 10.2%;
            .imgs {
              padding: 10px 0 10px 10px;
              .title {
                display: inline-block;
                margin: 10px 0 0;
                font-size: 20px;
                font-weight: 600;
                height: 40px;
                line-height: 20px;
                text-align: left;
                color: #474747;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
              }
              .image {
                width: 100%;
              }
              .bottom {
                margin: 30px 0 0;
                .logo {
                  height: 24px;
                  border-radius: 50%;
                  vertical-align: top;
                  margin-right: 5px;
                }
                .user {
                  font-size: 14px;
                  height: 24px;
                  line-height: 24px;
                }
                .attach {
                  display: inline-block;
                  float: right;
                  .text {
                    font-size: 14px;
                    position: relative;
                    height: 24px;
                    line-height: 24px;
                    &.border {
                      display: inline-block;
                      width: 30px;
                      border-bottom: 2px solid #ffdb26;
                      border-radius: 15px;
                      text-align: center;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    .image-text {
      position: relative;
      padding: 5px;
      margin: 5px;
      border-bottom: 1px solid #cfcfcf;
      .left, .right {
        display: inline-block;
        width: 50%;
        /*float: left;*/
      }
      .left {
        float: left;
        .title {
          margin: 5px 10px;
          font-size: 19px;
          line-height: 24px;
          font-weight: 600;
          color: #2e2e2e;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
        .content {
          display: inline-block;
          margin: 5px 5px 5px 10px;
          line-height: 18px;
          color: #474747;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;

        }
        .user {
          height: 30px;
          margin-left: 10px;
          img {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            vertical-align: top;
            margin-right: 5px;
          }
          .name {
            font-size: 14px;
            line-height: 24px;
          }
        }
      }
      .right {
        img {
          width: 100%;
        }
      }
      .bottom {
        height: 30px;
        .tag-list {
          display: inline-block;
          margin-left: 10px;
          font-size: 10px;
          padding: 5px;
          border-radius: 5px;
          &.gonglue {
            color: #f63c3c;
            border: 1px solid #f63c3c;
            background: #ffffff;
          }
          &.wenda {
            color: #30d2bf;
            border: 1px solid #30d2bf;
            background: #ffffff;
          }
          &.youji {
            color: #edc214;
            border: 1px solid #edc214;
            background: #ffffff;
          }
          &.guanggao {
            color: #9fb622;
            border: 1px solid #9fb622;
            background: #ffffff;
          }
          &.lvxing {
            color: #a8bd38;
            border: 1px solid #a8bd38;
            background: #ffffff;
          }
        }
        .attach-list {
          float: right;
          .attach {
            display: inline-block;
            margin: 0 3px;
            height: 25px;
            line-height: 25px;
            font-size: 14px;
            &.border {
              border-bottom: 2px solid #ffdb26;
              border-radius: 30%;
            }
          }
        }
      }
    }
    .article {
      margin: 10px;
      padding: 0 10px;
      border-bottom: 1px solid #cfcfcf;
      padding-bottom: 10px;
      .image {
        width: 100%;
        img {
          width: 100%;
        }
        .title {
          margin: 5px 0;
          font-size: 19px;
          line-height: 24px;
          font-weight: 600;
          color: #2e2e2e;
        }
        .tag-list {
          display: inline-block;
          font-size: 10px;
          padding: 5px;
          border-radius: 5px;
          color: #9fb622;
          border: 1px solid #9fb622;
          background: #ffffff;
        }
      }
    }
    .three-image {
      margin: 10px;
      border-bottom: 1px solid #cfcfcf;
      padding-bottom: 10px;
      .title {
        margin: 5px 10px;
        font-size: 19px;
        line-height: 24px;
        font-weight: 600;
        color: #2e2e2e;
      }
      .img-box {
        margin: 10px;
        .left, .right {
          display: inline-block;
        }
        .left {
          width: 72.7%;
          img {
            width: 100%;
          }
        }
        .right {
          float: right;
          width: 27.3%;
          img {
            width: 100%;
          }
        }
      }
      .bottom {
        height: 30px;
        .tag_list {
          margin-left: 10px;
          font-size: 10px;
          padding: 5px;
          border-radius: 5px;
          color: #f05573;
          border: 1px solid #f05573;
          background: #ffffff;
        }
        .attach {
          float: right;
          margin-right: 10px;
          span {
            display: inline-block;
            margin: 0 3px;
            height: 25px;
            line-height: 25px;
            font-size: 14px;
            &.border {
              border-radius: 30%;
              border-bottom: 2px solid #ffdb26;
            }
          }
        }
      }
    }
    .mdd {
      margin: 10px;
      padding-bottom: 10px;
      border-bottom: 1px solid #cfcfcf;
      .title {
        font-size: 22px;
        padding: 10px;
      }
      .img-list {
        width: 100%;
        overflow: hidden;
        ul {
          width: 320%;
          padding: 10px;
          li {
            width: 9.1%;
            float: left;
            margin-right: 10px;
            .imgs {
              width: 100%;
              padding-bottom: 10px;
              img {
                width: 100%;
              }
              .title {
                display: inline-block;
                padding: 5px 0;
                font-size: 17px;
                font-weight: 600;
              }
              .html {
                display: block;
                font-size: 14px;
              }
            }
          }
        }
      }
    }
    .video{
      margin: 10px;
      width: 100%;
      .title{
        display: inline-block;
        padding: 10px;
        font-size: 19px;
        font-weight: 600;
        color: #2e2e2e;
      }
      .video-box{
        position: relative;
        padding: 10px;
        display: inline-block;
        width: 100%;
        .thumbnail{
          width: 90%;
        }
        .icon-play2{
          position: absolute;
          bottom: 43%;
          right: 50%;
          font-size: 40px;
          color: rgba(255, 255, 255, 0.61);
          text-shadow: #b3b3b3 0px 2px 5px;
        }
        .duration{
          position: absolute;
          bottom: 20px;
          right: 60px;
          display: inline-block;
          padding: 3px 8px;
          color: white;
          font-size: 16px;
          border-radius: 11px;
          background: rgba(0, 0, 0, 0.72);
        }
      }
      .bottom{
        margin-left: 10px;
        .user{
          display: inline-block;
          .logo{
            width: 24px;
            height: 24px;
            border-radius: 50%;
            vertical-align: top;
            margin-right: 5px;
          }
          .name{
            font-size: 14px;
            line-height: 24px;
          }
        }
        .attach{
          display: inline-block;
          float: right;
          margin-right: 20px;
          .counts{
            display: inline-block;
            margin: 0 3px;
            height: 25px;
            line-height: 25px;
            font-size: 14px;
            &.border{
              border-bottom: 2px solid #ffdb26;
              border-radius: 30%
            }
          }
        }
      }
    }
  }
</style>

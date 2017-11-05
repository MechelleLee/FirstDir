<template>
  <transition name="fade">
    <div class="raiders">
      <div class="head">
        <span class="back" @click="back"><img src="../../commom/icon/back.png"/></span>
        <span class="header">找攻略</span>
        <span class="search"><img src="../../commom/icon/search.png"/></span>
      </div>
      <div class="bottom" ref="bottom">
        <ul>
          <li v-for="(item,index) in ex.groups" @click="jump(index)">
            <span class="area" :class="{'active':i==index}" @click="animate(index)">{{item}}</span>
            <transition name="opac">
              <span :class="{'border':i==index}" v-if="show"></span>
            </transition>
          </li>
        </ul>
      </div>
      <div class="content-wrapper">
        <ul>
          <li v-for="lists in dataArr">
            <div class="content" ref="content" v-if="lists.data.ex.group == '推荐'">
              <ul>
                <li v-for="item in lists.data.list">
                  <div class="guide-list" v-if="item.style == 'guide_list'">
                    <span class="title">{{item.data.title}}</span>
                    <div class="list" ref="list">
                      <ul :style="'width:'+item.data.list.length*115+'px'">
                        <li v-for="thumb in item.data.list">
                          <div class="img-box">
                            <img class="img" :src="thumb.thumbnail"/>
                            <span class="area-title">{{thumb.title}}</span>
                            <span class="desc">{{thumb.desc}}</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="article-list" ref="articlelist"
                       v-if="item.style == 'guide_article_list'&&item.data.title != '旅行家专栏'">
                    <ul :style="'width:'+item.data.list.length*230+'px'">
                      <li v-for="list in item.data.list">
                        <div class="img-box">
                          <div class="img-title"><span class="front"></span><span
                            class="guide-num">{{list.guide_num}}</span><span
                            class="tag">{{list.tag_list[0] + '·' + list.tag_list[1]}}</span><span class="tail"></span>
                          </div>
                          <img class="img" :src="list.thumbnail"/>
                          <span class="sec-title">{{list.title}}</span>
                          <span class="location">{{list.mdd.name}}</span><span class="view">{{list.num_visit}}</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="expert" v-if="item.data.title == '旅行家专栏'">
                    <div class="main-title">
                      <span class="list-title">{{item.data.title}}</span><span
                      class="sub-title">{{item.data.sub_title}}</span>
                    </div>
                    <div class="content-list" ref="contentlist">
                      <ul :style="'width:'+item.data.list.length*230+'px'">
                        <li v-for="list in item.data.list">
                          <div class="img-box">
                            <img class="img" :src="list.thumbnail"/>
                            <span class="title">{{list.title}}</span>
                            <span class="location">{{list.mdd.name}}</span><span class="view">{{list.num_visit}}</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="content" ref="content" v-if="lists.data.ex.group == '主题'">
              <ul>
                <li v-for="item in lists.data.list">
                  <div class="article-list" v-if="item.style == 'guide_article_list'">
                    <span class="title">{{item.data.title}}</span>
                    <div ref="articlelist">
                      <ul :style="'width:'+item.data.list.length*230+'px'">
                        <li v-for="list in item.data.list">
                          <div class="img-box">
                            <div class="img-title" v-if="list.tag_list"><span class="front"></span><span
                              class="guide-num">{{list.guide_num}}</span><span
                              class="tag">{{list.tag_list[0] + '·' + list.tag_list[1]}}</span><span class="tail"></span>
                            </div>
                            <img class="img" :src="list.thumbnail"/>
                            <span class="sec-title">{{list.title}}</span>
                            <span class="location">{{list.mdd.name}}</span><span class="view">{{list.num_visit}}</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="guide-list" v-if="item.style == 'guide_list'">
                    <span class="title">{{item.data.title}}</span>
                    <div class="list" ref="list">
                      <ul :style="'width:'+item.data.list.length*115+'px'">
                        <li v-for="thumb in item.data.list">
                          <div class="img-box">
                            <img class="img" :src="thumb.thumbnail"/>
                            <span class="area-title">{{thumb.title}}</span>
                            <span class="desc">{{thumb.desc}}</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="content" ref="content" v-if="lists.data.ex.group == '中国'">
              <ul>
                <li v-for="item in lists.data.list">
                  <div class="guide-list" v-if="item.style == 'guide_list'">
                    <span class="title">{{item.data.title}}</span>
                    <div class="list" ref="list">
                      <ul :style="'width:'+item.data.list.length*115+'px'">
                        <li v-for="thumb in item.data.list">
                          <div class="img-box">
                            <img class="img" :src="thumb.thumbnail"/>
                            <span class="area-title">{{thumb.title}}</span>
                            <span class="desc">{{thumb.desc}}</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="article-list" ref="articlelist" v-if="item.style == 'guide_article_list'">
                    <ul :style="'width:'+item.data.list.length*230+'px'">
                      <li v-for="list in item.data.list">
                        <div class="img-box">
                          <div class="img-title" v-if="list.tag_list"><span class="front"></span><span
                            class="guide-num">{{list.guide_num}}</span><span
                            class="tag">{{list.tag_list[0] + '·' + list.tag_list[1]}}</span><span class="tail"></span>
                          </div>
                          <img class="img" :src="list.thumbnail"/>
                          <span class="sec-title">{{list.title}}</span>
                          <span class="location">{{list.mdd.name}}</span><span class="view">{{list.num_visit}}</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="guide_entrance" v-if="item.style == 'guide_entrance'">
                    <span class="title">{{item.data.title}}</span>
                    <div class="wrapper">
                      <ul>
                        <li v-for="list in item.data.list">
                          <div class="img-box">
                            <img :src="list.thumbnail">
                            <div class="img-title">
                              <span class="area">{{list.title}}</span>
                              <span class="desc">{{list.desc}}</span>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="content" ref="content" v-if="lists.data.ex.group == '亚洲'">
              <ul>
                <li v-for="item in lists.data.list">
                  <div class="guide-list" v-if="item.style == 'guide_list'">
                    <span class="title">{{item.data.title}}</span>
                    <div class="list" ref="list">
                      <ul :style="'width:'+item.data.list.length*115+'px'">
                        <li v-for="thumb in item.data.list">
                          <div class="img-box">
                            <img class="img" :src="thumb.thumbnail"/>
                            <span class="area-title">{{thumb.title}}</span>
                            <span class="desc">{{thumb.desc}}</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="article-list" ref="articlelist" v-if="item.style == 'guide_article_list'">
                    <ul :style="'width:'+item.data.list.length*230+'px'">
                      <li v-for="list in item.data.list">
                        <div class="img-box">
                          <div class="img-title" v-if="list.tag_list"><span class="front"></span><span
                            class="guide-num">{{list.guide_num}}</span><span
                            class="tag">{{list.tag_list[0] + '·' + list.tag_list[1]}}</span><span class="tail"></span>
                          </div>
                          <img class="img" :src="list.thumbnail"/>
                          <span class="sec-title">{{list.title}}</span>
                          <span class="location">{{list.mdd.name}}</span><span class="view">{{list.num_visit}}</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="guide_entrance" v-if="item.style == 'guide_entrance'">
                    <span class="title">{{item.data.title}}</span>
                    <div class="wrapper">
                      <ul>
                        <li v-for="list in item.data.list">
                          <div class="img-box">
                            <img :src="list.thumbnail">
                            <div class="img-title">
                              <span class="area">{{list.title}}</span>
                              <span class="desc">{{list.desc}}</span>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="content" ref="content" v-if="lists.data.ex.group == '欧洲'">
              <ul>
                <li v-for="item in lists.data.list">
                  <div class="guide-list" v-if="item.style == 'guide_list'">
                    <span class="title">{{item.data.title}}</span>
                    <div class="list" ref="list">
                      <ul :style="'width:'+item.data.list.length*115+'px'">
                        <li v-for="thumb in item.data.list">
                          <div class="img-box">
                            <img class="img" :src="thumb.thumbnail"/>
                            <span class="area-title">{{thumb.title}}</span>
                            <span class="desc">{{thumb.desc}}</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="article-list" ref="articlelist" v-if="item.style == 'guide_article_list'">
                    <ul :style="'width:'+item.data.list.length*230+'px'">
                      <li v-for="list in item.data.list">
                        <div class="img-box">
                          <div class="img-title" v-if="list.tag_list"><span class="front"></span><span
                            class="guide-num">{{list.guide_num}}</span><span
                            class="tag">{{list.tag_list[0] + '·' + list.tag_list[1]}}</span><span class="tail"></span>
                          </div>
                          <img class="img" :src="list.thumbnail"/>
                          <span class="sec-title">{{list.title}}</span>
                          <span class="location">{{list.mdd.name}}</span><span class="view">{{list.num_visit}}</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="guide_entrance" v-if="item.style == 'guide_entrance'">
                    <span class="title">{{item.data.title}}</span>
                    <div class="wrapper">
                      <ul>
                        <li v-for="list in item.data.list">
                          <div class="img-box">
                            <img :src="list.thumbnail">
                            <div class="img-title">
                              <span class="area">{{list.title}}</span>
                              <span class="desc">{{list.desc}}</span>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="content" ref="content" v-if="lists.data.ex.group == '北美洲'">
              <ul>
                <li v-for="item in lists.data.list">
                  <div class="guide-list" v-if="item.style == 'guide_list'">
                    <span class="title">{{item.data.title}}</span>
                    <div class="list" ref="list">
                      <ul :style="'width:'+item.data.list.length*115+'px'">
                        <li v-for="thumb in item.data.list">
                          <div class="img-box">
                            <img class="img" :src="thumb.thumbnail"/>
                            <span class="area-title">{{thumb.title}}</span>
                            <span class="desc">{{thumb.desc}}</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="article-list" ref="articlelist" v-if="item.style == 'guide_article_list'">
                    <ul :style="'width:'+item.data.list.length*230+'px'">
                      <li v-for="list in item.data.list">
                        <div class="img-box">
                          <div class="img-title" v-if="list.tag_list"><span class="front"></span><span
                            class="guide-num">{{list.guide_num}}</span><span
                            class="tag">{{list.tag_list[0] + '·' + list.tag_list[1]}}</span><span class="tail"></span>
                          </div>
                          <img class="img" :src="list.thumbnail"/>
                          <span class="sec-title">{{list.title}}</span>
                          <span class="location">{{list.mdd.name}}</span><span class="view">{{list.num_visit}}</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="guide_entrance" v-if="item.style == 'guide_entrance'">
                    <span class="title">{{item.data.title}}</span>
                    <div class="wrapper">
                      <ul>
                        <li v-for="list in item.data.list">
                          <div class="img-box">
                            <img :src="list.thumbnail">
                            <div class="img-title">
                              <span class="area">{{list.title}}</span>
                              <span class="desc">{{list.desc}}</span>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="content" ref="content" v-if="lists.data.ex.group == '大洋洲'">
              <ul>
                <li v-for="item in lists.data.list">
                  <div class="guide-list" v-if="item.style == 'guide_list'">
                    <span class="title">{{item.data.title}}</span>
                    <div class="list" ref="list">
                      <ul :style="'width:'+item.data.list.length*115+'px'">
                        <li v-for="thumb in item.data.list">
                          <div class="img-box">
                            <img class="img" :src="thumb.thumbnail"/>
                            <span class="area-title">{{thumb.title}}</span>
                            <span class="desc">{{thumb.desc}}</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="article-list" ref="articlelist" v-if="item.style == 'guide_article_list'">
                    <ul :style="'width:'+item.data.list.length*230+'px'">
                      <li v-for="list in item.data.list">
                        <div class="img-box">
                          <div class="img-title" v-if="list.tag_list"><span class="front"></span><span
                            class="guide-num">{{list.guide_num}}</span><span
                            class="tag">{{list.tag_list[0] + '·' + list.tag_list[1]}}</span><span class="tail"></span>
                          </div>
                          <img class="img" :src="list.thumbnail"/>
                          <span class="sec-title">{{list.title}}</span>
                          <span class="location">{{list.mdd.name}}</span><span class="view">{{list.num_visit}}</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="guide_entrance" v-if="item.style == 'guide_entrance'">
                    <span class="title">{{item.data.title}}</span>
                    <div class="wrapper">
                      <ul>
                        <li v-for="list in item.data.list">
                          <div class="img-box">
                            <img :src="list.thumbnail">
                            <div class="img-title">
                              <span class="area">{{list.title}}</span>
                              <span class="desc">{{list.desc}}</span>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="content" ref="content" v-if="lists.data.ex.group == '非洲'">
              <ul>
                <li v-for="item in lists.data.list">
                  <div class="article-list" v-if="item.style == 'guide_article_list'">
                    <span class="title">{{item.data.title}}</span>
                    <div ref="articlelist">
                      <ul :style="'width:'+item.data.list.length*230+'px'">
                        <li v-for="list in item.data.list">
                          <div class="img-box">
                            <div class="img-title" v-if="list.tag_list"><span class="front"></span><span
                              class="guide-num">{{list.guide_num}}</span><span
                              class="tag">{{list.tag_list[0] + '·' + list.tag_list[1]}}</span><span class="tail"></span>
                            </div>
                            <img class="img" :src="list.thumbnail"/>
                            <span class="sec-title">{{list.title}}</span>
                            <span class="location">{{list.mdd.name}}</span><span class="view">{{list.num_visit}}</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="guide_entrance" v-if="item.style == 'guide_entrance'">
                    <span class="title">{{item.data.title}}</span>
                    <div class="wrapper">
                      <ul>
                        <li v-for="list in item.data.list">
                          <div class="img-box">
                            <img :src="list.thumbnail">
                            <div class="img-title">
                              <span class="area">{{list.title}}</span>
                              <span class="desc">{{list.desc}}</span>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="content" ref="content" v-if="lists.data.ex.group == '南美洲'">
              <ul>
                <li v-for="item in lists.data.list">
                  <div class="article-list" v-if="item.style == 'guide_article_list'">
                    <span class="title">{{item.data.title}}</span>
                    <div ref="articlelist">
                      <ul :style="'width:'+item.data.list.length*230+'px'">
                        <li v-for="list in item.data.list">
                          <div class="img-box">
                            <div class="img-title" v-if="list.tag_list"><span class="front"></span><span
                              class="guide-num">{{list.guide_num}}</span><span
                              class="tag">{{list.tag_list[0] + '·' + list.tag_list[1]}}</span><span class="tail"></span>
                            </div>
                            <img class="img" :src="list.thumbnail"/>
                            <span class="sec-title">{{list.title}}</span>
                            <span class="location">{{list.mdd.name}}</span><span class="view">{{list.num_visit}}</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="guide_entrance" v-if="item.style == 'guide_entrance'">
                    <span class="title">{{item.data.title}}</span>
                    <div class="wrapper">
                      <ul>
                        <li v-for="list in item.data.list">
                          <div class="img-box">
                            <img :src="list.thumbnail">
                            <div class="img-title">
                              <span class="area">{{list.title}}</span>
                              <span class="desc">{{list.desc}}</span>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
  import {mapMutations} from 'vuex'

  import IScroll from 'iscroll/build/iscroll-probe'

  export default {
    data () {
      return {
        ex: {},
        list: [],
        i: 0,
        show: true,
        dataArr: []
      }
    },
    created () {
      let self = this
      this.$axios.get('/api/themeEx')
        .then((res) => {
          res = res.data
          if (res.error === 0) {
            self.ex = res.data
          }
        })
        .catch((error) => {
          alert(error)
        })
      this.$axios.get('/api/themeList')
        .then((res) => {
          res = res.data
          if (res.error === 0) {
            self.list = res.data
          }
        })
        .catch((error) => {
          alert(error)
        })
      this.$axios.get('/api/data')
        .then((res) => {
          res = res.data
          if (res.error === 0) {
            self.dataArr = res.data
          }
        })
        .catch((error) => {
          alert(error)
        })
      setTimeout(() => {
        this.scrolls()
        this.fresh()
      }, 100)
    },
    methods: {
      ...mapMutations(['GET_INDEX']),
      scrolls () {
        if (!this.bottomScroll) {
          this.bottomScroll = new IScroll(this.$refs.bottom, {
            click: true,
            scrollX: true
          })
        } else {
          this.bottomScroll.refresh()
        }
        if (!this.contentScroll) {
          for (let i = 0; i < this.$refs.content.length; i++) {
            this.contentScroll = new IScroll(this.$refs.content[i], {
              click: true,
              scrollX: true
            })
          }
        } else {
          this.contentScroll.refresh()
        }
        if (!this.listScroll) {
          for (let i = 0; i < this.$refs.list.length; i++) {
            this.listScroll = new IScroll(this.$refs.list[i], {
              click: true,
              scrollX: true
            })
          }
        } else {
          this.listScroll.refresh()
        }
        if (!this.articlelistScroll) {
          for (let i = 0; i < this.$refs.articlelist.length; i++) {
            this.articlelistScroll = new IScroll(this.$refs.articlelist[i], {
              click: true,
              scrollX: true
            })
          }
        } else {
          this.articlelistScroll.refresh()
        }
        if (!this.contentlistScroll) {
          for (let i = 0; i < this.$refs.contentlist.length; i++) {
            this.contentlistScroll = new IScroll(this.$refs.contentlist[i], {
              click: true,
              scrollX: true
            })
          }
        } else {
          this.contentlistScroll.refresh()
        }
      },
      animate (index) {
        this.i = index
        this.show = false
        setTimeout(() => {
          this.show = true
        })
      },
      back () {
        this.$router.push('/homepage')
      },
      fresh () {
        if (this.$refs.content.length > 0) {
          for (let i = 0; i < this.$refs.content.length; i++) {
            console.log(this.$refs.content[i].style.display)
            this.$refs.content[i].style.opacity = 0
            this.$refs.content[i].style.left = 375 + 'px'
          }
          this.$refs.content[0].style.left = 0
          this.$refs.content[0].style.opacity = 1
        }
      },
      jump (index) {
        let content = this.$refs.content
        this.GET_INDEX({index, content})
      }
    }
  }
</script>

<style lang="less" scoped>
  .fade-enter-active, .fade-leave-active {
    transition: all .5s
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
    transform: translateX(375px);
  }

  .opac-enter-active {
    transition: all 0.2s
  }

  .opac-enter {
    opacity: 0;
    transform: translateX(375px);
  }

  .raiders {
    position: absolute;
    top: 0px;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;
    z-index: 100;
    .head {
      display: flex;
      height: 40px;
      /*background: gray;*/
      padding: 5px;
      .back, .header, .search {
        display: inline-block;
        height: 100%;
        img {
          width: 100%;
        }
      }
      .back {
        flex: 0 0 40px;
      }
      .header {
        flex: 1;
        height: 100%;
        line-height: 40px;
        font-size: 22px;
        font-family: "Microsoft YaHei UI";
        text-align: center;
      }
      .search {
        flex: 0 0 40px;
        img {
          width: 75%;
          padding: 5px;
        }
      }
    }
    .bottom {
      width: 100%;
      height: 60px;
      /*background: greenyellow;*/
      overflow: hidden;
      ul {
        display: flex;
        width: 684px;
        height: 100%;
        li {
          position: relative;
          flex: 1;
          display: inline-block;
          height: 100%;
          .area {
            display: inline-block;
            margin: 0 10%;
            width: 80%;
            height: 100%;
            font-size: 19px;
            font-family: "Microsoft YaHei UI";
            line-height: 60px;
            text-align: center;
            &.active {
              font-weight: 600;
            }
          }
          .border {
            position: absolute;
            bottom: 4px;
            display: inline-block;
            margin: 0 13%;
            width: 74%;
            border: 2px solid #ffdc2c;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
          }
        }
      }
    }
    .content-wrapper {
      .content {
        position: absolute;
        top: 110px;
        bottom: 0px;
        left: 0px;
        width: 100%;
        overflow: hidden;
        display: block;
        opacity: 1;
        li {
          margin: 10px 0;
          .guide-list {
            width: 100%;
            .title {
              display: inline-block;
              height: 22px;
              font-size: 22px;
              font-family: "Microsoft YaHei UI";
              padding: 10px 20px;
            }
            .list {
              margin: 8px 0;
              width: 100%;
              overflow: hidden;
              ul {
                display: flex;
                margin: 0 20px;
                li {
                  flex: 1;
                  margin-right: 10px;
                  .img-box {
                    img {
                      width: 100%;
                      border-radius: 5px;
                      box-shadow: 0 5px 10px #a9a9a9;
                    }
                    .area-title {
                      display: block;
                      margin: 10px 0 5px;
                      height: 25px;
                      line-height: 25px;
                      font-size: 20px;
                      font-weight: 600;
                    }
                    .desc {
                      font-size: 15px;
                      font-family: "Microsoft YaHei UI";
                    }
                  }
                }
              }
            }
          }
          .article-list {
            width: 100%;
            padding-bottom: 20px;
            margin-bottom: 20px;
            overflow: hidden;
            border-bottom: 1px solid #ccc;
            .title {
              display: inline-block;
              height: 22px;
              font-size: 22px;
              font-family: "Microsoft YaHei UI";
              padding: 10px 20px;
            }
            ul {
              display: flex;
              margin: 0 20px;
              li {
                flex: 1;
                margin-right: 10px;
                .img-box {
                  position: relative;
                  width: 100%;
                  .img-title {
                    position: absolute;
                    top: -1px;
                    left: -5px;
                    .guide-num, .tag {
                      display: inline-block;
                      padding: 0 5px;
                      height: 20px;
                      line-height: 20px;
                      font-size: 14px;
                    }
                    .guide-num {
                      background: #ffdd31;
                      font-weight: 600;
                    }
                    .tag {
                      background: #fff;
                    }
                    .tail {
                      position: absolute;
                      right: -9px;
                      display: inline-block;
                      width: 0;
                      height: 0;
                      border-top: solid 20px;
                      border-right: solid 10px;
                      border-top-right-radius: 7px;
                      border-color: #fff rgba(255, 255, 255, 0);
                    }
                    .front {
                      position: absolute;
                      bottom: -3px;
                      display: inline-block;
                      width: 0;
                      height: 0;
                      border-top: solid 3px;
                      border-left: solid 5px;
                      border-color: #6c631c rgba(255, 255, 255, 0);
                    }
                  }
                  .img {
                    width: 100%;
                  }
                  .sec-title {
                    display: block;
                    height: 66px;
                    line-height: 20px;
                    font-size: 18px;
                    font-weight: 600;
                  }
                  .location, .view {
                    display: inline-block;
                    height: 22px;
                    line-height: 22px;
                    padding-left: 22px;
                    margin-right: 20px;
                  }
                  .location {
                    background: url("../../commom/icon/icon_location_fill.png") no-repeat;
                    background-size: 22px 22px;
                  }
                  .view {
                    background: url("../../commom/icon/icon_seelog_fill.png") no-repeat;
                    background-size: 22px 22px;
                  }
                }
              }
            }
          }
          .guide_entrance {
            width: 100%;
            padding-bottom: 20px;
            margin-bottom: 20px;
            overflow: hidden;
            border-bottom: 1px solid #ccc;
            .title {
              display: inline-block;
              height: 22px;
              font-size: 22px;
              font-family: "Microsoft YaHei UI";
              padding: 10px 20px;
            }
            .wrapper {
              padding: 0 0 0 20px;
              li{
               display: inline-block;
                margin: 5px 0;
                width: 50%;
                .img-box {
                  display: inline-block;
                  width: 100%;
                  img{
                    display: inline-block;
                    width: 40%;
                    height: 45px;
                  }
                  .img-title{
                    position: absolute;
                    padding-left: 10px;
                    display: inline-block;
                    .area{
                      display: block;
                      padding: 3px 0;
                      font-size: 18px;
                      font-weight: 600;
                    }
                    .desc{
                      display: block;
                      padding: 3px 0;
                      font-size: 12px;
                    }
                  }
                }
              }
            }
          }
          .expert {
            width: 100%;
            padding-bottom: 20px;
            overflow: hidden;
            border-bottom: 1px solid #ccc;
            .main-title {
              width: 100%;
              margin: 10px 20px;
              .list-title {
                display: inline-block;
                height: 22px;
                font-size: 22px;
                font-family: "Microsoft YaHei UI";
              }
              .sub-title {
                float: right;
                display: inline-block;
                width: 90px;
                height: 22px;
                line-height: 22px;
                font-size: 18px;
                font-family: "Microsoft YaHei UI";
                color: #007fab;
                background: url("../../commom/icon/more.png") no-repeat;
                background-size: 22px 22px;
                background-position-x: 32px;
                background-position-y: -1px;
              }
            }
            .content-list {
              width: 100%;
              overflow: hidden;
              ul {
                display: flex;
                margin: 0 20px;
                li {
                  flex: 1;
                  margin-right: 10px;
                  .img-box {
                    position: relative;
                    width: 100%;
                    .img-title {
                      position: absolute;
                      top: -1px;
                      left: -5px;
                      .guide-num, .tag {
                        display: inline-block;
                        padding: 0 5px;
                        height: 20px;
                        line-height: 20px;
                        font-size: 14px;
                      }
                      .guide-num {
                        background: #ffdd31;
                        font-weight: 600;
                      }
                      .tag {
                        background: #fff;
                      }
                    }
                    .img {
                      width: 100%;
                    }
                    .title {
                      display: block;
                      height: 66px;
                      line-height: 20px;
                      font-size: 18px;
                      font-weight: 600;
                    }
                    .location, .view {
                      display: inline-block;
                      height: 22px;
                      line-height: 22px;
                      padding-left: 22px;
                      margin-right: 20px;
                    }
                    .location {
                      background: url("../../commom/icon/icon_location_fill.png") no-repeat;
                      background-size: 22px 22px;
                    }
                    .view {
                      background: url("../../commom/icon/icon_seelog_fill.png") no-repeat;
                      background-size: 22px 22px;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>

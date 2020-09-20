<template>
  <div class="user">
      <header-nav class="header-nav">
        <template v-slot:left>
            <span class="left">陈先生</span>
        </template>
        <template v-slot:right>
            <i class="icon scanning-icon"></i>
            <span class="excision"></span>
            <i class="icon setting-icon"></i>
        </template>
      </header-nav>
      <div class="base" :style="{color: baseTextOpacity}">
        <div class="base-top">
          <div>
            <div class="username">陈先生</div>
            <div class="online-resume">
              <i class="icon edit-icon"></i>
              <span>我的在线简历</span>
            </div>
          </div>
          <div class="avatar">
            <img :src="icon.logo" alt="" width="50px" style="border-radius: 85px;background: #FFF">
          </div>
        </div>
        <div class="base-bottom">
          <div v-for="(item, index) in baseSum" :key="index" class="items" @click="toWebView(item.path)">
            <div class="num">{{item.num}}</div>
            <div class="text">{{item.text}}</div>
          </div>
        </div>
      </div>
      <div class="user-options" ref="options">
        <van-cell title="附件简历" is-link to="index" size="large" icon="notes-o"/>
        <van-cell title="管理求职意见" is-link to="index" size="large" icon="add-o"/>
        <van-cell title="我的发现" is-link to="index" size="large" icon="bulb-o"/>
        <van-cell title="个人主页" is-link to="index" size="large" icon="wap-home-o"/>
        <van-cell title="帮助与反馈" is-link to="index" size="large" icon="question-o"/>
        <van-cell title="我的客服" is-link to="index" size="large" icon="service-o"/>
        <van-cell title="关于" is-link to="index" size="large" icon="info-o"/>
        <div class="remark-info">
          <span>客服电话&nbsp;xxx-xxx-xxxx&nbsp;&nbsp;&nbsp;工作时间&nbsp;9:30-18:30</span>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HeaderNav from '@/components/HeaderNav.vue'
import http from '@/http/axios'
import avatarImg from '@/assets/images/logo.png'

import { Cell } from 'vant';

@Component({
  components: {
    [Cell.name]: Cell,
    HeaderNav,
  }
})
export default class User extends Vue {
  private icon: object = {
    logo: avatarImg,
  }
  private baseOpacity: number = 1.0

  // 根据选择项模块距离顶部位置改变base模块文字颜色透明度
  public get baseTextOpacity() : string {
    return `rgba(255, 255, 255, ${this.baseOpacity})`
  }
  

  public get baseSum() : Array<object> {
    return [
      {text: '沟通过', num: 208, path: '/webview/audition'},
      {text: '面试', num: 2, path: '/webview/audition'},
      {text: '已投简历', num: 25, path: '/webview/audition'},
      {text: '收藏', num: 5, path: '/webview/audition'}
    ]
  }

  activated() {
    this.baseOpacity = 1.0
  }

  mounted() {
    document.addEventListener('scroll', this.optionScoll, true)
  }

  private optionScoll() {
    // @ts-ignore
    let distance = this.$refs.options.getBoundingClientRect().top
    // 减去顶部导航栏高度50
    distance = distance - 50
    // 选择项距离顶部为190
    this.baseOpacity = distance>0? Number((distance/140).toFixed(1)) : 0.1
    console.log(distance, this.baseOpacity)
  }
  
  private toWebView(path: string) {
    this.$router.push({path: path})
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/_sprite.scss';
.icon {
  @include icon;
  &.scanning-icon {
    @include icon-scanning;
  }
  &.setting-icon {
    @include icon-setting;
  }
  &.edit-icon {
    width: 18px;
    @include icon-edit;
  }
}

@mixin items-center {
    display: flex;
    align-items: center;
}

.header-nav {
  .left {
    color: #fff;
  }
  .excision {
    width: 20px;
  }
}
.base {
  background: #40E0D0;
  padding: 10px;
  // color: #fff;
  &-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .username {
      font-size: 25px;
    }
    .online-resume {
      @include items-center();
      font-size: 13px;
      margin-top: 5px;
      span {
        margin-left: 8px;
      }
    }
  }
  &-bottom {
    @include items-center();
    justify-content: space-around;
    margin-top: 20px;
    .items {
      @include items-center();
      flex-direction: column;
      .num {
        font-size: 20px;
      }
      .text {
        font-size: 13px;
      }
    }
  }
}
.user-options {
  // height: 100vh;
  .remark-info {
    padding: 20px 0px;
    text-align: center;
    color: #DCDCDC;
    font-size: 12px;
  }
}
</style>
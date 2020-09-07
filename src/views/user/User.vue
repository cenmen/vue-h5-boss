<template>
  <div class="user">
      <header-nav class="header-nav">
        <template v-slot:left>
            <span class="left">陈先生</span>
        </template>
        <template v-slot:right>
            <img :src="icon.scanning" alt="" width="25px">
            <span class="excision"></span>
            <img :src="icon.setting" alt="" width="25px">
        </template>
      </header-nav>
      <div class="base" :style="{color: baseTextOpacity}">
        <div class="base-top">
          <div>
            <div class="username">陈先生</div>
            <div class="online-resume">
              <img :src="icon.edit" alt="" width="18px">
              <span>我的在线简历</span>
            </div>
          </div>
          <div class="avatar">
            <img :src="icon.logo" alt="" width="50px" style="border-radius: 85px;background: #FFF">
          </div>
        </div>
        <div class="base-bottom">
          <div v-for="(item, index) in baseSum" :key="index" class="items">
            <div class="num">{{item.num}}</div>
            <div class="text">{{item.text}}</div>
          </div>
        </div>
      </div>
      <div class="user-options" ref="options">

      </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HeaderNav from '@/components/HeaderNav'
import http from '@/http/axios'

import scanningImg from 'assets/scanning.png'
import settingImg from 'assets/setting.png'
import editImg from 'assets/edit.png'
import avatarImg from 'assets/logo.png'

@Component({
  components: {
    HeaderNav,
  }
})
export default class User extends Vue {
  private icon: object = {
    scanning: scanningImg,
    setting: settingImg,
    edit: editImg,
    logo: avatarImg,
  }
  private baseOpacity: number = 1.0

  // 根据选择项模块距离顶部位置改变base模块文字颜色透明度
  public get baseTextOpacity() : string {
    return `rgba(255, 255, 255, ${this.baseOpacity})`
  }
  

  public get baseSum() : Array<object> {
    return [
      {text: '沟通过', num: 208},
      {text: '面试', num: 2},
      {text: '已投简历', num: 25},
      {text: '收藏', num: 5}
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
  
}
</script>

<style lang="scss" scoped>
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
  background: chocolate;
  height: 100vh;
  overflow: scroll;
}
</style>
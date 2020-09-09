<template>
  <div class="home">
    <div class="place-holder"></div>
    <div class="webview-header">
        <img :src="icon.return" alt="" width="20px" @click="toBackPage">
        <div class="title">{{$route.meta.title}}</div>
        <div class="callback" @click="onClickCallback($route.meta.callback.fun)">{{$route.meta.callback.text}}</div>
    </div>
    <div class="view">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import returnImg from 'assets/return.png'

@Component({})
export default class Home extends Vue {
  private icon: object = {
    return: returnImg,
  }
  toBackPage() {
      this.$router.go(-1)
  }
  onClickCallback(fun: any) {
    fun()
  }
}
</script>

<style lang="scss" scoped>
@mixin header-height {
    padding: 10px;
    height: 50px;
}
.place-holder {
    @include header-height();
}
.webview-header {
    @include header-height();
    position: fixed;
    top: 0;
    width: calc(100% - 20px);
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
    .title {
        font-weight: bold;
    }
    .callback {
        font-size: 16px;
    }
}
</style>
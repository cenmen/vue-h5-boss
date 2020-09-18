<template>
  <div class="home">
    <div class="view">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
    <div class="bottom-tabs">
      <div @click="switchTab('List')" class="tabs-item">
        <img :src="icon.post" alt="" class="icon">
        <span style="width:20px;display:inline-block">

        <i class="post-icon"></i>
        </span>
        <span class="text">职位</span>
      </div>
      <div @click="switchTab('Message')" class="tabs-item">
        <img :src="icon.message" alt="" class="icon">
        <span class="text">消息</span>
      </div>
      <div @click="switchTab('User')" class="tabs-item">
        <img :src="icon.user" alt="" class="icon">
        <span class="text">我的</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import postImg from 'assets/post.png'
import messageImg from 'assets/message.png'
import userImg from 'assets/user.png'

@Component({})
export default class Home extends Vue {
  private icon: object = {
    post: postImg,
    message: messageImg,
    user: userImg,
  }
  switchTab(name: string) {
    this.$router.push({ name: name})
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/_sprite.scss';
.post-icon {
  @include icon;
  @include icon-post;
  display: inline-block;
}
.view {
  margin-bottom: 50px;
}

.bottom-tabs {
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 0;
  height: 50px;
  width: 100%;
  border-top: 1px solid #F5F5F5;
  cursor: pointer;
  background-color: #fff;

  .tabs-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    .icon {
      width: 20px;
    }
  }
}
</style>
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
        <i class="icon post-icon"></i>
        <span class="text">职位</span>
      </div>
      <div @click="switchTab('Message')" class="tabs-item">
        <i class="icon message-icon"></i>
        <span class="text">消息</span>
      </div>
      <div @click="switchTab('User')" class="tabs-item">
        <i class="icon user-icon"></i>
        <span class="text">我的</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Home extends Vue {
  switchTab(name: string) {
    this.$router.push({ name: name})
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/_sprite.scss';
.icon {
  @include icon;
  &.post-icon {
    @include icon-post;
  }
  &.message-icon {
    @include icon-message;
  }
  &.user-icon {
    @include icon-user;
  }
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
  }
}
</style>
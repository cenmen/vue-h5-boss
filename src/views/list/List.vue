<template>
  <div class="list">
      <header-nav class="header-nav">
        <template v-slot:left>
            <span class="left">web前端</span>
        </template>
        <template v-slot:right>
            <i class="icon add-icon"></i>
            <span class="excision"></span>
            <i class="icon search-icon"></i>
        </template>
      </header-nav>
      <div id="list">
        <div v-for="(item, index) in jobList" :key="item.id" :id="`job-item-${index}`">
          <job-item :job="item"></job-item>
          <div class="break-line"></div>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import JobItem from './components/Job.vue'
import HeaderNav from '@/components/HeaderNav.vue'
import http from '@/http/axios'

@Component({
    components: {
        HeaderNav,
        JobItem,
    }
})
export default class List extends Vue {
    private jobList: any = []
    private lastItemId: string = ''
    private isLock: boolean = false // 防止滚动多次触发callback

    async created() {
      this.jobList = await http.post('/api/list')
      console.log(this.jobList)
      // 1：计算最后item位置，如果达到某个值则callback
      // 2：发起请求获取数据Push进list，触发class通知有更新
      this.$nextTick(() => {
        const fristItemId = `#job-item-1`
        this.lastItemId = `#job-item-${this.jobList.length - 1}` // 最后节点ID
        const bufferNum = 3 // 设置缓冲区item数量
        const scoll = this.initScrollEvent(fristItemId, bufferNum, this.callback)
      })
    }

    private initScrollEvent(fristItemId: string, bufferNum: number, callback: any) {
      // https://www.cnblogs.com/whb17bcdq/p/6513766.html
      const screenHeight = window.screen.availHeight // 屏幕可视区域高度
      const dom = document.querySelector(fristItemId) // 最后项dom节点引用
      // @ts-ignore
      const itemHeight = dom.offsetHeight || 0 // item节点高度
      const screenItems = Math.ceil(screenHeight / itemHeight) // 屏幕可容纳item数量(向上取整)
      const bufferAreaHeight = bufferNum * itemHeight // 缓冲区高度
      console.log(screenHeight, itemHeight, screenItems, bufferAreaHeight)
      let _this = this

      function listScrolling() {
        // @ts-ignore
        console.log(_this.lastItemId)
        // @ts-ignore
        const lastItemDistance = document.querySelector(_this.lastItemId).getBoundingClientRect().top // 最后项与屏幕顶部高度
        console.log(lastItemDistance)
        if (lastItemDistance < (screenHeight + bufferAreaHeight)) {
          console.log('callback!')
          callback()
        }
      }
      document.addEventListener('scroll', listScrolling)
    }

    private async callback() {
      if (!this.isLock) {
        this.isLock = true
        const list = await http.post('/api/list')
        for (let item of list as any) {
          this.jobList.push(item)
        }
        this.lastItemId = `#job-item-${this.jobList.length - 1}`
        console.log('this.lastItemId is change!', this.lastItemId)
        this.isLock = false
      }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/_sprite.scss';
.icon {
  @include icon;
  &.add-icon {
    @include icon-add;
  }
  &.search-icon {
    @include icon-search;
  }
}
.header-nav {
    .left {
        color: #fff;
    }
    .excision {
        height: 20px;
        border-right: 1px solid rgba(255, 255, 255, 0.5);
        margin: 0px 10px;
    }
}
.break-line {
    height: 5px;
    background-color: #F5F5F5;
}
</style>
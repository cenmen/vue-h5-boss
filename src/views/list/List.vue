<template>
  <div class="list">
      <header-nav class="header-nav">
        <template v-slot:left>
            <span class="left">web前端</span>
        </template>
        <template v-slot:right>
            <img :src="icon.add" alt="" width="25px">
            <span class="excision"></span>
            <img :src="icon.search" alt="" width="25px">
        </template>
      </header-nav>
      <div v-for="item in jobList" :key="item.id">
        <job-item :job="item"></job-item>
        <div class="break-line"></div>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import JobItem from './components/Job'
import HeaderNav from '@/components/HeaderNav'
import http from '@/http/axios'

import addImg from 'assets/add.png'
import searchImg from 'assets/search.png'

@Component({
    components: {
        HeaderNav,
        JobItem,
    }
})
export default class List extends Vue {
    private icon: object = {
        add: addImg,
        search: searchImg,
    }
    private jobList: any = []

    async created() {
        this.jobList = await http.post('/api/list')
        console.log(this.jobList)
    }
}
</script>

<style lang="scss" scoped>
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
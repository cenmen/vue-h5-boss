<template>
    <div class="job">
        <div class="job-desc block">
            <div class="name">{{job.jobPost}}</div>
            <div class="salary">{{salary}}</div>
        </div>
        <div class="job-tags block">
            <span class="tag-item" v-for="(item, index) in job.tags" :key="index">{{item}}</span>
        </div>
        <div class="job-company block">
            <div class="name">{{job.company}}</div>
            <div class="funds">{{job.funds}}</div>
            <div class="scope">{{job.scope}}</div>
        </div>
        <div class="job-recruiter block">
            <div class="people">
                <!-- <img src="" alt=""> -->
                <div class="name">{{job.recruiter}}</div>
                <span>&nbsp;·&nbsp;</span>
                <div class="post">{{job.recruiterPost}}</div>
            </div>
            <div class="position">
                <div>{{position}}</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class Job extends Vue {
    @Prop() private job!: any;

    public get salary() : string {
        return `${this.job.salaryMin}K-${this.job.salaryMax}K`
    }
    
    public get position() : string {
        return `${this.job.area} ${this.job.street}`
    }
}
</script>

<style lang="scss" scoped>
@mixin flex-between {
    display: flex;
    justify-content: space-between;
}

.job {
    padding: 5px 10px;
    .block {
        margin-bottom: 5px;
    }
}

.job-desc {
    @include flex-between;
    font-size: 20px;
    .name {
        font-weight: bold;
    }
    .salary {
        color: #48D1CC;
    }
}

.tag-item {
    background: #DCDCDC;
    padding: 3px 5px;
    font-size: 12px;
    border-radius: 2px;
    margin-right: 5px;
}

.job-company {
    display: flex;
    font-size: 16px;
    div {
        margin-right: 7px;
    }
}

.job-recruiter {
    @include flex-between;
    font-size: 14px;
    .people {
        display: flex;
    }
    .position {
        color: #C0C0C0;
    }
}
</style>
let _ = require('lodash')
import {randomID} from '@/utils/util'

const repeat = (source: any, obj: any, times: number) => {
    for (let index = 0; index < times; index++) {
        const item = _.clone(obj)
        item.id = randomID()
        source.push(item)
    }
    return source
}

const jobList = () => {
    const arr: any = []
    const obj = {
        jobPost: '前端开发工程师',
        salaryMax: 15,
        salaryMin: 10,
        tags: ['1-3年', '本科', 'HTML', 'CSS', 'Vue.js'],
        company: '字节跳动集团',
        funds: '已上市',
        scope: '10000以上',
        recruiter: '朱小姐',
        recruiterPost: '招聘经理',
        area: '天河区',
        street: '东风中路'
    }
    const data = repeat(arr, obj, 12)
    return data
}
export default {
    jobList
}
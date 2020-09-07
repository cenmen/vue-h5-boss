import Mock from 'mockjs'
import { getBody } from './util'
import List from './data/list'

Mock.mock('/api/list', 'post', List.jobList)

Mock.setup({
  timeout: 800 // setter delay time
})
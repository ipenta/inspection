import Mock from 'mockjs'
import detectionApi from './detection'

Mock.mock('https://api.g.cn/api/detection', 'get', detectionApi.getDetectionList)

export default Mock

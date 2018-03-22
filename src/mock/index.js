import Mock from 'mockjs'
import detectionApi from './detection'
import cropApi from './crop'

Mock.mock(/\/api\/detection/, 'get', detectionApi.getDetectionList)
Mock.mock(/\/api\/crop/, 'get', cropApi.getCropByType)

export default Mock

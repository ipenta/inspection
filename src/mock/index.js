import Mock from 'mockjs'
import detectionApi from './detection'
import cropApi from './crop'

Mock.mock(/\/api\/detection/, 'get', detectionApi.getDetectionList)
Mock.mock(/\/api\/crop/, 'get', cropApi.getCropByType)
Mock.mock(/\/api\/crop\/create/, 'post', cropApi.createCrop)

export default Mock

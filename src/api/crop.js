import request from '@/utils/request'

export default {
    fetchCropByType: function(params) {
        return request({
            url: '/api/crop',
            method: 'get',
            params: params
        })
    },
    createCrop: function(data) {
        return request({
            url: '/api/crop/create',
            method: 'post',
            data
        })
    }
}

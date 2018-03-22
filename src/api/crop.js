import request from '@/utils/request'

export default {
    fetchCropByType: function(query) {
        return request({
            url: '/api/crop',
            method: 'get',
            params: query
        })
    }
}

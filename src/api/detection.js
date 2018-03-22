import request from '@/utils/request'

export default {
    fetchDetection: function() {
        return request({
            url: '/api/detection',
            method: 'get'
        })
    }
}

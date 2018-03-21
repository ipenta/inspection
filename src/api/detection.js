import request from '@/utils/request'

export default {
    fetchDetection: function() {
        return request({
            url: 'https://api.g.cn/api/detection',
            method: 'get'
        })
    }
}

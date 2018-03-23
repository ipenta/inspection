import {
    param2Obj
} from '@/utils'
import crop from './crop.json'

export default {
    getCropByType: config => {
        const {
            type,
            query
        } = param2Obj(config.url)

        let filters = crop.filter(item => {
            if (type && item.type !== type) return false
            if (query && item.name.indexOf(query.toLowerCase()) < 0) return false
            return true
        })
        return filters
    },
    createCrop: options => {
        try {
            crop.push(JSON.parse(options.body))
            return {
                state: 200,
                crop: crop
            }
        } catch (e) {
            return {
                state: 301,
                error: e
            }
        }
    }
}

import Vue from 'vue'
import axios from 'axios'

import detectionApi from '@/api/detection'
import cropApi from '@/api/crop'

import '@/mock'

describe('detection', async () => {
    it('detection action', async () => {
        const resp = await detectionApi.fetchDetection()
        const detection = resp.data.detection
        // console.log(detection.length)
    })
})

describe('crop', async () => {
    it('crop action', async () => {
        const resp = await cropApi.fetchCropByType({
            type: "builder"
        })
        const crop = resp.data.crop
        // console.log(crop)
    })
})

describe('crop', async () => {
    it('crop create', async () => {
        const crops = await cropApi.createCrop({
            type: "builder",
            name: "点击附件"
        })
        console.log(crops.data)
    })
})

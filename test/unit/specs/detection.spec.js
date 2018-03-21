import Vue from 'vue'
import api from '@/api/detection'

import '@/mock'

describe('detection', async () => {
  it('detection action', async () => {
      const resp = await api()
      const detection = resp.data.detection
      console.log(detection.length)
  })
})

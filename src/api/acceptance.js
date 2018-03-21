import request from '@/utils/request'

export function fetchProgram(query) {
  return request({
    url: '/program',
    method: 'get',
    params: query
  })
}

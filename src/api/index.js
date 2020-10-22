import axios from 'axios'
import router from '@/router'

const api = axios.create({
  baseURL: 'https://api.tvmaze.com',
  timeout: 10000, // indicates 10000ms
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

api.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    let path = '/error'
    console.log(error)
    if (error.response.status) {
      switch (error.response.status) {
        case 404:
          path = '/404'
          router.push(path)
          break
      }
      return Promise.reject(error.response)
    }
  }
)

export default api

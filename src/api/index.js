import axios from 'axios'
import store from '@/store'

const index = axios.create({
  baseURL: process.env.VUE_APP_API
})

index.interceptors.request.use(config => {
  store.dispatch('showPreloader', true)
  return config
})

index.interceptors.response.use(response => {
  store.dispatch('showPreloader', false)
  return response
},
error => {
  store.dispatch('showPreloader', false)
  return Promise.reject(error)
})

export default index

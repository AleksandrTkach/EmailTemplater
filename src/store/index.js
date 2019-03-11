import Vue from 'vue'
import Vuex from 'vuex'

import language from './modules/language'
import email from './modules/email'
import preloader from './modules/preloader'
import modals from './modules/modals'

Vue.use(Vuex)

const store = window.store = new Vuex.Store({
  modules: {
    language,
    email,
    preloader,
    modals
  },
  strict: process.env.NODE_ENV !== 'production'
})

export default store

import store from '@/store'

const state = {
  languageCurrent: null
}

const mutations = {
  languageCurrent (state, payload) {
    state.languageCurrent = payload
  }
}

const actions = {
  /**
   * @param commit
   * @param payload
   */
  languageCurrent ({ commit }, payload) {
    commit('languageCurrent', payload)
    store.dispatch('changeEmailCodeByLanguage', payload)
    store.dispatch('fragments', payload)
  }
}

const getters = {
  languageCurrent: state => state.languageCurrent
}

export default {
  state,
  getters,
  mutations,
  actions
}

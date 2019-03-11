const state = {
  showPreloader: false
}

const mutations = {
  showPreloader (state, payload) {
    state.showPreloader = payload
  }
}

const actions = {
  /**
   * set status preloader
   *
   * @param commit
   * @param payload
   */
  showPreloader ({ commit }, payload) {
    commit('showPreloader', payload)
  }
}

const getters = {
  showPreloader: state => state.showPreloader
}

export default {
  state,
  getters,
  mutations,
  actions
}

const state = {
  showModalFragments: false,
  showModalConfirmed: false
}

const mutations = {
  showModalFragments (state, payload) {
    state.showModalFragments = payload
  },
  showModalConfirmed (state, payload) {
    state.showModalConfirmed = payload
  }
}

const actions = {
  /**
   * toggle show modal fragments
   *
   * @param commit
   * @param payload
   */
  showModalFragments ({ commit }, payload) {
    commit('showModalFragments', payload)
  },
  /**
   * toggle show modal confirmed
   * @param commit
   * @param payload
   */
  showModalConfirmed ({ commit }, payload) {
    commit('showModalConfirmed', payload)
  }
}

const getters = {
  showModalFragments: state => state.showModalFragments,
  showModalConfirmed: state => state.showModalConfirmed
}

export default {
  state,
  getters,
  mutations,
  actions
}

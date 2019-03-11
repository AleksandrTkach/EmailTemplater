import store from '@/store'
import api from '@/api'

const state = {
  emailId: null,
  email: null,
  emailCode: '',
  fragments: null
}

const mutations = {
  emailId (state, payload) {
    state.emailId = payload
  },
  email (state, payload) {
    state.email = payload
  },
  emailCode (state, payload) {
    state.emailCode = payload
  },
  fragments (state, payload) {
    state.fragments = payload
  }
}

const actions = {
  /**
   * set emailId
   *
   * @param commit
   * @param payload
   */
  emailId ({ commit }, payload) {
    commit('emailId', payload)
  },
  /**
   * set email
   *
   * @param commit
   * @param payload
   */
  email ({ commit }, payload) {
    commit('email', payload)
    store.dispatch('languageCurrent', payload.email_translations[0].language.id)
  },
  /**
   * change emailCode by language
   *
   * @param commit
   * @param payload
   */
  changeEmailCodeByLanguage ({ commit }, language) {
    const email = this.getters.email.email_translations
      .find(translation => translation.language.id === language)

    commit('emailCode', email ? email.description : 'NotFoundBody')
  },
  /**
   * set emailCode
   *
   * @param commit
   * @param payload
   */
  emailCode ({ commit }, payload) {
    commit('emailCode', payload)
  },
  /**
   * get fragments
   *
   * @param commit
   * @param language
   */
  async fragments ({ commit }, language) {
    const { data } = await api.get(`emailfragment/?language=${language}`)
    commit('fragments', data)
  }
}

const getters = {
  emailId: state => state.emailId,
  email: state => state.email,
  emailCode: state => state.emailCode,
  fragments: state => state.fragments
}

export default {
  state,
  getters,
  mutations,
  actions
}

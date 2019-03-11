<template>
  <header>

    <div>
      <div class="header__slug" v-if="email">
        {{ email.slug }}
      </div>
      <select v-if="languageCurrent"
              v-model="languageCurrent"
              :disabled="disabled"
      >
        <option
          v-for="language in languagesList"
          :value="language.id"
          :key="language.id"
        >
          {{ language.name }}
        </option>
      </select>
    </div>

    <div v-if="email">
      <button class="btn"
              @click="back"
              v-if="email.type"
              :disabled="disabled"
      >
        Back
      </button>
      <button class="btn"
              @click="save"
              :disabled="disabled"
      >
        Save
      </button>
    </div>

  </header>
</template>

<script>
import api from '@/api'
import _clonedeep from 'lodash.clonedeep'

export default {
  name: 'BaseHeader',
  data () {
    return {
      languagesList: null
    }
  },
  created () {
    this.getLanguagesList()
  },
  computed: {
    languageCurrent: {
      set (data) {
        this.$store.dispatch('languageCurrent', data)
      },
      get () {
        return this.$store.getters.languageCurrent
      }
    },
    emailCode () {
      return this.$store.getters.emailCode
    },
    email () {
      return this.$store.getters.email
    },
    showModalFragments () {
      return this.$store.getters.showModalFragments
    },
    showModalConfirmed () {
      return this.$store.getters.showModalConfirmed
    },
    disabled () {
      return (this.showModalFragments || this.showModalConfirmed)
    }
  },
  methods: {
    async getLanguagesList () {
      try {
        const { data } = await api.get('/languages')
        this.languagesList = data
      } catch (e) {
        this.showError(e)
      }
    },
    async save () {
      try {
        this.email.type ? await this.saveEmailFragment() : await this.saveEmailBody()
      } catch (e) {
        this.showError(e)
      }
    },
    async saveEmailBody () {
      let email = _clonedeep(this.email)
      const translation = email.email_translations.find(el => el.language.id === this.languageCurrent)

      email.description = this.emailCode
      email.return_email = translation.return_email
      email.language = translation.language.id

      await api.put(`/email/${email.email_translations[0].entity}`, email)
      this.showSuccess('Email successfully saved')
    },
    async saveEmailFragment () {
      let fragment = _clonedeep(this.email)
      const translation = fragment.translations.find(el => el.language.id === this.languageCurrent)

      translation.email_fragment = this.emailCode
      fragment.translations = [{ ...translation }]

      await api.put(`/emailfragment/${fragment.translations[0].entity}`, fragment)
      this.showSuccess('Fragment successfully saved')
    },
    back () {
      window.location.reload()
    },
    showError (e) {
      this.$toasted.show(`${e.message} <br/>Please contact the administrator`, { type: 'error', duration: 5000 })
    },
    showSuccess (text) {
      this.$toasted.show(text, { type: 'success' })
    }
  }
}
</script>

<style lang="scss" scoped>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    height: 40px;
    border-bottom: 2px solid #aaa;
  }

  .header {
    &__slug {
      margin-bottom: .25rem;
    }
  }

  .btn {
    margin: 5px;
  }
</style>

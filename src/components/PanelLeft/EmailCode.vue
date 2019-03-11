<template>
  <div :class="editorClass" class="email-code__wrapper">
    <codemirror v-model="emailCode"
                :options="codemirrorOptions"
    />
  </div>
</template>

<script>
import api from '@/api'

import CodemirrorOptions from '@/settings/CodemirrorOptions'
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/htmlmixed/htmlmixed.js'
import 'codemirror/theme/monokai.css'

export default {
  name: 'EmailCode',
  components: {
    codemirror
  },
  data () {
    return {
      codemirrorOptions: CodemirrorOptions
    }
  },
  computed: {
    showModalFragments () {
      return this.$store.getters.showModalFragments
    },
    showModalConfirmed () {
      return this.$store.getters.showModalConfirmed
    },
    emailId () {
      return this.$store.getters.emailId
    },
    emailCode: {
      set (data) {
        this.$store.dispatch('emailCode', data)
      },
      get () {
        return this.$store.getters.emailCode
      }
    },
    editorClass () {
      return (this.showModalFragments || this.showModalConfirmed) ? 'pointer-events-none' : ''
    }
  },
  created () {
    this.getEmails()
  },
  methods: {
    async getEmails () {
      const { data } = await api.get(`email/${this.emailId}`)
      this.$store.dispatch('email', data)
    }
  }
}
</script>

<style scoped>
  .pointer-events-none {
    pointer-events: none;
  }
</style>

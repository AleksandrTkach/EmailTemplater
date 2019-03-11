<template>
  <base-modal>
    <div slot="modal-body" class="modal-body">
        Please select the required fragment

      <select class="w-100"
              v-model="fragmentSelected"
              @change="replaceFragment">
        <option v-for="fragment in fragments"
                :value="fragment.slug"
                :key="fragment.id"
        >
          {{`[ ${fragment.type} ] ${fragment.slug}`}}
        </option>
      </select>

      <div>
        <button class="btn"
                title="save changes"
                @click="$emit('close')"
        >
          <i class="fas fa-check"></i>
        </button>
        <button class="btn"
                title="cancel changes"
                @click="closeWithoutSave"
        >
          <i class="fas fa-redo"></i>
        </button>
        <button class="btn float-right"
                title="edit template"
                @click="getFragmentCode"
        >
          <i class="far fa-edit"></i>
        </button>
      </div>

    </div>
  </base-modal>
</template>

<script>
import { SEARCH_TEMPLATE } from '@/settings/constants'
import BaseModal from '@/components/BaseModal'

export default {
  name: 'ModalFragments',
  components: {
    BaseModal
  },
  props: {
    fragments: Array,
    fragmentTagId: String
  },
  data () {
    return {
      fragmentSelected: null,
      fragmentIndexInPreview: null,
      fragmentSlug: '',
      emailCodeSaved: ''
    }
  },
  computed: {
    email () {
      return this.$store.getters.email
    },
    emailCode: {
      set (data) {
        this.$store.dispatch('emailCode', data)
      },
      get () {
        return this.$store.getters.emailCode
      }
    }
  },
  created () {
    const fragmentData = this.fragmentTagId.split('_')

    this.emailCodeSaved = this.emailCode
    this.fragmentIndexInPreview = Number(fragmentData[0])
    this.fragmentSlug = fragmentData.slice(1).join('_')
    this.setFragmentSelected(this.fragmentTagId)
  },
  mounted () {
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        this.$emit('close')
      }
    })
  },
  methods: {
    setFragmentSelected () {
      const fragment = this.fragments.find(el => el.slug === this.fragmentSlug)

      this.fragmentSelected = fragment ? fragment.slug : null
    },
    replaceFragment () {
      const newFragment = `{{${this.fragmentSelected}}}`
      let matchIndex = 0

      this.emailCode = this.emailCode.replace(SEARCH_TEMPLATE,
        match => (matchIndex++ === this.fragmentIndexInPreview) ? newFragment : match)
    },
    closeWithoutSave () {
      this.emailCode = this.emailCodeSaved
      this.$emit('close')
    },
    getFragmentCode () {
      const fragment = this.fragments.find(el => el.slug === this.fragmentSelected)
      fragment.email_translations = fragment.translations
      fragment.email_translations[0].description = fragment.email_translations[0].email_fragment

      this.$emit('close')
      this.$store.dispatch('email', fragment)
    }
  }
}
</script>

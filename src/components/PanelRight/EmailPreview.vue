<template>
  <div class="email-preview__wrapper">
    <modal-confirmed v-if="showModalConfirmed"
                     @rejectChanges="undoChanges()"
                     @saveChanges.stop.prevent="convertEmailPreview()"
    />
    <modal-fragments v-if="showModalFragments"
                     :fragments="fragments"
                     :fragmentTagId="fragmentTagId"
                     @close="showModalFragments = false"
    />
    <div id="emailPreview"
         v-html="emailPreview">
    </div>
    <div id="buttons_confirm"
         v-if="selectedFragment"
         :style="confirmButtonStyle"
    >
      <button class="btn color-success"
              @mousedown.stop.prevent="convertEmailPreview()"
      >
        <i class="fas fa-check"></i>
      </button>
      <button class="btn color-cancel"
              @mousedown="undoChanges()">
        <i class="fas fa-redo"></i>
      </button>
    </div>
  </div>
</template>

<script>
import ModalFragments from '@/components/ModalFragments'
import ModalConfirmed from '@/components/ModalConfirmed'

import _unescape from 'lodash.unescape'
import {
  NOT_FOUND_TEXT,
  TRIM_FRAGMENT,
  SEARCH_TEMPLATE
} from '@/settings/constants'

export default {
  name: 'EmailPreview',
  data () {
    return {
      fragmentTagId: '',
      selectedFragment: null,
      confirmButtonStyle: {},
      editableText: '',
      fragmentSelected: null,
      fragmentSlug: '',
      emailCodeSaved: '',
      /**
       * focus listner variable, need for remove listner
       */
      focusListener: ($event) => {
        if (this.showModalConfirmed) { return }
        const { target } = $event
        const top = target.offsetTop - 27
        this.editableText = target.innerHTML
        this.confirmButtonStyle = { top: top + 'px' }
        this.selectedFragment = target
      },
      /**
       * blur listner variable, need for remove listner
       */
      blurListener: ($event) => {
        if (this.selectedFragment && $event.target.innerHTML !== this.editableText) {
          this.showModalConfirmed = true
        } else {
          this.hideConfirmBtn()
        }
      }
    }
  },
  components: {
    ModalFragments,
    ModalConfirmed
  },
  computed: {
    showModalFragments: {
      set (data) {
        this.$store.dispatch('showModalFragments', data)
      },
      get () {
        return this.$store.getters.showModalFragments
      }
    },
    showModalConfirmed: {
      set (data) {
        this.$store.dispatch('showModalConfirmed', data)
      },
      get () {
        return this.$store.getters.showModalConfirmed
      }
    },
    emailCode: {
      set (data) {
        this.$store.dispatch('emailCode', data)
      },
      get () {
        return this.$store.getters.emailCode
      }
    },
    fragments () {
      return this.$store.getters.fragments
    },
    languageCurrent () {
      return this.$store.getters.languageCurrent
    },
    emailPreview () {
      let emailPreview = `<div class="content-block" contenteditable="true">${this.emailCode}</div>`

      emailPreview = emailPreview.replace(/{{\s*/g, '</div> {{')
      emailPreview = emailPreview.replace(/\s*}}/g, '}} <div class="content-block" contenteditable="true">')
      emailPreview = emailPreview.replace(/<\/#/g, '&lt;/#')

      const fragmentsEmail = emailPreview.match(SEARCH_TEMPLATE)

      if (fragmentsEmail && this.fragments) {
        for (const [index, fragment] of fragmentsEmail.entries()) {
          emailPreview = this.replaceFragments(emailPreview, fragment, index)
        }
      }
      return emailPreview
    }
  },
  methods: {
    /**
     * replace email fragments
     *
     * @param emailPreview
     * @param fragment
     * @param index
     * @returns {void | string | *}
     */
    replaceFragments (emailPreview, fragment, index) {
      const fragmentSlug = fragment.replace(TRIM_FRAGMENT, '')

      const element = this.fragments
        .find(el => el.slug === fragmentSlug)

      const fragmentHtml = element
        ? element.translations[0].email_fragment
        : NOT_FOUND_TEXT

      return emailPreview.replace(fragment,
        `<div id="${index}_${fragmentSlug}" class="email__fragment"> ${fragmentHtml} </div>`)
    },
    /**
     * init actions for edit content manual
     */
    initContentBlockActions () {
      const contentBlocks = document.getElementsByClassName('content-block')

      for (const block of contentBlocks) {
        block.removeEventListener('focus', this.focusListener)
        block.addEventListener('focus', this.focusListener)
        block.removeEventListener('blur', this.blurListener)
        block.addEventListener('blur', this.blurListener)
      }
    },
    /**
     * convert email to code after manual changes
     *
     */
    convertEmailPreview () {
      let newEmailCode = ''
      const previewCodeParts = document.getElementById('emailPreview').children
      for (const child of previewCodeParts) {
        switch (child.className) {
          case 'content-block':
            newEmailCode += child.innerHTML
            break
          case 'email__fragment':
            const fragmentData = child.id.split('_')
            const fragmentSlug = fragmentData.slice(1).join('_')
            newEmailCode += `{{${fragmentSlug}}}`
            break
        }
      }
      this.emailCode = _unescape(newEmailCode)
      this.hideConfirmBtn()
      this.showModalConfirmed = false
    },
    /**
     * undo last code changes
     *
     */
    undoChanges () {
      this.selectedFragment.innerHTML = this.editableText
      this.hideConfirmBtn()
      this.showModalConfirmed = false
    },
    /**
     * Find selected email fragment
     *
     */
    setFragmentSelected () {
      const fragment = this.fragments.find(el => el.slug === this.fragmentSlug)

      this.fragmentSelected = fragment ? fragment.slug : null
    },
    hideConfirmBtn () {
      this.editableText = ''
      this.selectedFragment = null
    }
  },
  /**
   * Watch update scope and rebuild view
   *
   */
  updated () {
    this.initContentBlockActions()
    const fragments = document.getElementsByClassName('email__fragment')

    for (const fragment of fragments) {
      fragment.addEventListener('click', () => {
        this.fragmentTagId = fragment.getAttribute('id')
        this.showModalFragments = true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  #buttons_confirm {
    position: absolute;
    right: 3px;
    z-index: 2;
  }

  .email-preview__wrapper {
    overflow: auto;
    padding-top: 30px;
    height: calc(100vh - 100px);
    width: 100%;
  }
</style>

<template>
  <base-modal>
    <div slot="modal-body" class="modal-body">
      Block has been changed, save changes?
      <br>

      <button class="btn"
              @click="$emit('saveChanges', $event)">
        <i class="fas fa-check"></i>
      </button>
      <button class="btn float-right"
              @click="$emit('rejectChanges')">
        <i class="fas fa-redo"></i>
      </button>

    </div>
  </base-modal>
</template>

<script>
import BaseModal from '@/components/BaseModal'

export default {
  name: 'ModalConfirmed',
  components: {
    BaseModal
  },
  mounted () {
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        this.$emit('rejectChanges')
      }
    })
  }
}
</script>

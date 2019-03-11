<template>
  <div class="text-editor__wrapper">
    <button class="text-editor__btn"
            v-for="(btn, index) in btns"
            :key="index"
            @mousedown.stop.prevent="exec(btn)"
    >
      <i :class="btn.icon"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: 'TextEditorBtn',
  data () {
    return {
      btns: [
        { defaultUI: false, action: 'bold', icon: 'fas fa-bold' },
        { defaultUI: false, action: 'italic', icon: 'fas fa-italic' },
        { defaultUI: false, action: 'underline', icon: 'fas fa-underline' },
        { defaultUI: false, action: 'insertOrderedList', icon: 'fas fa-list-ol' },
        { defaultUI: false, action: 'insertUnorderedList', icon: 'fas fa-list' },
        { defaultUI: false, action: 'outdent', icon: 'fas fa-outdent' },
        { defaultUI: false, action: 'indent', icon: 'fas fa-indent' },
        { defaultUI: false, action: 'justifyLeft', icon: 'fas fa-align-left' },
        { defaultUI: false, action: 'justifyCenter', icon: 'fas fa-align-center' },
        { defaultUI: false, action: 'justifyRight', icon: 'fas fa-align-right' },
        { defaultUI: false, action: 'createLink', icon: 'fas fa-link' },
        { defaultUI: false, action: 'unLink', icon: 'fas fa-unlink' }
      ]
    }
  },
  methods: {
    exec (btn, value) {
      value = btn.action === 'createLink' ? prompt('Enter a URL (http://example.com):', '') : null
      document.execCommand(btn.action, btn.defaultUI, value)
    }
  }
}
</script>

<style lang="scss" scoped>
  .text-editor {

    &__wrapper {
      position: fixed;
      border-bottom: 1px solid rgb(170, 170, 170);
      margin: 0 -5px 5px -5px;
      width: 100%;
      background-color: white;
      z-index: 1;
    }

    &__btn {
      font-size: 15px;
      padding: 5px 10px;
      border: none;
      cursor: pointer;
      background-color: white;
      transition: .25s;

      &:hover {
        background-color: rgb(170, 170, 170);
      }

      &:focus {
        outline: none;
      }
    }
  }
</style>

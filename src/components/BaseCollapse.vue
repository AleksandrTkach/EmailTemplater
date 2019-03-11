<template>
  <div class="collapse collapse-item"
       :class="{ 'is-active': active }"
  >
    <div class="collapse-header touchable"
         @click.prevent="toggle">
      <slot name="collapse-header"/>
    </div>
    <transition name="fade">
      <div class="collapse-content"
           v-show="active"
      >
        <div class="collapse-content-box">
          <slot name="collapse-body"/>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'BaseCollapse',
  data () {
    return {
      active: false
    }
  },
  props: {
    selected: {
      type: Boolean,
      default: false
    },
    isToggle: {
      type: Boolean,
      default: true
    }
  },
  created () {
    this.active = this.selected
  },
  methods: {
    toggle () {
      if (this.isToggle) {
        this.active = !this.active
        this.$emit('collapse-toggle', this.active)
        if (this.active) {
          this.$emit('collapse-open', this.index)
        }
      }
    }
  }
}
</script>

<style>
  .collapse {
    cursor: pointer;
    margin-bottom: 2px;
  }
  .collapse .collapse-header {
    padding: 5px 0 5px 40px;
    background: #6e6e6e;
    border-radius: 3px;
    position: relative;
    color: #fff;
  }
  .collapse .collapse-header > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .collapse .collapse-header h3 {
    font-size: 0.938em;
    font-weight: bold;
  }
  .collapse .collapse-header::before {
    -moz-transition: all .2s;
    -o-transition: all .2s;
    -webkit-transition: all .2s;
    transition: all .2s;
    content: url('../assets/img/arrow-down.svg');
    position: absolute;
    font-size: 0.4em;
    top: calc(50% - 0.4em);
    left: 20px;
    color: #c5c9d0;
    -moz-transform: rotate(-90deg);
    -o-transform: rotate(-90deg);
    -ms-transform: rotate(-90deg);
    -webkit-transform: rotate(-90deg);
    transform: rotate(-90deg);
  }
  .collapse.is-active .collapse-header::before {
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  .collapse .collapse-content-box {
    -moz-transition: all .2s;
    -o-transition: all .2s;
    -webkit-transition: all .2s;
    transition: all .2s;
    border-left: 2px solid #f7f7f7;
    border-bottom: 2px solid #f7f7f7;
    border-right: 2px solid #f7f7f7;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
  }
</style>

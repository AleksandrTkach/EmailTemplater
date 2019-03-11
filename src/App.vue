<template>
  <div id="app">

    <preloader/>
    <base-header/>

    <rs-panels split-to="columns"
               :allow-resize="true"
               units="percents"
               :size="50"
    >

      <div slot="secondPane">
        <text-editor-btn></text-editor-btn>
        <email-preview/>
      </div>

      <rs-panels :allow-resize="true"
                 split-to="rows"
                 slot="firstPane"
                 primary="second"
                 units="percents"
                 :size="50"
                 :min-size="7"
                 :max-size="95"
                 resizerColor="#fff"
                 :resizerThickness="4"
                 resizerBorderColor="#23adff"
                 :resizerBorderThickness="2"
      >
        <div slot="firstPane" class="codemirror__wrapper">
          <base-collapse :selected="true" :is-toggle="false">
            <div slot="collapse-header"> HTML </div>
            <div slot="collapse-body">
              <email-code/>
            </div>
          </base-collapse>
        </div>

        <div slot="secondPane" class="email-substitutions__wrapper">
          <base-collapse>
            <div slot="collapse-header"> Substitutions placeholders </div>
            <div slot="collapse-body">
              <email-substitutions/>
            </div>
          </base-collapse>

          <base-collapse>
            <div slot="collapse-header"> Fields/parameters </div>
            <div slot="collapse-body">
              <email-parameters/>
            </div>
          </base-collapse>
        </div>

      </rs-panels>
    </rs-panels>

  </div>
</template>

<script>
import Vue from 'vue'
import Toasted from 'vue-toasted'
import RsPanels from 'vue-resize-split-pane'

import store from '@/store'

import BaseHeader from '@/components/BaseHeader'
import EmailPreview from '@/components/PanelRight/EmailPreview'
import TextEditorBtn from '@/components/PanelRight/TextEditorBtn'
import Preloader from '@/components/Preloader'
import BaseCollapse from '@/components/BaseCollapse'
import EmailCode from '@/components/PanelLeft/EmailCode'
import EmailSubstitutions from '@/components/PanelLeft/EmailSubstitutions'
import EmailParameters from '@/components/PanelLeft/EmailParameters'

Vue.use(Toasted, {
  duration: 2000,
  position: 'bottom-right'
})

export default {
  props: {
    entityId: String
  },
  created () {
    const idForDevelopTest = 255
    const { entityId = idForDevelopTest } = this
    store.dispatch('emailId', entityId)
  },
  store,
  components: {
    Preloader,
    RsPanels,
    BaseHeader,
    EmailPreview,
    TextEditorBtn,
    BaseCollapse,
    EmailCode,
    EmailSubstitutions,
    EmailParameters
  }
}
</script>

<style lang="scss">
  @import './assets/scss/_button';
  @import './assets/scss/_icons';
  @import './assets/scss/_form';

  body {
    margin: 0;
    background-color: #fff !important;
  }

  .w-100 {
    width: 100%;
  }

  .column {
    position: relative;
    padding: 0 5px;
    min-width: 35%;
    max-width: 63%;
  }

  .root {
    height: calc(100% - 72px) !important;
    background-color: #fff !important;
  }

  .float-right {
    float: right;
  }

  .email {
    &__fragment {
      width: 100%;
      cursor: pointer;
      transition: .25s;
      position: relative;

      &:hover {
        box-shadow: 0 0 10px rgba(35, 173, 255, 1);
        border-radius: 2px;
      }

      &:hover &::after {
        content: 'redsfg';
      }
    }
  }

  .is-active,
  .CodeMirror,
  .vue-codemirror,
  .collapse-content,
  .codemirror__wrapper,
  .collapse-content-box,
  .collapse-content-box > div,
  .email-code__wrapper {
    height: 100% !important;
    box-sizing: border-box;
  }

  .CodeMirror-scroll {
    height: 95% !important;
  }
</style>

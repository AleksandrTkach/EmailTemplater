<template>
  <div class="template-engine__wrapper">
    <ul class="brokers"
        v-if="brokers"
    >
      <li>
        <b>Broker:</b>
      </li>
      <li v-for="broker in selectedBrokers"
          :key="broker.id"
      >
        <label>
          <input type="checkbox"
                 disabled
                 :checked="broker.checked"
          />
          {{ broker.slug }}
        </label>
      </li>
    </ul>

    <ul class="template-engine"
        v-if="email">
      <li>
        <b>Template engine:</b>
      </li>
      <li v-for="(engine, index) of engines"
          :key="index">
        <label>
          <input type="radio"
                 name="template-engine"
                 disabled
                 :checked="email.template_engine === engine.value"
          />
            {{ engine.name }}
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
import api from '@/api'

export default {
  name: 'EmailParameters',
  data () {
    return {
      brokers: [],
      engines: [
        {
          name: 'Freemarker',
          value: 'freemarker'
        },
        {
          name: 'Groovy template',
          value: 'groovy_template'
        }
      ]
    }
  },
  created () {
    this.getBrockers()
  },
  computed: {
    email () {
      return this.$store.getters.email
    },
    selectedBrokers () {
      return this.brokers.map(el => {
        el.checked = this.email.brokers.includes(el.id)
        return el
      })
    }
  },
  methods: {
    async getBrockers () {
      const { data } = await api.get('/brokers')
      this.brokers = data
    }
  }
}
</script>

<style lang="scss" scoped>
  .template-engine {
    &__wrapper {
      display: flex;
    }
  }
  .template-engine,
  .brokers {
    flex: 0 0 45%;
    list-style: none;
    padding-left: 20px;
  }
</style>

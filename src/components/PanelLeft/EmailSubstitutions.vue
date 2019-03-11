<template>
  <div class="substitutions__wrapper">
    <div class="search__wrapper">
      <input class="search__input input input_md"
             type="text"
             placeholder="Search by name or placeholder"
             v-model="search"
      >
      <i class="fas fa-search search__icon"></i>
    </div>
    <ul class="substitutions-list__group-name"
        v-for="(group, index) in filteredSubtitution"
        :key="index">
      <li>
        <i class="far fa-folder-open svg-md"></i>
        {{ group.name }}
        <ul class="substitutions-list__group-items">
          <li class="substitutions-list__items"
              v-for="item in group.elements"
              :key="item.id">
            <i class="far fa-file-alt svg-md"></i>
            {{ item.substitution_name }} {{ item.substitution_placeholder }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import api from '@/api'

export default {
  name: 'EmailSubstitutions',
  data () {
    return {
      search: '',
      groupList: [],
      groupListSave: []
    }
  },
  created () {
    this.getSubscription()
  },
  computed: {
    filteredSubtitution () {
      let result = []
      for (let group of this.groupList) {
        let elements = group.elements.filter(el => {
          const substitution = `${el.substitution_name} ${el.substitution_placeholder}`
          return substitution.toLowerCase().includes(this.search.toLowerCase())
        })

        if (!elements.length) {
          elements = [{
            substitution_name: 'Not found'
          }]
        }
        result.push({
          name: group.name,
          elements
        })
      }
      return result
    }
  },
  methods: {
    async getSubscription () {
      const { data } = await api.get('/substitutions')
      const groupNames = data.map(item => item.substitution_group.name)
      const uniqueGroupNames = [...new Set(groupNames)]

      for (const name of uniqueGroupNames) {
        const group = {
          name,
          elements: data.filter(subtitut => subtitut.substitution_group.name === name)
        }
        this.groupList.push(group)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

  .substitutions__wrapper {
    width: 99%;
    overflow-y: auto;
  }

  .search {
    &__wrapper {
      display: flex;
      position: relative;
    }
    &__input {
      flex-grow: 1;
      padding-right: 28px;
      padding-left: 5px;
      margin-top: 2px;
    }
    &__icon {
      position: absolute;
      top: 2px;
      right: 0;
      margin: 6px;
    }
  }

  .substitutions-list {
    &__group-name > li {
      font-weight: bold;
    }

    &__group-name,
    &__group-items {
      list-style: none;
      max-height: 200px;
      padding-left: 25px;
    }

    &__items {
      padding: 2px 0;
      font-weight: normal;
    }
  }
</style>

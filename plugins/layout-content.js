import Vue from 'vue'
import { pathified } from '@azoom/util'

const { $commit } = pathified('layout')

Vue.mixin({
  mounted() {
    if (this.$options.layoutContent) {
      const commit = ([key, value]) =>
        ({
          title: value => $commit('SET_TITLE', value),
          actions: value => {
            const actions = Object.entries(value).map(([method, { icon }]) => {
              const eventName = `${this.$vnode.tag}/${method}`
              this.$nuxt.$off(eventName)
              this.$nuxt.$on(eventName, () => this[method]())
              return { icon, name: eventName }
            })
            $commit('SET_ACTIONS', actions)
          },
        }[key](value))
      Object.entries(this.$options.layoutContent).forEach(commit)
    }
  },
})

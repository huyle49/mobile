import { make } from 'vuex-pathify'

export const state = () => ({
  title: '',
  actions: [],
})

export const mutations = {
  ...make.mutations(state),
}

export const actions = {
  clearTitle({ commit }) {
    commit('SET_TITLE', '')
  },
}

import pathify, { make } from 'vuex-pathify'
import createPersistedState from 'vuex-persistedstate'

import { DEPARTMENT_ID_LEASING_STAFFS } from '@/utils/constants'

export const plugins = [
  pathify.plugin,
  createPersistedState({
    paths: [],
  }),
]

export const state = () => ({
  loggedStaff: {},
  staffs: [],
  orgPositions: {},
  updatedTime: {},
  loading: false,
})

export const getters = {
  ...make.getters(state),
  sortStaffsByLeasingDepartment(state) {
    const staffs = [...state.staffs]
    return staffs.sort((staffOne, staffTwo) => {
      if (DEPARTMENT_ID_LEASING_STAFFS.includes(staffOne.departmentId)) {
        return -1
      } else if (DEPARTMENT_ID_LEASING_STAFFS.includes(staffTwo.departmentId)) {
        return 1
      } else return 0
    })
  },
  getUpdatedTime(state) {
    return state.updatedTime
  },
  getLoading(state) {
    return state.loading
  },
}

export const mutations = {
  ...make.mutations(state),
}

export const actions = {
  setLoading({ commit }, loading) {
    commit('SET_LOADING', loading)
  },
}

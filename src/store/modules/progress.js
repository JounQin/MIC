import Vue from 'vue'
import {generateGetters} from 'utils'

const SET_PROGRESS = 'SET_PROGRESS'
const TOGGLE_MASK = 'TOGGLE_MASK'
const TOGGLE_MASK_CLICKED = 'TOGGLE_MASK_CLICKED'

export default () => {
  const state = {
    progress: 0,
    mask: false,
    maskClicked: false
  }

  const getters = generateGetters(Object.keys(state))

  let timeout

  const actions = {
    setProgress({commit}, progress) {
      clearTimeout(timeout)
      commit(SET_PROGRESS, progress)
      if (progress !== 100) return
      timeout = setTimeout(() => {
        commit(SET_PROGRESS, 0)
      }, 500)
    },
    toggleMask({commit}, mask) {
      commit(TOGGLE_MASK, mask)
    },
    clickMask({commit}) {
      commit(TOGGLE_MASK_CLICKED, true)
      Vue.nextTick(() => commit(TOGGLE_MASK_CLICKED, false))
    }
  }

  const mutations = {
    [SET_PROGRESS](state, payload) {
      state.progress = payload
    },
    [TOGGLE_MASK](state, mask) {
      state.mask = mask
    },
    [TOGGLE_MASK_CLICKED](state, maskClicking) {
      state.maskClicked = maskClicking
    }
  }

  return {
    state,
    getters,
    actions,
    mutations
  }
}

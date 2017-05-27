import axios from 'axios'

import {generateGetters} from 'utils'

const SET_BANNERS = 'SET_BANNERS'

export default () => {
  const state = {
    banners: null
  }

  const getters = generateGetters(Object.keys(state))

  const actions = {
    async fetchBanners({state, commit}) {
      if (state.banners) return
      commit(SET_BANNERS, (await axios.get('/fetch-banners')).data)
    }
  }

  const mutations = {
    [SET_BANNERS](state, banners) {
      state.banners = banners
    }
  }

  return {
    state,
    getters,
    actions,
    mutations
  }
}
